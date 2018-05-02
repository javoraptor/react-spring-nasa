package com.nasa.controllers;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.nasa.service.ImageService;
import com.nasa.utils.Utils;

import lombok.extern.slf4j.Slf4j;

@RestController
@CrossOrigin //allows react server to connect
@ConfigurationProperties()
@Slf4j
public class ImageController {
	
	@Autowired
	ImageService imageService;
	
	@Value("${date.file}")
	private String dateFile;

	@GetMapping("/images/date/{date}")
	public boolean fetchImages(@PathVariable("date") String date,
								@RequestParam(value="cameras", required=true) List<String> cameraList) {
		log.info("Begining REST call with parameters: date -> "+date+" : cameraList -> " + cameraList );
		try {
			imageService.executeMultipleRestCalls(cameraList, Arrays.asList(date), true);
		} catch (IOException e) {
			log.error("Error making REST calls", e.toString());
			return false;
		}
		return true;
	}
	
	@GetMapping("/images/file")
	public boolean readDatesFromFile(@RequestParam(value="cameras", required=true) List<String> cameraList) {
		log.info("Begining REST call with parameters: cameraList -> " + cameraList );
		try {
			imageService.executeMultipleRestCalls(cameraList, Utils.readFileIntoDateArray(dateFile), false);
		} catch (IOException e) {
			log.error("Error making REST calls", e.toString());
			return false;
		}
		return true;
	}

}
