package com.baysalmehmed.controller;

import com.baysalmehmed.model.couchbase.Vehicle;
import com.baysalmehmed.service.VehicleService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/vehicle")

public class VehicleController {

    private final VehicleService vehicleService;

    public VehicleController(VehicleService vehicleService) {
        this.vehicleService = vehicleService;
    }

    @GetMapping()
    public ResponseEntity<List<Vehicle>> getVehicles(){
        return ResponseEntity.ok(vehicleService.getVehicles());
    }

    @PostMapping
    public ResponseEntity<String> AddVehicle(@RequestBody Vehicle vehicle){
        return new ResponseEntity<>(vehicleService.addVehicle(vehicle), HttpStatus.OK);
    }

}
