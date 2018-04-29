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

@Service
@ConfigurationProperties()
public class ImageServiceImpl implements ImageService{
	
	@Value("${privateKey}")
	private String API_KEY;
	
	@Value("${nasa.uri}")
	private String nasaUri;
	
	@Override
	public void executeMultipleRestCalls(List<String> cameraList, String date) throws IOException{
		cameraList.forEach((camera) -> executeRestCall(date, camera));
	}

	public void executeRestCall(String date, String camera){

		OkHttpClient client = new OkHttpClient();

		client.newCall(buildRequest(Utils.convertToYearMonthDay(date), camera)).enqueue(new Callback() {
			@Override
			public void onFailure(Request request, IOException e) {
				e.printStackTrace();
			}

			@Override
			public void onResponse(Response response) throws IOException {
				if (!response.isSuccessful()) {
					throw new IOException("Unexpected code " + response);
				} else {
					downloadToFile(response);
				}
			}
		});
	}

	private void downloadToFile(Response response) {
		ObjectMapper mapper = new ObjectMapper();
		try {
			JsonNode root = mapper.readTree(response.body().string().toString());

			// check if any photos are present
			if (root.path("photos").size() > 0) {
				JsonNode photoNode = root.path("photos").get(0);
				String idSource = photoNode.path("id").asText();
				String name = photoNode.path("img_src").asText();
				Utils.downloadImageToFile(name, idSource);
			}
		} catch (IOException e) {
			e.printStackTrace();
		}
		
	}

	private Request buildRequest(String date, String camera) {
		
		HttpUrl.Builder urlBuilder = HttpUrl.parse(nasaUri)
				.newBuilder();
		urlBuilder.addQueryParameter("api_key", API_KEY);
		urlBuilder.addQueryParameter("earth_date", date);
		urlBuilder.addQueryParameter("camera", camera);

		return new Request.Builder().url(urlBuilder.build().toString()).build();
		
	}

}
