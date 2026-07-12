package com.ecobridge.analytics_service.dto.response;

import lombok.Data;

@Data
public class UserStatsResponse {

    private long totalUsers;
    private long totalGenerators;
    private long totalRecyclers;

}