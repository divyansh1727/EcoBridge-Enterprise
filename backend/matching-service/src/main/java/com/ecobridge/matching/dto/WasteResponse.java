package com.ecobridge.matching.dto;

import com.ecobridge.matching.enums.QuantityUnit;
import com.ecobridge.matching.enums.WasteStatus;
import com.ecobridge.matching.enums.WasteType;
import lombok.*;

import java.time.LocalDateTime;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class WasteResponse {

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

    private WasteStatus status;

    private UUID createdBy;

    private LocalDateTime pickupStart;

    private LocalDateTime pickupEnd;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;
}