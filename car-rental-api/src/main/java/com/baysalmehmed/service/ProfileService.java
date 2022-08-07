package com.baysalmehmed.service;

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

    public Profile getProfile(String id){
        return profileRepository.findById(id).orElse(null);
    }

    public String createProfile(Profile profile){
        profileRepository.save(profile);
        return profile.getId();
    }

}
