package com.nasa.service.impl;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
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
	public void executeMultipleRestCalls(List<String> cameraList, List<String> dateList, boolean isCustomDate) throws IOException {
		try {
			
			dateList.forEach(date-> cameraList.forEach((camera) -> executeRestCall(date, camera, isCustomDate)));
			
		} catch (Exception e) {
			log.error("Error executing rest call", e);
			throw new IOException(e);
		}
	}

	public void executeRestCall(String date, String camera, boolean isCustomDate) {
		log.info("Executing single REST call with parameters: date ->" + date + " :camera -> " + camera);
		OkHttpClient client = new OkHttpClient();

		client.newCall(buildRequest(Utils.convertToYearMonthDay(date, isCustomDate), camera)).enqueue(new Callback() {
			@Override
			public void onFailure(Request request, IOException e) {
				log.error("Error in single rest call", e);
			}

			@Override
			public void onResponse(Response response) throws IOException {
				if (!response.isSuccessful()) {
					throw new IOException("HTTP response code not within 200-300: " + response);
				} else {
					try {
						downloadResponseToFile(response, date, isCustomDate);
					} catch (Exception e) {
						log.error("Error in single rest call on success", e);
						throw new IOException(e);
					}
				}
			}
		});
	}

	private void downloadResponseToFile(Response response, String date, boolean isCustomDate) throws IOException {
		log.info("Downloading response to file: " + response +" with date -> "+ date + "with isCustomDate ->" + isCustomDate);

		ObjectMapper mapper = new ObjectMapper();
		try {
			JsonNode root = mapper.readTree(response.body().string().toString());

			// check if any photos are present
			if (root.path("photos").size() > 0) {
				JsonNode photoNode = root.path("photos").get(0);
				String idSource = photoNode.path("id").asText();
				String name = photoNode.path("img_src").asText();
				Utils.downloadImageToFile(name, idSource, date, isCustomDate);
			}
		} catch (IOException e) {
			log.error("Error reading response or writting file", e);
			throw new IOException(e);
		}
	}

	private Request buildRequest(String date, String camera) {

		HttpUrl.Builder urlBuilder = HttpUrl.parse(nasaUri).newBuilder();
		urlBuilder.addQueryParameter("api_key", API_KEY);
		urlBuilder.addQueryParameter("earth_date", date);
		urlBuilder.addQueryParameter("camera", camera);

		return new Request.Builder().url(urlBuilder.build().toString()).build();

	}

}
