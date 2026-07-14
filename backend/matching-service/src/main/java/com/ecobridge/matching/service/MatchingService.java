package com.ecobridge.matching.service;

import com.ecobridge.matching.dto.*;
import java.util.List;
import java.util.UUID;


public interface MatchingService {

    List<MatchResultResponse> findMatches(UUID wasteId);
    List<NearbyWasteResponse> getNearbyWaste(
            Double latitude,
            Double longitude
    );
    List<WasteResponse> test();

    NearbyPartnersResponse getNearbyRecyclers(
            Double latitude,
            Double longitude
    );;



}