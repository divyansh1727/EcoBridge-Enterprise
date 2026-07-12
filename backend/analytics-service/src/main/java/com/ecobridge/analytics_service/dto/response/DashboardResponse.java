package com.ecobridge.analytics_service.dto.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class DashboardResponse {

    private long users;

    private long generators;

    private long recyclers;

    private long waste;

    private long available;

    private long reserved;

    private long completed;

    private double recycledKg;

    private double pickupRate;

}