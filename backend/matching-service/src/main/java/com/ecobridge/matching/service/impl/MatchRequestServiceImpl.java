package com.ecobridge.matching.service.impl;

import com.ecobridge.matching.client.RecyclerClient;
import com.ecobridge.matching.client.WasteClient;
import com.ecobridge.matching.dto.WasteResponse;
import com.ecobridge.matching.dto.request.CreateMatchRequest;
import com.ecobridge.matching.dto.response.MatchRequestResponse;
import com.ecobridge.matching.entity.MatchRequest;
import com.ecobridge.matching.enums.MatchStatus;
import com.ecobridge.matching.exception.MatchRequestNotFoundException;
import com.ecobridge.matching.mapper.MatchRequestMapper;
import com.ecobridge.matching.repository.MatchRequestRepository;
import com.ecobridge.matching.security.CurrentUserUtil;
import com.ecobridge.matching.service.MatchRequestService;
import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class MatchRequestServiceImpl implements MatchRequestService {
    private final WasteClient wasteClient;
    private final RecyclerClient recyclerClient;

    private final MatchRequestRepository matchRequestRepository;
    private final MatchRequestMapper mapper;

    @Override
    public MatchRequestResponse createMatchRequest(CreateMatchRequest request) {

        MatchRequest matchRequest = MatchRequest.builder()
                .wasteId(request.getWasteId())
                .recyclerId(request.getRecyclerId())

                // Temporary until JWT is integrated
                .generatorId(CurrentUserUtil.getCurrentUserId())

                .build();

        MatchRequest saved = matchRequestRepository.save(matchRequest);

        return mapper.toResponse(saved);
    }


    @Override
    public List<MatchRequestResponse> getPendingRequests() {

        return matchRequestRepository
                .findByRecyclerIdAndStatus(
                        CurrentUserUtil.getCurrentUserId(),
                        MatchStatus.PENDING
                )
                .stream()
                .map(mapper::toResponse)
                .toList();
    }
    @Override
    public MatchRequestResponse acceptRequest(UUID requestId) {

        MatchRequest request = matchRequestRepository.findById(requestId)
                .orElseThrow(() ->
                        new MatchRequestNotFoundException(requestId));

        // Get waste details
        WasteResponse waste = wasteClient.getWaste(request.getWasteId());

        // Reserve waste
        wasteClient.reserveWaste(request.getWasteId());

        // Reduce recycler capacity
        recyclerClient.reduceCapacity(
                request.getRecyclerId(),
                waste.getQuantity()
        );

        // Update request
        if (request.getStatus() == MatchStatus.ACCEPTED) {
            throw new RuntimeException("Request already accepted");
        }
        request.setStatus(MatchStatus.ACCEPTED);
        request.setAcceptedAt(LocalDateTime.now());

        MatchRequest updated = matchRequestRepository.save(request);

        return mapper.toResponse(updated);
    }
    @Override
    public MatchRequestResponse rejectRequest(UUID requestId) {

        MatchRequest request = matchRequestRepository.findById(requestId)
                .orElseThrow(() ->
                        new MatchRequestNotFoundException(requestId));

        if (request.getStatus() == MatchStatus.REJECTED) {
            throw new RuntimeException("Request already rejected");
        }
        request.setStatus(MatchStatus.REJECTED);
        MatchRequest updated = matchRequestRepository.save(request);

        return mapper.toResponse(updated);
    }
    @Override
    public MatchRequestResponse completeRequest(UUID requestId) {

        MatchRequest request = matchRequestRepository.findById(requestId)
                .orElseThrow(() ->
                        new MatchRequestNotFoundException(requestId));

        if (request.getStatus() == MatchStatus.COMPLETED) {
            throw new RuntimeException("Request already completed");
        }
        request.setStatus(MatchStatus.COMPLETED);
        request.setCompletedAt(LocalDateTime.now());

        MatchRequest updated = matchRequestRepository.save(request);

        return mapper.toResponse(updated);
    }
}