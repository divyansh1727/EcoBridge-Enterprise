package com.ecobridge.analytics_service.service;

import com.ecobridge.analytics_service.client.AuthClient;
import com.ecobridge.analytics_service.client.WasteClient;
import com.ecobridge.analytics_service.dto.response.DashboardResponse;
import com.ecobridge.analytics_service.dto.response.UserStatsResponse;
import com.ecobridge.analytics_service.dto.response.WasteStatsResponse;
import com.ecobridge.analytics_service.service.AnalyticsService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AnalyticsServiceImpl implements AnalyticsService {

    private final AuthClient authClient;
    private final WasteClient wasteClient;

    @Override
    public DashboardResponse getDashboardStats() {

        UserStatsResponse users =
                authClient.getUserStats();

        WasteStatsResponse waste =
                wasteClient.getWasteStats();

        return DashboardResponse.builder()

                .users(
                        users.getTotalUsers()
                )

                .generators(
                        users.getTotalGenerators()
                )

                .recyclers(
                        users.getTotalRecyclers()
                )

                .waste(
                        waste.getTotalWaste()
                )

                .available(
                        waste.getAvailableWaste()
                )

                .reserved(
                        waste.getReservedWaste()
                )

                .completed(
                        waste.getCompletedWaste()
                )

                .recycledKg(
                        waste.getRecycledKg()
                )

                .pickupRate(
                        waste.getPickupRate()
                )

                .build();

    }

}