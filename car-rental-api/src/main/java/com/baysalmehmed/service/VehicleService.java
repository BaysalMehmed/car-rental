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

    private Profile profile;

    public VehicleService(VehicleRepository vehicleRepository, ProfileService profileService) {
        this.vehicleRepository = vehicleRepository;
        this.profileService = profileService;
        this.profile = profileService.getProfileById("profile_80036cdd-0f4c-4905-af45-b1e664d261e1");
    }

    private void getProfile(){
        profile = profileService.getProfileById("profile_80036cdd-0f4c-4905-af45-b1e664d261e1");
    }
    public List<Vehicle> getVehicles() {
        getProfile();
        return profile.getVehicles();
    }

    public Profile addVehicle(Vehicle vehicle){
        getProfile();
        profile.addVehicle(vehicle);
        return profileService.saveProfile(profile);
    }

    public Profile deleteVehicle(String numberPlate){
        getProfile();
        profile.deleteVehicle(numberPlate);
        return profileService.saveProfile(profile);
    }
}
