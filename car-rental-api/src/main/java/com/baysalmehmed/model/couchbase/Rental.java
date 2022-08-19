package com.baysalmehmed.model.couchbase;

import com.baysalmehmed.model.dto.VehicleColour;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.couchbase.core.mapping.Document;
import org.springframework.data.couchbase.core.mapping.id.GeneratedValue;
import org.springframework.data.couchbase.core.mapping.id.GenerationStrategy;
import org.springframework.data.couchbase.core.mapping.id.IdAttribute;
import org.springframework.data.couchbase.core.mapping.id.IdPrefix;

import java.util.Date;

@Data
public class Rental {

    Date startDate;
    Date endDate;
    String renter;

}
