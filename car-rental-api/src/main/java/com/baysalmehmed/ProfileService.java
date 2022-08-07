package com.baysalmehmed;

import com.baysalmehmed.model.Profile;
import com.baysalmehmed.model.Vehicle;
import com.baysalmehmed.model.VehicleColour;
import com.sun.tools.javac.util.List;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
@Service
@Slf4j
public class ProfileService {

    public Profile getProfile(){
        Profile profile = new Profile();
        profile.setFirstName("Baysal");
        profile.setSurname("Mehmed");
        profile.setEmail("baysalmehmed1@gmail.com");
        profile.setPhoneNumber("07401498930");

        Vehicle vehicle = new Vehicle();
        vehicle.setBrand("Tesla");
        vehicle.setModel("Model 3");
        vehicle.setTrim("Long Range");
        vehicle.setColour(VehicleColour.WHITE);
        vehicle.setYear(2020);
        vehicle.setNumberPlate("LB70 SGY");

        profile.setVehicles(List.of(vehicle));

        return profile;
    }

    public Profile createProfile(Profile profile){
        log.warn(String.valueOf(profile));
        return profile;
    }

}
