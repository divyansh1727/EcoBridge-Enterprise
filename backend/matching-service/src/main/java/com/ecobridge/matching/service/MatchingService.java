package com.ecobridge.matching.service;

import com.ecobridge.matching.dto.MatchResultResponse;

import java.util.List;
import java.util.UUID;

public interface MatchingService {

    List<MatchResultResponse> findMatches(UUID wasteId);



}