package com.baysalmehmed.model;

import lombok.Data;

@Data
public class Vehicle {
    String brand;
    String model;
    String trim;
    VehicleColour colour;
    Integer year;
    String numberPlate;
}
