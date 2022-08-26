package com.baysalmehmed.model.couchbase;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.couchbase.core.mapping.Document;
import org.springframework.data.couchbase.core.mapping.id.GeneratedValue;
import org.springframework.data.couchbase.core.mapping.id.GenerationStrategy;
import org.springframework.data.couchbase.core.mapping.id.IdPrefix;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Data
@Document
public class Profile {

    @IdPrefix
    private String prefix = "profile";

    @Id
    @GeneratedValue(delimiter = "_", strategy = GenerationStrategy.UNIQUE)
    private String id;

    private String firstName;
    private String surname;
    private String email;
    private String phoneNumber;
    private List<Vehicle> vehicles;
    private String password;

    public Profile() {
        this.vehicles = new ArrayList<>();
    }

    public void addVehicle(Vehicle vehicle){
        vehicles.add(vehicle);
    }

    public void deleteVehicle(String numberPlate){
        vehicles.removeIf(vehicle -> Objects.equals(vehicle.getNumberPlate(), numberPlate));
    }
}
