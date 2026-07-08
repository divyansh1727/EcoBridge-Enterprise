package com.ecobridge.recycler.service.impl;
import com.ecobridge.recycler.dto.request.CreateRecyclerRequest;
import com.ecobridge.recycler.dto.request.UpdateRecyclerRequest;
import com.ecobridge.recycler.dto.response.RecyclerResponse;
import com.ecobridge.recycler.entity.Recycler;
import com.ecobridge.recycler.entity.RecyclerWasteType;
import com.ecobridge.recycler.enums.RecyclerStatus;
import com.ecobridge.recycler.enums.VerificationStatus;
import com.ecobridge.recycler.enums.WasteType;
import com.ecobridge.recycler.exception.ResourceAlreadyExistsException;
import com.ecobridge.recycler.exception.ResourceNotFoundException;
import com.ecobridge.recycler.mapper.RecyclerMapper;
import com.ecobridge.recycler.repository.RecyclerRepository;
import com.ecobridge.recycler.security.CurrentUserUtil;
import com.ecobridge.recycler.service.RecyclerService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import com.ecobridge.recycler.repository.RecyclerWasteTypeRepository;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class RecyclerServiceImpl implements RecyclerService {

    private final RecyclerRepository recyclerRepository;
    private final RecyclerMapper recyclerMapper;
    private final RecyclerWasteTypeRepository recyclerWasteTypeRepository;

    @Override
    public RecyclerResponse createRecycler(CreateRecyclerRequest request) {
        if (recyclerRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new ResourceAlreadyExistsException("Email already registered.");
        }

        if (recyclerRepository.findByPhone(request.getPhone()).isPresent()) {
            throw new ResourceAlreadyExistsException("Phone number already registered.");
        }
        Recycler recycler = Recycler.builder()
                .companyName(request.getCompanyName())
                .recyclerName(request.getRecyclerName())
                .email(request.getEmail())
                .phone(request.getPhone())
                .address(request.getAddress())
                .latitude(request.getLatitude())
                .longitude(request.getLongitude())
                .serviceRadiusKm(request.getServiceRadiusKm())
                .totalCapacity(request.getTotalCapacity())
                .createdBy(CurrentUserUtil.getCurrentUserId())
                .recyclerType(request.getRecyclerType())
                .build();

        Recycler savedRecycler = recyclerRepository.save(recycler);
        for (WasteType wasteType : request.getAcceptedWasteTypes()) {

            RecyclerWasteType recyclerWasteType = RecyclerWasteType.builder()
                    .recycler(savedRecycler)
                    .wasteType(wasteType)
                    .build();

            recyclerWasteTypeRepository.save(recyclerWasteType);
        }

        return recyclerMapper.toResponse(savedRecycler);
    }

    @Override
    public RecyclerResponse getRecyclerById(UUID id) {
        Recycler recycler = recyclerRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Recycler not found with id: " + id));

        return recyclerMapper.toResponse(recycler);
    }

    @Override
    public List<RecyclerResponse> getMyRecycler() {
        return recyclerRepository.findByCreatedBy(
                        CurrentUserUtil.getCurrentUserId()
                )
                .stream()
                .map(recyclerMapper::toResponse)
                .toList();
    }

    @Override
    public RecyclerResponse updateRecycler(UUID id, UpdateRecyclerRequest request) {
        Recycler recycler = recyclerRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Recycler not found with id: " + id));

        recycler.setCompanyName(request.getCompanyName());
        recycler.setRecyclerName(request.getRecyclerName());
        recycler.setEmail(request.getEmail());
        recycler.setPhone(request.getPhone());
        recycler.setAddress(request.getAddress());
        recycler.setLatitude(request.getLatitude());
        recycler.setLongitude(request.getLongitude());
        recycler.setServiceRadiusKm(request.getServiceRadiusKm());
        recycler.setTotalCapacity(request.getTotalCapacity());
        recycler.setRecyclerType(request.getRecyclerType());

        Recycler updatedRecycler = recyclerRepository.save(recycler);

        return recyclerMapper.toResponse(updatedRecycler);
    }

    @Override
    public void deleteRecycler(UUID id) {
        Recycler recycler = recyclerRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Recycler not found with id: " + id));

        recyclerRepository.delete(recycler);
    }
    @Override
    public List<RecyclerResponse> getAllRecyclers() {

        return recyclerRepository.findAll()
                .stream()
                .map(recyclerMapper::toResponse)
                .toList();
    }
    @Override
    public List<RecyclerResponse> getEligibleRecyclers() {

        return recyclerRepository
                .findByStatusAndVerificationStatus(
                        RecyclerStatus.ACTIVE,
                        VerificationStatus.VERIFIED
                )
                .stream()
                .map(recyclerMapper::toResponse)
                .toList();
    }
    @Override
    public RecyclerResponse reduceCapacity(
            UUID recyclerId,
            Double quantity
    ) {

        Recycler recycler = recyclerRepository.findById(recyclerId)
                .orElseThrow(() ->
                        new RuntimeException("Recycler not found"));


        recycler.setAvailableCapacity(
                recycler.getAvailableCapacity() - quantity
        );

        Recycler updated = recyclerRepository.save(recycler);

        return recyclerMapper.toResponse(updated);
    }
}