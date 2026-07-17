package com.ecobridge.waste_service.producer;

import com.ecobridge.waste_service.events.WasteCreatedEvent;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class KafkaProducer {

    private final KafkaTemplate<String, Object> kafkaTemplate;

    public void publishWasteCreated(WasteCreatedEvent event) {

    kafkaTemplate.send("waste-created-events", event)
            .whenComplete((result, ex) -> {
                if (ex != null) {
                    ex.printStackTrace();
                    log.error("FAILED TO SEND", ex);
                } else {
                    log.info("Kafka ACK received. Offset={}",
                            result.getRecordMetadata().offset());
                }
            });
}
}