package com.ecobridge.waste_service.dto.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class WasteStatsResponse {

    private long totalWaste;

    private long availableWaste;

    private long reservedWaste;

    private long completedWaste;

    private double recycledKg;

    private double pickupRate;

}