package com.nasa.controllers;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nasa.utils.Utils;

import lombok.extern.slf4j.Slf4j;

@RestController
@ConfigurationProperties()
@Slf4j
@CrossOrigin(origins = "http://localhost:3000")
public class FileController {

	@Value("${date.file}")
	private String dateFile;

	@GetMapping("/files/dates")

	public List<String> returnDatesFromFile() {
		log.info("Starting file read for dates");
		List<String> list = new ArrayList<String>();
		try {
			list = Utils.readFileIntoDateArray(dateFile);
		} catch (Exception e) {
			log.error("Error fetching dates from file", e.toString());
			return new ArrayList<String>();
		}
		return list;
	}

}
