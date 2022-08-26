package com.baysalmehmed.service;

import com.baysalmehmed.exception.ProfileNotFound;
import com.baysalmehmed.model.couchbase.Profile;
import com.baysalmehmed.repository.ProfileRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class ProfileService {

    protected final ProfileRepository profileRepository;

    public ProfileService(ProfileRepository profileRepository) {
        this.profileRepository = profileRepository;
    }

    public Profile getProfileById(String id){
        return profileRepository.findById(id).orElseThrow(() -> new ProfileNotFound(id));
    }

    public Profile getProfileByEmail(String email){
        return profileRepository.findByEmail(email).orElseThrow(() -> new ProfileNotFound(email));
    }

    public Profile saveProfile(Profile profile){
        profileRepository.save(profile);
        return profile;
    }
}
