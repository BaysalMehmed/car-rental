package com.baysalmehmed.repository;

import com.baysalmehmed.model.couchbase.Profile;
import com.baysalmehmed.model.couchbase.Vehicle;
import org.springframework.data.couchbase.repository.CouchbaseRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface VehicleRepository extends CouchbaseRepository<Vehicle, String> {

    Optional<Vehicle> findById(String id);
    
}
