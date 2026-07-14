package com.ecobridge.matching.dto;

import lombok.*;
import java.util.UUID;
import java.io.Serializable;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder



public class NearbyRecyclerResponse implements Serializable {

    private static final long serialVersionUID = 1L;



    private UUID recyclerId;

    private String recyclerName;

    private String companyName;

    private Double latitude;

    private Double longitude;

    private Double distanceKm;

    private Double availableCapacity;

}