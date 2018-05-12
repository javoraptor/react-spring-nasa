package com.nasa.utils;

import static org.assertj.core.api.Assertions.assertThat;

import java.io.FileNotFoundException;
import java.util.List;

import org.junit.Test;

public class UtilsTest {
	
	Utils utils = new Utils();
	
	@Test
	public void givenDate_whenConvertToYearMonthDay_thenFormatCorrectly() {
		String correctFormat = "2019-05-05";
		@SuppressWarnings("static-access")
		String newFormat = utils.convertToYearMonthDay("05-May-19");
		assertThat(newFormat).isEqualTo(correctFormat);
	}
	
	@Test
	public void givenFile_whenProcessing_thenReadIntoArray() throws FileNotFoundException {
		
		@SuppressWarnings("static-access")
		List<String> list = utils.readFileIntoDateArray("src/MarsDates.txt");
		assertThat(list).isNotEmpty();
		assertThat(list).contains("5-May-19");
	}

}
