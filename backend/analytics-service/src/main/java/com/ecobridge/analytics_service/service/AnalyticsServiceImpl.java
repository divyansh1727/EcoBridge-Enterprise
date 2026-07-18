package com.ecobridge.analytics_service.service;
import com.ecobridge.analytics_service.client.AuthClient;
import com.ecobridge.analytics_service.client.WasteClient;
import com.ecobridge.analytics_service.dto.response.DashboardResponse;
import com.ecobridge.analytics_service.dto.response.UserStatsResponse;
import com.ecobridge.analytics_service.dto.response.WasteStatsResponse;
import com.ecobridge.analytics_service.service.AnalyticsService;
import lombok.RequiredArgsConstructor;
import java.util.List;
import com.ecobridge.analytics_service.dto.response.DailyWasteResponse;
import com.ecobridge.analytics_service.entity.AnalyticsStats;
import com.ecobridge.analytics_service.repository.AnalyticsRepository;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AnalyticsServiceImpl implements AnalyticsService {

    private final AuthClient authClient;
    private final WasteClient wasteClient;
    private final AnalyticsRepository analyticsRepository;

@Override
@Cacheable(value = "dashboardStats")
public DashboardResponse getDashboardStats() {

    UserStatsResponse users = authClient.getUserStats();

    List<DailyWasteResponse> weeklyWaste = wasteClient.getWeeklyWaste();

AnalyticsStats stats =
        analyticsRepository.findById(1L)
                .orElse(
                        AnalyticsStats.builder()
                                .id(1L)
                                .totalWaste(0L)
                                .totalQuantity(0.0)
                                .plasticWaste(0L)
                                .glassWaste(0L)
                                .metalWaste(0L)
                                .paperWaste(0L)
                                .build()
                );

        

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
                        stats.getTotalWaste()
                )

                .available(
    stats.getAvailableWaste() == null
            ? 0L
            : stats.getAvailableWaste()

)
.reserved(
    stats.getReservedWaste() == null
            ? 0L
            : stats.getReservedWaste()
)

.completed(
    stats.getCompletedWaste() == null
            ? 0L
            :stats.getCompletedWaste()
)




.pickupRate(
        stats.getPickupRate() == null
        ? 0
        :stats.getPickupRate()
)


                .recycledKg(
                        stats.getTotalQuantity()
                )

                .weeklyWaste(weeklyWaste)
                


               

                .build();

    }

}