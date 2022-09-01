package com.baysalmehmed.model.couchbase;

import com.baysalmehmed.model.dto.VehicleColour;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class Vehicle {

    String brand;
    String model;
    String trim;
    VehicleColour colour;
    Integer year;
    String numberPlate;
    List<Availability> availability;
    List<Rental> rentals;
    List<String> imageNames;

    public Vehicle() {
        this.rentals = new ArrayList<>();
    }
}
