package com.nasa.utils;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.net.URI;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Scanner;

import org.springframework.http.HttpRequest;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public class Utils {

	public static void downloadImageToFile(String url, String idSource, String date) throws IOException {
		log.info("Downloading image to file with url -> " + url + " : idSource -> " + idSource);
		
		RestTemplate restTemplate = new RestTemplate();
		byte[] imageBytes = restTemplate.getForObject(url, byte[].class);
		writeBytesToFile(imageBytes, idSource + ".jpg", date);
	}

	private static void writeBytesToFile(byte[] bFile, String fileDest, String date) throws IOException {
		log.info("Writing image bytes to file, file destination -> " + fileDest);
		FileOutputStream fileOuputStream = null;
		String imageDirectoryName = "./images/";
		String fileLocation = "./images/" + convertToYearMonthDay(date) + "/";
		
		File imageDirectory = new File(imageDirectoryName);
		if (!imageDirectory.exists() && !imageDirectory.isDirectory()) {
			if(!new File(imageDirectoryName).mkdir())
			throw new IOException("Error creating directory with name -> " + imageDirectoryName);
		}
		
		File fileDirectory = new File(fileLocation);
		if (!fileDirectory.exists() && !fileDirectory.isDirectory()) {
			if(!new File(fileLocation).mkdir())
			throw new IOException("Error creating directory with date -> " + convertToYearMonthDay(date));
		}
		
		try {
			fileOuputStream = new FileOutputStream(fileLocation + fileDest);
			fileOuputStream.write(bFile);

		} catch (IOException e) {
			log.error("Error writing bytes to file for -> " + fileDest, e);
			throw new IOException(e);
		} finally {
			if (fileOuputStream != null) {
				try {
					fileOuputStream.close();
				} catch (IOException e) {
					log.error("Error closing fileoutput stream", e);
				}
			}
		}

	}

	public static List<String> readFileIntoDateArray(String fileName) {
		log.info("Reading file into date array, file name -> " + fileName);
		
		List<String> dateList = new ArrayList<>();

		try (Scanner scan = new Scanner(new File(fileName))) {
			while (scan.hasNext()) {
				dateList.add(convertToYearMonthDay(scan.next()));
			}
		} catch (Exception e) {
			log.error("Error reading file -> " + fileName, e);
		}
		return dateList;
	}

	public static String convertToYearMonthDay(String temp) {
		log.info("Converting date -> " + temp + "to correct format");
		
		SimpleDateFormat before = new SimpleDateFormat("dd MMMM, yyyy");
		SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
		String dateInString = temp;
		Date date = null;

		try {
			date = before.parse(dateInString);
		} catch (ParseException e) {
			log.error("Error converting date -> " + temp , e);
		}
		return formatter.format(date);
	}

}
