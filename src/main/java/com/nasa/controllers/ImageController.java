package com.nasa.controllers;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.nasa.service.ImageService;

import lombok.extern.slf4j.Slf4j;

@RestController
@CrossOrigin //allows react server to connect
@Slf4j
public class ImageController {
	
	@Autowired
	ImageService imageService;

	@GetMapping("/images/date/{date}/camera-list")
	public boolean fetchImages(@PathVariable("date") String date,
								@RequestParam("cameras") ArrayList<String> cameraList) {
		log.info("Begining REST call with parameters: date -> "+date+" : cameraList -> " + cameraList );
		try {
			imageService.executeMultipleRestCalls(cameraList, date);
		} catch (IOException e) {
			log.error("Error making REST calls", e.toString());
			return false;
		}
		return true;
	}

}
