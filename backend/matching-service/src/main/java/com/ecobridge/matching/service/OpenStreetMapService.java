package com.ecobridge.matching.service;

import com.ecobridge.matching.dto.PublicRecyclerResponse;
import org.springframework.cache.annotation.Cacheable;

import java.util.List;

@Cacheable(
        value = "publicRecyclers",
        key = "#latitude + '_' + #longitude"
)

public interface OpenStreetMapService {

    List<PublicRecyclerResponse> findNearby(
            Double latitude,
            Double longitude
    );

}