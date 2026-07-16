package com.medicalstore.exception;

public class InsufficientStockException extends RuntimeException {

	public InsufficientStockException(String message) {
		super(message);
	}

}