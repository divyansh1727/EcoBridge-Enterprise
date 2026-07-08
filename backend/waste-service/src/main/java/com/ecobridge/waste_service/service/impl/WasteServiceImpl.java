package com.ecobridge.waste_service.service.impl;

import com.ecobridge.waste_service.dto.request.CreateWasteRequest;
import com.ecobridge.waste_service.dto.request.UpdateWasteRequest;
import com.ecobridge.waste_service.dto.response.WasteResponse;
import com.ecobridge.waste_service.entity.Waste;
import com.ecobridge.waste_service.enums.WasteStatus;
import com.ecobridge.waste_service.exception.ResourceNotFoundException;
import com.ecobridge.waste_service.mapper.WasteMapper;
import com.ecobridge.waste_service.repository.WasteRepository;
import com.ecobridge.waste_service.security.CurrentUserUtil;
import com.ecobridge.waste_service.service.WasteService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class WasteServiceImpl implements WasteService {

    private final WasteRepository wasteRepository;
    private final WasteMapper wasteMapper;

    @Override
    public WasteResponse createWaste(CreateWasteRequest request) {

        Waste waste = Waste.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .wasteType(request.getWasteType())
                .quantity(request.getQuantity())
                .quantityUnit(request.getQuantityUnit())
                .address(request.getAddress())
                .latitude(request.getLatitude())
                .longitude(request.getLongitude())
                .imageUrl(request.getImageUrl())
                .pickupStart(request.getPickupStart())
                .pickupEnd(request.getPickupEnd())
                .createdBy(CurrentUserUtil.getCurrentUserId())
                .build();

        Waste savedWaste = wasteRepository.save(waste);

        return wasteMapper.toResponse(savedWaste);
    }


    @Override
    public WasteResponse getWasteById(UUID id) {

        Waste waste = wasteRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Waste not found with id: " + id));

        return wasteMapper.toResponse(waste);
    }

    @Override
    public List<WasteResponse> getMyWaste() {

        return wasteRepository.findByCreatedBy(
                        CurrentUserUtil.getCurrentUserId()
                )
                .stream()
                .map(wasteMapper::toResponse)
                .toList();
    }

    @Override
    public WasteResponse updateWaste(UUID id, UpdateWasteRequest request) {

        Waste waste = wasteRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Waste not found with id: " + id));

        waste.setTitle(request.getTitle());
        waste.setDescription(request.getDescription());
        waste.setWasteType(request.getWasteType());
        waste.setQuantity(request.getQuantity());
        waste.setQuantityUnit(request.getQuantityUnit());
        waste.setAddress(request.getAddress());
        waste.setLatitude(request.getLatitude());
        waste.setLongitude(request.getLongitude());
        waste.setImageUrl(request.getImageUrl());
        waste.setPickupStart(request.getPickupStart());
        waste.setPickupEnd(request.getPickupEnd());

        Waste updatedWaste = wasteRepository.save(waste);

        return wasteMapper.toResponse(updatedWaste);
    }

    @Override
    public void deleteWaste(UUID id) {

        Waste waste = wasteRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Waste not found with id: " + id));
        wasteRepository.delete(waste);
    }
    @Override
    public List<WasteResponse> getAllWaste() {

        return wasteRepository.findAll()
                .stream()
                .map(wasteMapper::toResponse)
                .toList();
    }
    @Override
    public WasteResponse reserveWaste(UUID id) {

        Waste waste = wasteRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Waste not found"));

        if (waste.getStatus() != WasteStatus.AVAILABLE) {
            throw new RuntimeException("Waste cannot be reserved");
        }

        Waste updated = wasteRepository.save(waste);

        return wasteMapper.toResponse(updated);
    }

}