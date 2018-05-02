package com.nasa.service;

import java.io.IOException;
import java.util.List;

import org.springframework.stereotype.Service;

@Service
public interface ImageService {

	public List<String> executeMultipleRestCalls(List<String> cameraList, List<String> dateList, boolean isCustomeDate) throws IOException;

}
