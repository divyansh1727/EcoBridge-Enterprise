package com.ecobridge.matching.dto;

import lombok.*;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class NearbyRecyclerResponse {



    private UUID recyclerId;

    private String recyclerName;

    private String companyName;

    private Double latitude;

    private Double longitude;

    private Double distanceKm;

    private Double availableCapacity;

}