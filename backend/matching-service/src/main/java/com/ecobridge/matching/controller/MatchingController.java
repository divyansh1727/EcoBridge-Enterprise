package com.ecobridge.matching.controller;

import com.ecobridge.matching.dto.MatchResultResponse;
import com.ecobridge.matching.service.MatchingService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/matching")
@RequiredArgsConstructor
public class MatchingController {

    private final MatchingService matchingService;

    @GetMapping("/{wasteId}")
    public List<MatchResultResponse> findMatches(
            @PathVariable UUID wasteId
    ) {
        return matchingService.findMatches(wasteId);
    }
}