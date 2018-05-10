package com.nasa.domain;

import java.util.List;

import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonInclude(value = Include.NON_NULL)
public class ResponseDTO {

	@NotNull
	@JsonProperty("status")
	private Status status;

	@JsonProperty("message")
	private String message;
	
	@JsonProperty("list")
	private List<String> fileList;

	public ResponseDTO(@JsonProperty("status") Status status, @JsonProperty("message") String message) {
		this.status = status;
		this.message = message;
	}

	public Status getStatus() {
		return status;
	}

	public void setStatus(Status status) {
		this.status = status;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}
	
	public List<String> getFileList() {
		return fileList;
	}
	
	public void setFileList(List<String> fileList) {
		this.fileList = fileList;
	}

	public enum Status {
		SUCCESS, FAIL
	}

}
