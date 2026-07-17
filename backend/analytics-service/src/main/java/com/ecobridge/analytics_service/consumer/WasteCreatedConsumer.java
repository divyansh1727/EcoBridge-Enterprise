package com.ecobridge.analytics_service.consumer;

import com.ecobridge.analytics_service.entity.AnalyticsStats;
import com.ecobridge.analytics_service.events.WasteCreatedEvent;
import com.ecobridge.analytics_service.repository.AnalyticsRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class WasteCreatedConsumer {

    private final AnalyticsRepository analyticsRepository;

    @CacheEvict(value = "dashboardStats", allEntries = true)
    @KafkaListener(
            topics = "waste-events",
            groupId = "analytics-group",
            containerFactory = "kafkaListenerContainerFactory"
    )
    public void consume(WasteCreatedEvent event) {

        AnalyticsStats stats =
                analyticsRepository.findById(1L)
                        .orElseThrow();

        stats.setTotalWaste(
                stats.getTotalWaste() + 1
        );

        stats.setAvailableWaste(
                stats.getAvailableWaste() + 1
        );

        stats.setTotalQuantity(
                stats.getTotalQuantity() + event.getQuantity()
        );

        analyticsRepository.save(stats);

        log.info("Created waste updated in analytics.");
    }
}