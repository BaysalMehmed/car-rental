package com.baysalmehmed.controller;

import com.baysalmehmed.jwt.JwtResponse;
import com.baysalmehmed.jwt.JwtTokenUtil;
import com.baysalmehmed.jwt.JwtUserDetailsService;
import com.baysalmehmed.model.dto.AccessToken;
import com.baysalmehmed.model.dto.LoginRequest;
import com.baysalmehmed.model.dto.RegisterRequest;
import com.baysalmehmed.service.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    private final AuthenticationManager authenticationManager;

    private final JwtUserDetailsService userDetailsService;

    private final JwtTokenUtil jwtTokenUtil;

    public AuthController(AuthService authService, AuthenticationManager authenticationManager, JwtUserDetailsService userDetailsService, JwtTokenUtil jwtTokenUtil) {
        this.authService = authService;
        this.authenticationManager = authenticationManager;
        this.userDetailsService = userDetailsService;
        this.jwtTokenUtil = jwtTokenUtil;
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody RegisterRequest registerRequest){
        return ResponseEntity.ok(authService.register(registerRequest));
    }

    @PostMapping("/login")
    public ResponseEntity<JwtResponse> login(@RequestBody LoginRequest loginRequest) {

        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));

        final UserDetails userDetails = userDetailsService
                .loadUserByUsername(loginRequest.getEmail());

        final String token = jwtTokenUtil.generateToken(userDetails);

        return ResponseEntity.ok(new JwtResponse(token));
    }
}
