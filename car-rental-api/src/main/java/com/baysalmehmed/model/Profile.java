package com.baysalmehmed.model;

import lombok.Data;

import java.util.Collections;
import java.util.List;

@Data
public class Profile {
    private String firstName;
    private String surname;
    private String email;
    private String phoneNumber;
    private List<Vehicle> vehicles;

    public Profile() {
        this.vehicles = Collections.emptyList();
    }
}
