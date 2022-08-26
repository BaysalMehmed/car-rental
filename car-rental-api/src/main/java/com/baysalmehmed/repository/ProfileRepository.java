package com.baysalmehmed.repository;

import com.baysalmehmed.model.couchbase.Profile;
import org.springframework.data.couchbase.repository.CouchbaseRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ProfileRepository extends CouchbaseRepository<Profile, String> {

    Optional<Profile> findById(String id);

    Optional<Profile> findByEmail(String email);

}
