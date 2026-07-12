package com.ecobridge.matching.dto;

import lombok.*;
import com.ecobridge.matching.enums.WasteType;
import com.ecobridge.matching.enums.QuantityUnit;
import java.util.UUID;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class NearbyWasteResponse {

    private UUID id;

    private String title;

    private String description;

    private WasteType wasteType;

    private Double quantity;

    private QuantityUnit quantityUnit;

    private String address;

    private Double latitude;

    private Double longitude;

    private String imageUrl;

    private Double distance;

}