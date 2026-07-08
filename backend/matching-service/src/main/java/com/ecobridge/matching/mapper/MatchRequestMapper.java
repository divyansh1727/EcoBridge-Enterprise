package com.ecobridge.matching.mapper;

import com.ecobridge.matching.dto.response.MatchRequestResponse;
import com.ecobridge.matching.entity.MatchRequest;
import org.springframework.stereotype.Component;

@Component
public class MatchRequestMapper {

    public MatchRequestResponse toResponse(MatchRequest matchRequest) {

        return MatchRequestResponse.builder()
                .id(matchRequest.getId())
                .wasteId(matchRequest.getWasteId())
                .generatorId(matchRequest.getGeneratorId())
                .recyclerId(matchRequest.getRecyclerId())
                .status(matchRequest.getStatus())
                .distanceKm(matchRequest.getDistanceKm())
                .requestedAt(matchRequest.getRequestedAt())
                .acceptedAt(matchRequest.getAcceptedAt())
                .completedAt(matchRequest.getCompletedAt())
                .build();
    }
}