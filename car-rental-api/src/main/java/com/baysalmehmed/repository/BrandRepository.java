package com.baysalmehmed.repository;

import com.baysalmehmed.model.couchbase.Brand;
import org.springframework.data.couchbase.repository.CouchbaseRepository;
import org.springframework.data.couchbase.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BrandRepository extends CouchbaseRepository<Brand, String> {
    @Query("#{#n1ql.selectEntity} WHERE meta().id LIKE 'brand%'")
    List<Brand> getAllBrands();
}
