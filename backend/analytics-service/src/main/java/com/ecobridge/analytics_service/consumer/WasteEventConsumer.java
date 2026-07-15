package com.ecobridge.analytics_service.consumer;
import com.ecobridge.analytics_service.entity.AnalyticsStats;
import com.ecobridge.analytics_service.repository.AnalyticsRepository;
import lombok.RequiredArgsConstructor;
import com.ecobridge.analytics_service.events.WasteCreatedEvent;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
public class WasteEventConsumer {
    private final AnalyticsRepository analyticsRepository;
    @CacheEvict(value = "dashboardStats", allEntries = true)
    @KafkaListener(
        topics = "waste-events",
        groupId = "analytics-group"
)
public void consume(WasteCreatedEvent event) {

    log.info(">>> ENTERED CONSUMER <<<");

    AnalyticsStats stats = analyticsRepository
        .findById(1L)
        .orElse(
                AnalyticsStats.builder()
                        .id(1L)
                        .totalWaste(0L)
                        .totalQuantity(0.0)
                        .availableWaste(0L)
                        .reservedWaste(0L)
                        .completedWaste(0L)
                        .plasticWaste(0L)
                        .glassWaste(0L)
                        .metalWaste(0L)
                        .paperWaste(0L)
                        .build()
        );

log.info("BEFORE: available={}", stats.getAvailableWaste());

stats.setTotalWaste(stats.getTotalWaste() + 1);
stats.setTotalQuantity(stats.getTotalQuantity() + event.getQuantity());
stats.setAvailableWaste(stats.getAvailableWaste() + 1);

log.info("AFTER: available={}", stats.getAvailableWaste());

analyticsRepository.save(stats);
}
}