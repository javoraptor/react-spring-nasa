package com.nasa.utils;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.net.URI;
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

public class Utils {

	public static void downloadImageToFile(String url, String idSource) {
		RestTemplate restTemplate = new RestTemplate();
		byte[] imageBytes = restTemplate.getForObject(url, byte[].class);
		writeBytesToFile(imageBytes, idSource + ".jpg");
	}

	private static void writeBytesToFile(byte[] bFile, String fileDest) {

		FileOutputStream fileOuputStream = null;

		try {
			fileOuputStream = new FileOutputStream(".\\images\\" + fileDest);
			fileOuputStream.write(bFile);

		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			if (fileOuputStream != null) {
				try {
					fileOuputStream.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
		}

	}

	public static List<String> readFileIntoDateArray(String fileName) {
		List<String> dateList = new ArrayList<>(5);

		try (Scanner scan = new Scanner(new File(fileName))) {
			while (scan.hasNext()) {

				dateList.add(formatDate(scan.next()));
			}
		} catch (Exception e) {
			System.out.printf("Caught Exception: %s%n", e.getMessage());
			e.printStackTrace();
		}
		return dateList;
	}

	private static String formatDate(String next) {

		return convertToYearMonthDay(next);
	}

	public static String convertToYearMonthDay(String temp) {
		SimpleDateFormat before = new SimpleDateFormat("dd MMMM, yyyy");
		SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
		String dateInString = temp;
		Date date = null;

		try {

			date = before.parse(dateInString);

		} catch (ParseException e) {
			e.printStackTrace();
		}
		return formatter.format(date);
	}

}
