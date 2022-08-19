package com.baysalmehmed.exception;

public class ProfileNotFound extends RuntimeException{

    private static final long serialVersionUID = 1L;
    public ProfileNotFound(String id) {
        super(String.format("Unable to find profile '%s'", id));
    }
}
