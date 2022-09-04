package com.baysalmehmed.service;

import com.baysalmehmed.model.couchbase.Availability;
import com.baysalmehmed.model.couchbase.Brand;
import com.baysalmehmed.model.couchbase.Profile;
import com.baysalmehmed.model.couchbase.Vehicle;
import com.baysalmehmed.repository.BrandRepository;
import com.baysalmehmed.repository.VehicleRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Objects;

@Service
public class VehicleService {

    protected final VehicleRepository vehicleRepository;

    protected final ProfileService profileService;

    protected final BrandRepository brandRepository;

    protected final ImageService imageService;

    private Profile profile;

    public VehicleService(VehicleRepository vehicleRepository, ProfileService profileService, BrandRepository brandRepository, ImageService imageService) {
        this.vehicleRepository = vehicleRepository;
        this.profileService = profileService;
        this.brandRepository = brandRepository;
        this.profile = profileService.getProfileById("profile_80036cdd-0f4c-4905-af45-b1e664d261e1");
        this.imageService = imageService;
    }

    private void getProfile(){
        profile = profileService.getProfileById("profile_80036cdd-0f4c-4905-af45-b1e664d261e1");
    }
    public List<Vehicle> getVehicles() {
        getProfile();
        return profile.getVehicles();
    }

    public List<Brand> getBrands(){
        return brandRepository.getAllBrands();
    }

    public Profile addVehicle(Vehicle vehicle, List<MultipartFile> files){
        getProfile();
        if (files != null) {
            vehicle.setImageNames(imageService.saveImages(files));
        }
        profile.addVehicle(vehicle);
        return profileService.saveProfile(profile);
    }

    public Profile deleteVehicle(String numberPlate){
        getProfile();
        profile.deleteVehicle(numberPlate);
        return profileService.saveProfile(profile);
    }

    public Profile updateAvailability(String numberPlate, List<Availability> availabilities){
        getProfile();
        profile.getVehicles().stream().filter(vehicle -> Objects.equals(vehicle.getNumberPlate(), numberPlate)).forEach(vehicle -> vehicle.setAvailability(availabilities));
        return profileService.saveProfile(profile);
    }
}
