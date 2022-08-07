package com.baysalmehmed.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/up")
public class UpController {

    @GetMapping()
    public ResponseEntity<HttpStatus> upCheck(){
        return new ResponseEntity<>( HttpStatus.OK);
    }

}
