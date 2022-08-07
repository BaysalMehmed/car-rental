package com.baysalmehmed.model.couchbase;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.couchbase.core.mapping.Document;
import org.springframework.data.couchbase.core.mapping.id.GeneratedValue;
import org.springframework.data.couchbase.core.mapping.id.GenerationStrategy;
import org.springframework.data.couchbase.core.mapping.id.IdPrefix;
import java.util.List;

@Data
@Document
public class Profile {

    @IdPrefix
    private String prefix = "profile";

    @Id
    @GeneratedValue(delimiter = "_", strategy = GenerationStrategy.UNIQUE)
    private String id;

    private String firstName;
    private String surname;
    private String email;
    private String phoneNumber;
    private List<Vehicle> vehicles;
}
