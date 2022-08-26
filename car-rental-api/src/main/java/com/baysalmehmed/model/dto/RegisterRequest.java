package com.baysalmehmed.model.dto;

import lombok.Data;

@Data
public class RegisterRequest extends LoginRequest {

    private String firstName;
    private String surname;
}
