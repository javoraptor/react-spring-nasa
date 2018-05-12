package com.nasa.spring;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.hamcrest.CoreMatchers.is;

import java.io.IOException;
import java.util.Arrays;
import java.util.Date;
import java.util.List;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import com.nasa.controllers.ImageController;
import com.nasa.service.ImageService;

@RunWith(SpringRunner.class)
@WebMvcTest(value = ImageController.class, secure = false)
public class ImageControllerTest {
	
	@MockBean
	ImageService imageService;
	
	@Autowired
	private MockMvc mockMvc;
	
	@Before
	public void setUp() throws IOException {
		String date = new Date().toString();
		List<String> cameraList = Arrays.asList("FHAZ","RHAZ");
		doNothing().when(imageService).executeMultipleRestCalls(cameraList, Arrays.asList(date));
		doThrow(IOException.class).when(imageService).executeMultipleRestCalls(cameraList, Arrays.asList("null"));
	}

	@Test
	public void givenRestCall_whenExceptionOccurs_thenReturnFalse() throws Exception {
		mockMvc.perform(get("/images/date/null?cameras=FHAZ,RHAZ")).andExpect(status().isOk())
        .andExpect(jsonPath("status", is("FAIL") ));
	}
	
	@Test
	public void givenRestCall_whenParametersAreValid_thenReturnTrue() throws Exception {
		mockMvc.perform(get("/images/date/12-3-1999?cameras=FHAZ,RHAZ")).andExpect(status().isOk())
        .andExpect( jsonPath("status", is("SUCCESS")) );
	}
	
	@Test
	public void givenRestCall_whenCameraParametersAreMissing_thenReturnClientError() throws Exception {
		mockMvc.perform(get("/images/date/12-3-1999")).andExpect(status().is4xxClientError());
	}

}
