package com.ecobridge.matching.dto;

import lombok.*;

import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MatchResultResponse {

    private UUID recyclerId;

    private String companyName;

    private String recyclerName;

    private Double distanceKm;

    private Double availableCapacity;
}