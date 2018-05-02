package com.nasa.service.impl;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.nasa.service.AsyncCallback;
import com.nasa.service.ImageService;
import com.nasa.utils.Utils;
import com.squareup.okhttp.Callback;
import com.squareup.okhttp.HttpUrl;
import com.squareup.okhttp.OkHttpClient;
import com.squareup.okhttp.Request;
import com.squareup.okhttp.Response;

import lombok.extern.slf4j.Slf4j;

@Service
@ConfigurationProperties()
@Slf4j
public class ImageServiceImpl implements ImageService {

	@Value("${privateKey}")
	private String API_KEY;

	@Value("${nasa.uri}")
	private String nasaUri;

	@Override
	public List<String> executeMultipleRestCalls(List<String> cameraList, List<String> dateList, boolean isCustomDate)
			throws IOException {
		final List<String> list = new ArrayList<String>();
		try {

			dateList.forEach(date -> cameraList.forEach((camera) -> {
				if (executeRestCall(date, camera, isCustomDate) != null)
					list.add(executeRestCall(date, camera, isCustomDate));
			}));

		} catch (Exception e) {
			log.error("Error executing rest call", e);
			throw new IOException(e);
		}

		log.info("list values are ->");
		for (String s : list) {
			log.info(s);
		}

		return list;
	}

	public String executeRestCall(String date, String camera, boolean isCustomDate) {
		log.info("Executing single REST call with parameters: date ->" + date + " :camera -> " + camera);
		String result = null;
		OkHttpClient client = new OkHttpClient();

		try {
			Response response = client.newCall(buildRequest(Utils.convertToYearMonthDay(date, isCustomDate), camera))
					.execute();
			result = downloadResponseToFile(response, date, isCustomDate);
		} catch (IOException e) {
			log.error("Error in single rest call", e);
		}
		return result;
	}

	private String downloadResponseToFile(Response response, String date, boolean isCustomDate) throws IOException {
		log.info("Downloading response to file: " + response + " with date -> " + date + "with isCustomDate ->"
				+ isCustomDate);

		String name = null;
		ObjectMapper mapper = new ObjectMapper();
		try {
			JsonNode root = mapper.readTree(response.body().string());

			// check if any photos are present
			if (root != null && root.path("photos").size() > 0) {
				JsonNode photoNode = root.path("photos").get(0);
				String idSource = photoNode.path("id").asText();
				name = photoNode.path("img_src").asText();
				Utils.downloadImageToFile(name, idSource, date, isCustomDate);
			}
		} catch (IOException e) {
			log.error("Error reading response or writting file", e);
			throw new IOException(e);
		}
		return name;
	}

	private Request buildRequest(String date, String camera) {

		HttpUrl.Builder urlBuilder = HttpUrl.parse(nasaUri).newBuilder();
		urlBuilder.addQueryParameter("api_key", API_KEY);
		urlBuilder.addQueryParameter("earth_date", date);
		urlBuilder.addQueryParameter("camera", camera);

		return new Request.Builder().url(urlBuilder.build().toString()).build();

	}

}
