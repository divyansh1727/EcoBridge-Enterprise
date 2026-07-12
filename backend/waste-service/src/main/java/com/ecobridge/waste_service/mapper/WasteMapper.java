package com.ecobridge.waste_service.mapper;

import com.ecobridge.waste_service.dto.response.WasteResponse;
import com.ecobridge.waste_service.entity.Waste;
import org.springframework.stereotype.Component;

@Component
public class WasteMapper {

    public WasteResponse toResponse(Waste waste) {

        return WasteResponse.builder()
                .id(waste.getId())
                .title(waste.getTitle())
                .description(waste.getDescription())
                .wasteType(waste.getWasteType())
                .quantity(waste.getQuantity())
                .quantityUnit(waste.getQuantityUnit())
                .address(waste.getAddress())
                .latitude(waste.getLatitude())
                .longitude(waste.getLongitude())
                .imageUrl(waste.getImageUrl())
                .status(waste.getStatus())
                .createdBy(waste.getCreatedBy())
                .pickupStart(waste.getPickupStart())
                .pickupEnd(waste.getPickupEnd())
                .createdAt(waste.getCreatedAt())
                .updatedAt(waste.getUpdatedAt())
                .reservedBy(
                waste.getReservedBy()
        )
                .build();
    }
}