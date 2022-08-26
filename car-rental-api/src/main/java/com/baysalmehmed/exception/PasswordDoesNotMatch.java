package com.baysalmehmed.exception;

public class PasswordDoesNotMatch extends RuntimeException{

    private static final long serialVersionUID = 1L;
    public PasswordDoesNotMatch() {
        super("Provided password does not match");
    }
}
