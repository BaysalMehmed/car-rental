package com.baysalmehmed.service;

import com.baysalmehmed.exception.PasswordDoesNotMatch;
import com.baysalmehmed.model.couchbase.Profile;
import com.baysalmehmed.model.dto.LoginRequest;
import com.baysalmehmed.model.dto.RegisterRequest;
import com.baysalmehmed.repository.ProfileRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {

    protected final ProfileRepository profileRepository;

    protected final PasswordEncoder encoder;

    public AuthService(ProfileRepository profileRepository, PasswordEncoder encoder) {
        this.profileRepository = profileRepository;
        this.encoder = encoder;
    }
    public String register(RegisterRequest registerRequest){
        Profile profile = new Profile();
        profile.setFirstName(registerRequest.getFirstName());
        profile.setSurname(registerRequest.getSurname());
        profile.setEmail(registerRequest.getEmail());
        profile.setPassword(encoder.encode(registerRequest.getPassword()));
        return profileRepository.save(profile).getId();
    }

    public String login(LoginRequest loginRequest) {

        passwordMatch(loginRequest);
//        Authentication authentication = authenticationManager
//                .authenticate
//                        (new UsernamePasswordAuthenticationToken
//                                (loginRequest.getEmail(),
//                                        loginRequest.getPassword()));
//
//        SecurityContextHolder.getContext()
//                .setAuthentication(authentication);
        return "Success";
    }

    private void passwordMatch(LoginRequest loginRequest){
        Optional<Profile> profile = profileRepository.findByEmail(loginRequest.getEmail());
        boolean matches = false;

        if(profile.isPresent()){
            matches = encoder.matches(loginRequest.getPassword(), profile.get().getPassword());
        }

        if(profile.isEmpty() || !matches){
            throw new PasswordDoesNotMatch();
        }
    }
}
