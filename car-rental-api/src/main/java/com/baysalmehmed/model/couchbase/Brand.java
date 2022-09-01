package com.baysalmehmed.model.couchbase;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.couchbase.core.mapping.Document;

import java.util.List;

@Data
@Document
public class Brand {

    @Id
    String id;
    String name;
    List<Model> models;

}

