package com.baysalmehmed.exception;

import lombok.Data;

@Data
public class Error {
    private String message;

    public Error(String errorMessage) {
        this.message = errorMessage;
    }
}
