package com.ecobridge.notification.consumer;

import com.ecobridge.notification.events.WasteCreatedEvent;
import com.ecobridge.notification.service.NotificationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class WasteCreatedConsumer {

    private final NotificationService notificationService;

    @KafkaListener(
        topics = "waste-created-events",
        containerFactory = "createdKafkaListenerContainerFactory"
)
public void consume(WasteCreatedEvent event) {

    System.out.println("1");

    try {

        System.out.println("2");

        notificationService.createNotification(
                event.getGeneratorId(),
                "Waste Created",
                "Your waste listing has been created successfully.",
                "CREATED"
        );

        System.out.println("3");

    } catch (Throwable t) {

        System.out.println("4");

        t.printStackTrace();

    }

    System.out.println("5");
}
}