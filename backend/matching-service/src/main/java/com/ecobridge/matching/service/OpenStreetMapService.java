package com.ecobridge.matching.service;

import com.ecobridge.matching.dto.PublicRecyclerResponse;
import java.util.List;

public interface OpenStreetMapService {

    List<PublicRecyclerResponse> findNearby(
            Double latitude,
            Double longitude
    );

}