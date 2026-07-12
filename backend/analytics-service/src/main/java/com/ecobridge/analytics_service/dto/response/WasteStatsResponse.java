package com.ecobridge.analytics_service.dto.response;

import lombok.Data;

@Data
public class WasteStatsResponse {

    private long totalWaste;
    private long availableWaste;
    private long reservedWaste;
    private long completedWaste;
    private double recycledKg;
    private double pickupRate;

}