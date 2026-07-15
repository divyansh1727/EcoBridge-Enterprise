package com.ecobridge.analytics_service.consumer;
import org.springframework.cache.annotation.CacheEvict;
import com.ecobridge.analytics_service.entity.AnalyticsStats;
import com.ecobridge.analytics_service.events.WasteReservedEvent;
import com.ecobridge.analytics_service.repository.AnalyticsRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class WasteReservedConsumer {

    private final AnalyticsRepository analyticsRepository;
    @CacheEvict(value = "dashboardStats", allEntries = true)
    
    @KafkaListener(
    topics = "waste-reserved-events",
    groupId = "analytics-group",
    containerFactory = "reservedKafkaListenerContainerFactory"
)
    public void consume(WasteReservedEvent event) {

        AnalyticsStats stats = analyticsRepository
                .findById(1L)
                .orElseThrow();

        stats.setReservedWaste(
                stats.getReservedWaste() + 1
        );

        stats.setAvailableWaste(
                stats.getAvailableWaste() - 1
        );

        analyticsRepository.save(stats);

        log.info(
                "Reserved waste updated in analytics."
        );

    }
}