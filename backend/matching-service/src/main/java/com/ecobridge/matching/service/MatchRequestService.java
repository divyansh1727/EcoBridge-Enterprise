package com.ecobridge.matching.service;

import com.ecobridge.matching.dto.request.CreateMatchRequest;
import com.ecobridge.matching.dto.response.MatchRequestResponse;

import java.util.List;
import java.util.UUID;

public interface MatchRequestService {

    MatchRequestResponse createMatchRequest(CreateMatchRequest request);

    List<MatchRequestResponse> getPendingRequests();

    MatchRequestResponse acceptRequest(UUID requestId);

    MatchRequestResponse rejectRequest(UUID requestId);

    MatchRequestResponse completeRequest(UUID requestId);


}