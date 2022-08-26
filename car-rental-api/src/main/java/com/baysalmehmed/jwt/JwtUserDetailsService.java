package com.baysalmehmed.jwt;

import com.baysalmehmed.model.couchbase.Profile;
import com.baysalmehmed.service.ProfileService;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class JwtUserDetailsService implements UserDetailsService {

    private final ProfileService profileService;

    public JwtUserDetailsService(ProfileService profileService) {
        this.profileService = profileService;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {

        Profile profile = profileService.getProfileByEmail(email);

        if(profile != null){
            return new User(profile.getEmail(), profile.getPassword(),
                    new ArrayList<>());
        } else throw new UsernameNotFoundException("User not found with email: " + email);
    }
}