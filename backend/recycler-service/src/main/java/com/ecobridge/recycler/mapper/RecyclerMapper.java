package com.ecobridge.recycler.mapper;
import com.ecobridge.recycler.dto.response.RecyclerResponse;
import com.ecobridge.recycler.entity.Recycler;
import org.springframework.stereotype.Component;
import com.ecobridge.recycler.entity.RecyclerWasteType;

import java.util.List;

@Component
public class RecyclerMapper {

    public RecyclerResponse toResponse(Recycler recycler) {

        return RecyclerResponse.builder()
                .id(recycler.getId())
                .companyName(recycler.getCompanyName())
                .recyclerName(recycler.getRecyclerName())
                .email(recycler.getEmail())
                .phone(recycler.getPhone())
                .address(recycler.getAddress())
                .latitude(recycler.getLatitude())
                .longitude(recycler.getLongitude())
                .serviceRadiusKm(recycler.getServiceRadiusKm())
                .totalCapacity(recycler.getTotalCapacity())
                .availableCapacity(recycler.getAvailableCapacity())
                .recyclerType(recycler.getRecyclerType())
                .verificationStatus(recycler.getVerificationStatus())
                .status(recycler.getStatus())
                .createdBy(recycler.getCreatedBy())
                .createdAt(recycler.getCreatedAt())
                .updatedAt(recycler.getUpdatedAt())
                .acceptedWasteTypes(
                        recycler.getAcceptedWasteTypes() == null
                                ? List.of()
                                : recycler.getAcceptedWasteTypes()
                                .stream()
                                .map(RecyclerWasteType::getWasteType)
                                .toList()
                )
                .build();
    }
}