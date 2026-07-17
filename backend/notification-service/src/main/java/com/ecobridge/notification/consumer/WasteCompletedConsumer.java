package com.ecobridge.notification.consumer;

import com.ecobridge.notification.events.WasteCompletedEvent;
import com.ecobridge.notification.service.NotificationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class WasteCompletedConsumer {

    private final NotificationService notificationService;

    @KafkaListener(
            topics = "waste-completed-events",
            containerFactory = "completedKafkaListenerContainerFactory"
    )
    public void consume(WasteCompletedEvent event) {

        notificationService.createNotification(
                event.getRecyclerId(),
                "Pickup Completed",
                "Your waste pickup has been completed successfully.",
                "COMPLETED"
        );

        log.info("Completed notification created.");
    }
}