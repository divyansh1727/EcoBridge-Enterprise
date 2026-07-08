package com.ecobridge.waste_service.service;

import com.ecobridge.waste_service.dto.request.CreateWasteRequest;
import com.ecobridge.waste_service.dto.request.UpdateWasteRequest;
import com.ecobridge.waste_service.dto.response.WasteResponse;

import java.util.List;
import java.util.UUID;

public interface WasteService {

    WasteResponse createWaste(CreateWasteRequest request);

    WasteResponse getWasteById(UUID id);

    List<WasteResponse> getMyWaste();

    WasteResponse updateWaste(UUID id, UpdateWasteRequest request);

    void deleteWaste(UUID id);

    List<WasteResponse> getAllWaste();

    WasteResponse reserveWaste(UUID id);
}