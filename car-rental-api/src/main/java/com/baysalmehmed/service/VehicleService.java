package com.baysalmehmed.service;

import com.baysalmehmed.model.couchbase.Profile;
import com.baysalmehmed.model.couchbase.Vehicle;
import com.baysalmehmed.repository.VehicleRepository;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class VehicleService {

    protected final VehicleRepository vehicleRepository;

    protected final ProfileService profileService;

    public VehicleService(VehicleRepository vehicleRepository, ProfileService profileService) {
        this.vehicleRepository = vehicleRepository;
        this.profileService = profileService;
    }
    public List<Vehicle> getVehicles() {
        Profile profile = profileService.getProfile("profile_862a0857-0aaa-4faa-89b6-2be11b2f80b8");
        return profile.getVehicles();
    }

    public Vehicle addVehicle(Vehicle vehicle){
        return vehicleRepository.save(vehicle);
    }
}
