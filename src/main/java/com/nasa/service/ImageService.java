package com.nasa.service;

import java.io.IOException;
import java.util.List;

import org.springframework.stereotype.Service;

@Service
public interface ImageService {

	public void executeMultipleRestCalls(List<String> cameraList, List<String> dateList) throws IOException;
}
