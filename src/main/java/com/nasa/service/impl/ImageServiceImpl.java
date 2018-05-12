package com.nasa.service.impl;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.messaging.simp.SimpMessagingTemplate;
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

	@Autowired
	private SimpMessagingTemplate template;
	
	private OkHttpClient client;
	
	public ImageServiceImpl(){
		this.client = new OkHttpClient();
	}
	
	@Override
	public void executeMultipleRestCalls(List<String> cameraList, List<String> dateList) throws IOException {

		try {

			dateList.forEach(
					date -> cameraList.forEach((camera) -> executeAsyncRestCall(date, camera, new AsyncCallback<String>() {
						@Override
						public void callbackValue(String value) {
							if (value != null)
								sendMessageThroughSocket(value);
						}
					})));

		} catch (Exception e) {
			log.error("Error executing rest call", e);
			throw new IOException(e);
		}
	}

	protected void sendMessageThroughSocket(String value) {
		this.template.convertAndSend("/image-topic", Collections.singleton(value));
	}

	public void executeAsyncRestCall(String date, String camera, final AsyncCallback asyncCallback) {
		log.info("Executing single REST call with parameters: date ->" + date + " :camera -> " + camera);

		client.newCall(buildRequest(Utils.convertToYearMonthDay(date), camera)).enqueue(new Callback() {
			
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
						asyncCallback.callbackValue(downloadResponseToFile(response, date));
					} catch (Exception e) {
						log.error("Error in single rest call on success", e);
						throw new IOException(e);
					}
				}
			}
		});
	}

	private String downloadResponseToFile(Response response, String date) throws IOException {
		log.info("Downloading response to file: " + response + " with date -> " + date);

		String name = null;
		ObjectMapper mapper = new ObjectMapper();
		try {
			JsonNode root = mapper.readTree(response.body().string());

			// check if any photos are present
			if (root != null && root.path("photos").size() > 0) {
				JsonNode photoNode = root.path("photos").get(0);
				String idSource = photoNode.path("id").asText();
				name = photoNode.path("img_src").asText();
				Utils.downloadImageToFile(name, idSource, date);
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
