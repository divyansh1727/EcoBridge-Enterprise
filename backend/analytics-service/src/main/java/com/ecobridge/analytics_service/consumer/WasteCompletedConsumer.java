package com.ecobridge.analytics_service.consumer;
import org.springframework.cache.annotation.CacheEvict;
import com.ecobridge.analytics_service.entity.AnalyticsStats;
import com.ecobridge.analytics_service.events.WasteCompletedEvent;
import com.ecobridge.analytics_service.repository.AnalyticsRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class WasteCompletedConsumer {

    private final AnalyticsRepository analyticsRepository;
    @CacheEvict(value = "dashboardStats", allEntries = true)
     
    @KafkaListener(
            topics = "waste-completed-events",
            groupId = "analytics-group",
            containerFactory = "completedKafkaListenerContainerFactory"
    )
    public void consume(WasteCompletedEvent event) {

        AnalyticsStats stats = analyticsRepository
                .findById(1L)
                .orElseThrow();

        stats.setCompletedWaste(
                stats.getCompletedWaste() + 1
        );

        stats.setReservedWaste(
                stats.getReservedWaste() - 1
        );

        if (stats.getTotalWaste() > 0) {

            double rate =
                    (stats.getCompletedWaste() * 100.0)
                            / stats.getTotalWaste();

            stats.setPickupRate(rate);

        }

        analyticsRepository.save(stats);

        log.info("Completed waste updated in analytics.");

    }
}