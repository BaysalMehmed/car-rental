package com.baysalmehmed.service;

import com.baysalmehmed.model.couchbase.Vehicle;
import com.baysalmehmed.repository.VehicleRepository;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class VehicleService {

    protected final VehicleRepository vehicleRepository;

    public VehicleService(VehicleRepository vehicleRepository) {
        this.vehicleRepository = vehicleRepository;
    }

    public List<Vehicle> getVehicles() {
        return vehicleRepository.findAll();
    }

    public String addVehicle(Vehicle vehicle){
        return vehicleRepository.save(vehicle).getId();
    }
}
