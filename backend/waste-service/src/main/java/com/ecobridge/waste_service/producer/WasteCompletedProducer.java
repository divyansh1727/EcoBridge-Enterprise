package com.ecobridge.waste_service.producer;

import com.ecobridge.waste_service.events.WasteCompletedEvent;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class WasteCompletedProducer {

    private final KafkaTemplate<String, Object> kafkaTemplate;

    public void publish(WasteCompletedEvent event) {

        kafkaTemplate.send(
                "waste-completed-events",
                event
        );

        log.info(
                "Published WasteCompletedEvent : {}",
                event.getWasteId()
        );
    }

}