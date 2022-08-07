package com.baysalmehmed.controller;

import com.baysalmehmed.ProfileService;
import com.baysalmehmed.model.Profile;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/profile")
public class ProfileController {

    private final  ProfileService profileService;

    public ProfileController(ProfileService profileService) {
        this.profileService = profileService;
    }

    @GetMapping
    public ResponseEntity<Profile> getProfile(){
        return ResponseEntity.ok(profileService.getProfile());
    }

    @PostMapping
    public ResponseEntity<Profile> createProfile(@RequestBody Profile profile){
        return new ResponseEntity<>(profileService.createProfile(profile), HttpStatus.OK);
    }

}
