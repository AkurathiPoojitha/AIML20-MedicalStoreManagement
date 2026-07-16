package com.medicalstore.exception;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

	// Validation Errors
	@ExceptionHandler(MethodArgumentNotValidException.class)
	public Map<String, Object> handleValidationException(MethodArgumentNotValidException ex) {

		Map<String, Object> error = new HashMap<>();

		error.put("Time", LocalDateTime.now());
		error.put("Status", HttpStatus.BAD_REQUEST.value());

		Map<String, String> validationErrors = new HashMap<>();

		ex.getBindingResult().getFieldErrors().forEach(fieldError -> {
			validationErrors.put(fieldError.getField(), fieldError.getDefaultMessage());
		});

		error.put("Errors", validationErrors);

		return error;
	}

	// Runtime Exceptions
	@ExceptionHandler(RuntimeException.class)
	public Map<String, Object> handleRuntimeException(RuntimeException ex) {

		Map<String, Object> error = new HashMap<>();

		error.put("Time", LocalDateTime.now());
		error.put("Status", HttpStatus.NOT_FOUND.value());
		error.put("Message", ex.getMessage());

		return error;
	}

	// Other Exceptions
	@ExceptionHandler(Exception.class)
	public Map<String, Object> handleException(Exception ex) {

		Map<String, Object> error = new HashMap<>();

		error.put("Time", LocalDateTime.now());
		error.put("Status", HttpStatus.INTERNAL_SERVER_ERROR.value());
		error.put("Message", ex.getMessage());

		return error;
	}

}