package com.ecobridge.notification.consumer;

import com.ecobridge.notification.events.WasteReservedEvent;
import com.ecobridge.notification.service.NotificationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class WasteReservedConsumer {

    private final NotificationService notificationService;

    @KafkaListener(
            topics = "waste-reserved-events",
            containerFactory = "reservedKafkaListenerContainerFactory"
    )
    public void consume(WasteReservedEvent event) {

        notificationService.createNotification(
                event.getRecyclerId(),
                "Waste Reserved",
                "A recycler has reserved your waste listing.",
                "RESERVED"
        );

        log.info("Reserved notification created.");
    }
}