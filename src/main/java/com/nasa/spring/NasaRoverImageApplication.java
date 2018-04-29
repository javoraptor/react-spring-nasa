package com.nasa.spring;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication (scanBasePackages = { "com.nasa" })
public class NasaRoverImageApplication {
	
	public static void main(String[] args) {
		SpringApplication.run(NasaRoverImageApplication.class, args);
	}
}
