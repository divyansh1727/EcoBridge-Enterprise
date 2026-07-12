package com.ecobridge.waste_service.service;

import com.ecobridge.waste_service.dto.request.CreateWasteRequest;
import com.ecobridge.waste_service.dto.request.UpdateWasteRequest;
import com.ecobridge.waste_service.dto.response.RecyclerDashboardResponse;
import com.ecobridge.waste_service.dto.response.WasteResponse;
import com.ecobridge.waste_service.dto.response.WasteStatsResponse;


import java.util.List;
import java.util.UUID;

public interface WasteService {

    WasteResponse createWaste(CreateWasteRequest request);

    WasteResponse getWasteById(UUID id);

    List<WasteResponse> getMyWaste();

    WasteResponse updateWaste(UUID id, UpdateWasteRequest request);

    void deleteWaste(UUID id);

    List<WasteResponse> getAllWaste();

    WasteStatsResponse getWasteStats();
    WasteResponse reserveWaste(UUID wasteId);

    List<WasteResponse> getAvailableWaste();

    List<WasteResponse> getMyPickups();

    WasteResponse completePickup(UUID wasteId);

    List<WasteResponse> getPickupHistory();

    RecyclerDashboardResponse getRecyclerDashboard();
}