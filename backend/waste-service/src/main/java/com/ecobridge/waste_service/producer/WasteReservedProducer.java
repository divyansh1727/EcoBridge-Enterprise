package com.ecobridge.waste_service.producer;

import com.ecobridge.waste_service.events.WasteReservedEvent;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class WasteReservedProducer {

    private final KafkaTemplate<String, Object> kafkaTemplate;

    public void publish(WasteReservedEvent event){

        kafkaTemplate.send(
                "waste-reserved-events",
                event
        );

        log.info(
                "Published WasteReservedEvent {}",
                event.getWasteId()
        );

    }
}