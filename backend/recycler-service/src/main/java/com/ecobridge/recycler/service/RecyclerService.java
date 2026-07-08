package com.ecobridge.recycler.service;

import com.ecobridge.recycler.dto.request.CreateRecyclerRequest;
import com.ecobridge.recycler.dto.request.UpdateRecyclerRequest;
import com.ecobridge.recycler.dto.response.RecyclerResponse;

import java.util.List;
import java.util.UUID;

public interface RecyclerService {

    RecyclerResponse createRecycler(CreateRecyclerRequest request);

    RecyclerResponse getRecyclerById(UUID id);

    List<RecyclerResponse> getMyRecycler();

    RecyclerResponse updateRecycler(UUID id, UpdateRecyclerRequest request);

    void deleteRecycler(UUID id);

    List<RecyclerResponse> getAllRecyclers();

    List<RecyclerResponse> getEligibleRecyclers();

    RecyclerResponse reduceCapacity(
            UUID recyclerId,
            Double quantity
    );
}