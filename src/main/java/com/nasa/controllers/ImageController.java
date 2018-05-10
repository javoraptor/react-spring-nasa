package com.nasa.controllers;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.nasa.domain.ResponseDTO;
import com.nasa.service.ImageService;
import com.nasa.utils.MessageConstants;
import com.nasa.utils.Utils;

import lombok.extern.slf4j.Slf4j;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@ConfigurationProperties()
@Slf4j
public class ImageController {
	
	@Autowired
	ImageService imageService;
	
	@Value("${date.file}")
	private String dateFile;

	@Cacheable("ui-images")
	@GetMapping("/images/date/{date}")
	public ResponseDTO fetchImages(@PathVariable("date") String date,
								@RequestParam(value="cameras", required=true) List<String> cameraList) {
		log.info("Begining REST call with parameters: date -> " + date + " : cameraList -> " + cameraList);
		
    	ResponseDTO responseDTO = new ResponseDTO(ResponseDTO.Status.SUCCESS,
                MessageConstants.RETRIEVED_SUCCESSFULLY);
		
		try {
			imageService.executeMultipleRestCalls(cameraList, Arrays.asList(date));
		} catch (IOException e) {
			log.error("Error making REST calls", e.toString());
			responseDTO.setStatus(ResponseDTO.Status.FAIL);
            responseDTO.setMessage(e.getMessage());
		}
		return responseDTO;
	}
	
	@Cacheable("file-images")
	@GetMapping("/images/file")
	public ResponseDTO readDatesFromFile(@RequestParam(value="cameras", required=true) List<String> cameraList) {
		log.info("Begining REST call with parameters: cameraList -> " + cameraList);
		
	   	ResponseDTO responseDTO = new ResponseDTO(ResponseDTO.Status.SUCCESS,
                MessageConstants.RETRIEVED_SUCCESSFULLY);
	   	
		try {
			imageService.executeMultipleRestCalls(cameraList, Utils.readFileIntoDateArray(dateFile));
		} catch (Exception e) {
			log.error("Error making REST calls", e.toString());
			responseDTO.setStatus(ResponseDTO.Status.FAIL);
            responseDTO.setMessage(e.getMessage());
		}
		return responseDTO;
	}

}
