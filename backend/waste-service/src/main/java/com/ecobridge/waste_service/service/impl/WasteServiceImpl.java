package com.ecobridge.waste_service.service.impl;

import com.ecobridge.waste_service.dto.request.CreateWasteRequest;
import com.ecobridge.waste_service.dto.request.UpdateWasteRequest;
import com.ecobridge.waste_service.dto.response.RecyclerDashboardResponse;
import com.ecobridge.waste_service.dto.response.WasteResponse;
import com.ecobridge.waste_service.dto.response.WasteStatsResponse;
import com.ecobridge.waste_service.entity.Waste;
import com.ecobridge.waste_service.enums.WasteStatus;
import com.ecobridge.waste_service.events.WasteReservedEvent;
import com.ecobridge.waste_service.exception.ResourceNotFoundException;
import com.ecobridge.waste_service.mapper.WasteMapper;
import com.ecobridge.waste_service.producer.WasteReservedProducer;
import com.ecobridge.waste_service.repository.WasteRepository;
import com.ecobridge.waste_service.security.CurrentUserUtil;
import com.ecobridge.waste_service.service.WasteService;
import lombok.RequiredArgsConstructor;
import com.ecobridge.waste_service.dto.response.DailyWasteResponse;
import com.ecobridge.waste_service.dto.response.DailyWasteProjection;
import com.ecobridge.waste_service.events.WasteCreatedEvent;
import com.ecobridge.waste_service.producer.KafkaProducer;
import org.springframework.stereotype.Service;
import com.ecobridge.waste_service.events.WasteCompletedEvent;
import com.ecobridge.waste_service.producer.WasteCompletedProducer;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class WasteServiceImpl implements WasteService {

    private final WasteRepository wasteRepository;
    private final WasteMapper wasteMapper;
    private final KafkaProducer kafkaProducer;
    private final WasteReservedProducer wasteReservedProducer;
    private final WasteCompletedProducer wasteCompletedProducer;

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

       
        WasteCreatedEvent event = WasteCreatedEvent.builder()
        .generatorId(savedWaste.getCreatedBy())
        .wasteId(savedWaste.getId())
        .title(savedWaste.getTitle())
        .wasteType(savedWaste.getWasteType().name())
        .quantity(savedWaste.getQuantity())
        .latitude(savedWaste.getLatitude())
        .longitude(savedWaste.getLongitude())
        .createdAt(savedWaste.getCreatedAt())
        .build();
kafkaProducer.publishWasteCreated(event);

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
    public List<WasteResponse> getAvailableWaste() {

        return wasteRepository
                .findByStatus(WasteStatus.AVAILABLE)
                .stream()
                .map(wasteMapper::toResponse)
                .toList();

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
    public WasteResponse reserveWaste(UUID wasteId) {

        Waste waste = wasteRepository
                .findById(wasteId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Waste not found."
                        ));

        if (waste.getStatus() != WasteStatus.AVAILABLE) {

            throw new RuntimeException(
                    "Waste already reserved."
            );

        }

        waste.setStatus(
                WasteStatus.RESERVED
        );

        waste.setReservedBy(
                CurrentUserUtil.getCurrentUserId()
        );

        Waste saved =
                wasteRepository.save(waste);
        WasteReservedEvent event =
                WasteReservedEvent.builder()
                        .wasteId(saved.getId())
                        .recyclerId(saved.getReservedBy())
                        .wasteType(saved.getWasteType().name())
                        .quantity(saved.getQuantity())
                        .reservedAt(saved.getUpdatedAt())
                        .build();

        wasteReservedProducer.publish(event);

        return wasteMapper.toResponse(saved);

    }
    @Override
    public List<WasteResponse> getMyPickups() {

        UUID recyclerId = CurrentUserUtil.getCurrentUserId();

        return wasteRepository
                .findByReservedBy(recyclerId)
                .stream()
                .map(wasteMapper::toResponse)
                .toList();

    }

    @Override
    public WasteResponse completePickup(UUID wasteId) {

        Waste waste = wasteRepository
                .findById(wasteId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Waste not found"));

        UUID recyclerId =
                CurrentUserUtil.getCurrentUserId();

        if (!recyclerId.equals(waste.getReservedBy())) {

            throw new RuntimeException(
                    "You cannot complete someone else's pickup."
            );

        }

        waste.setStatus(
                WasteStatus.COMPLETED
        );

        Waste saved =
                wasteRepository.save(waste);
                 WasteCompletedEvent event =
        WasteCompletedEvent.builder()

                .wasteId(saved.getId())

                .recyclerId(saved.getReservedBy())

                .wasteType(
                        saved.getWasteType().name()
                )

                .quantity(saved.getQuantity())

                .completedAt(
                        java.time.LocalDateTime.now()
                )

                .build();

wasteCompletedProducer.publish(event);


        return wasteMapper.toResponse(saved);

    }

    @Override
    public List<WasteResponse> getPickupHistory() {

        return wasteRepository
                .findByReservedByAndStatus(
                        CurrentUserUtil.getCurrentUserId(),
                        WasteStatus.COMPLETED
                )
                .stream()
                .map(wasteMapper::toResponse)
                .toList();

    }

    @Override
    public WasteStatsResponse getWasteStats() {

        long total = wasteRepository.count();

        long completed =
                wasteRepository.countByStatus(
                        WasteStatus.COMPLETED
                );

        double pickupRate =
                total == 0
                        ? 0
                        : (completed * 100.0) / total;

        return WasteStatsResponse.builder()

                .totalWaste(total)

                .availableWaste(
                        wasteRepository.countByStatus(
                                WasteStatus.AVAILABLE
                        )
                )

                .reservedWaste(
                        wasteRepository.countByStatus(
                                WasteStatus.RESERVED
                        )
                )

                .completedWaste(completed)

                .recycledKg(
                        wasteRepository.totalRecycledKg()
                )

                .pickupRate(pickupRate)

                .build();

    }

    @Override
    public RecyclerDashboardResponse getRecyclerDashboard() {

        UUID recyclerId =
                CurrentUserUtil.getCurrentUserId();

        return RecyclerDashboardResponse
                .builder()

                .availableWaste(
                        wasteRepository.countByStatus(
                                WasteStatus.AVAILABLE
                        )
                )

                .reservedWaste(
                        wasteRepository.countByReservedBy(
                                recyclerId
                        )
                )

                .completedWaste(
                        wasteRepository.countByReservedByAndStatus(
                                recyclerId,
                                WasteStatus.COMPLETED
                        )
                )

                .build();

    }
    @Override
public List<DailyWasteResponse> getWeeklyWaste() {

    return wasteRepository
            .getWeeklyWaste()
            .stream()
            .map(day -> DailyWasteResponse.builder()
                    .day(day.getDay())
                    .count(day.getCount())
                    .build())
            .toList();

}



}