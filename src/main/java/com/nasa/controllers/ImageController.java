package com.nasa.controllers;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.nasa.service.ImageService;

import lombok.extern.slf4j.Slf4j;

@RestController
@CrossOrigin
@Slf4j
public class ImageController {
	
	@Autowired
	ImageService imageService;

	@GetMapping("/fetch-images/date/{date}/camera-list/{cameraList}")
	public boolean fetchImages(@PathVariable("date") String date,
								@PathVariable("cameraList") ArrayList<String> cameraList) {
		log.info("Begining REST call with parameters: date -> "+date+" : cameraList -> " +cameraList );
		try {
			imageService.executeMultipleRestCalls(cameraList, date);
		} catch (IOException e) {
			log.error("Error making REST calls", e.toString());
			return false;
		}
		return true;
	}

}
