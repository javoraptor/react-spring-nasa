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

@RestController
@CrossOrigin
public class ImageController {
	
	@Autowired
	ImageService imageService;

	@GetMapping("/fetch-images/date/{date}/camera-list/{cameraList}")
	public boolean fetchImages(@PathVariable("date") String date,
								@PathVariable("cameraList") ArrayList<String> cameraList) {
		
		try {
			imageService.executeMultipleRestCalls(cameraList, date);
		} catch (IOException e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}

}
