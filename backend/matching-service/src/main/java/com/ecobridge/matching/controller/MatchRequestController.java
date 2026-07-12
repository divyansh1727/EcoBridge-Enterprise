package com.ecobridge.matching.controller;

import com.ecobridge.matching.dto.request.CreateMatchRequest;
import com.ecobridge.matching.dto.response.MatchRequestResponse;
import com.ecobridge.matching.service.MatchRequestService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/matching/request")
@RequiredArgsConstructor
public class MatchRequestController {

    private final MatchRequestService service;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public MatchRequestResponse createRequest(
            @Valid @RequestBody CreateMatchRequest request
    ) {

        return service.createMatchRequest(request);
    }
    @GetMapping("/pending")
    public List<MatchRequestResponse> getPendingRequests() {
        return service.getPendingRequests();
    }
    @PutMapping("/accept/{requestId}")
    public MatchRequestResponse acceptRequest(
            @PathVariable UUID requestId
    ) {
        return service.acceptRequest(requestId);
    }
    @PutMapping("/reject/{requestId}")
    public MatchRequestResponse rejectRequest(
            @PathVariable UUID requestId
    ) {
        return service.rejectRequest(requestId);
    }
    @PutMapping("/complete/{requestId}")
    public MatchRequestResponse completeRequest(
            @PathVariable UUID requestId
    ) {
        return service.completeRequest(requestId);
    }

}