package com.baysalmehmed.controller;

import com.baysalmehmed.model.couchbase.Availability;
import com.baysalmehmed.model.couchbase.Brand;
import com.baysalmehmed.model.couchbase.Profile;
import com.baysalmehmed.model.couchbase.Vehicle;
import com.baysalmehmed.service.ImageService;
import com.baysalmehmed.service.VehicleService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Controller
@Slf4j
@RequestMapping("/vehicle")

public class VehicleController {

    private final VehicleService vehicleService;
    private final ImageService imageService;


    public VehicleController(VehicleService vehicleService, ImageService imageService) {
        this.vehicleService = vehicleService;
        this.imageService = imageService;
    }

    @GetMapping()
    public ResponseEntity<List<Vehicle>> getVehicles(){
        return ResponseEntity.ok(vehicleService.getVehicles());
    }

    @GetMapping("/brands")
    public ResponseEntity<List<Brand>> getBrands() {
        return ResponseEntity.ok(vehicleService.getBrands());
    }

    @PostMapping(consumes = "multipart/form-data")
    public ResponseEntity<Profile> AddVehicle(@RequestPart("vehicle") String vehicleString, @RequestPart(value = "files", required = false) List<MultipartFile> files) throws JsonProcessingException {

        ObjectMapper om = new ObjectMapper();
        Vehicle vehicle = om.readValue(vehicleString, Vehicle.class);
        return new ResponseEntity<>(vehicleService.addVehicle(vehicle, files), HttpStatus.OK);
    }

    @DeleteMapping("/{numberPlate}")
    public ResponseEntity<Profile> DeleteVehicle(@PathVariable String numberPlate){
        return new ResponseEntity<>(vehicleService.deleteVehicle(numberPlate), HttpStatus.OK);
    }

    @PutMapping("/{numberPlate}/availability")
    public ResponseEntity<List<Availability>> updateAvailability(@PathVariable String numberPlate, @RequestBody List<Availability> availabilities){
        return ResponseEntity.ok(vehicleService.updateAvailability(numberPlate, availabilities));
    }

    @GetMapping(path="/image/{imageName}")
    public ResponseEntity<Resource> getImageForVehicle(@PathVariable String imageName){
        Resource file = imageService.loadImage(imageName);
        return ResponseEntity.ok().header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + file.getFilename() + "\"").body(file);
    }
    @PostMapping(path="/{numberPlate}/image", consumes = "multipart/form-data")
    public ResponseEntity<String> addImageForVehicle(@PathVariable String numberPlate, @RequestPart(value = "files", required = true) List<MultipartFile> files){
        return ResponseEntity.ok(vehicleService.addImagesToVehicle(numberPlate, files ));
    }
}
