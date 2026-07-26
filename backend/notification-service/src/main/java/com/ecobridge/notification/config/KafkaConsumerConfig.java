package com.ecobridge.notification.config;

import com.ecobridge.notification.events.WasteCompletedEvent;
import com.ecobridge.notification.events.WasteCreatedEvent;
import com.ecobridge.notification.events.WasteReservedEvent;
import lombok.RequiredArgsConstructor;
import org.apache.kafka.clients.consumer.ConsumerConfig;
import org.apache.kafka.common.serialization.StringDeserializer;
import org.springframework.boot.autoconfigure.kafka.KafkaProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.config.ConcurrentKafkaListenerContainerFactory;
import org.springframework.kafka.core.ConsumerFactory;
import org.springframework.kafka.core.DefaultKafkaConsumerFactory;
import org.springframework.kafka.support.serializer.JsonDeserializer;

import java.util.Map;

@Configuration
@RequiredArgsConstructor
public class KafkaConsumerConfig {

    private final KafkaProperties kafkaProperties;

    private <T> ConsumerFactory<String, T> consumerFactory(Class<T> clazz) {

    Map<String, Object> props = kafkaProperties.buildConsumerProperties();

    props.put(
            ConsumerConfig.KEY_DESERIALIZER_CLASS_CONFIG,
            StringDeserializer.class
    );

    return new DefaultKafkaConsumerFactory<>(
            props,
            new StringDeserializer(),
            new JsonDeserializer<>(clazz)
    );
}

    @Bean
    public ConcurrentKafkaListenerContainerFactory<String, WasteCreatedEvent> createdKafkaListenerContainerFactory() {
        ConcurrentKafkaListenerContainerFactory<String, WasteCreatedEvent> factory =
                new ConcurrentKafkaListenerContainerFactory<>();
        factory.setConsumerFactory(consumerFactory(WasteCreatedEvent.class));
        return factory;
    }

    @Bean
    public ConcurrentKafkaListenerContainerFactory<String, WasteReservedEvent> reservedKafkaListenerContainerFactory() {
        ConcurrentKafkaListenerContainerFactory<String, WasteReservedEvent> factory =
                new ConcurrentKafkaListenerContainerFactory<>();
        factory.setConsumerFactory(consumerFactory(WasteReservedEvent.class));
        return factory;
    }

    @Bean
    public ConcurrentKafkaListenerContainerFactory<String, WasteCompletedEvent> completedKafkaListenerContainerFactory() {
        ConcurrentKafkaListenerContainerFactory<String, WasteCompletedEvent> factory =
                new ConcurrentKafkaListenerContainerFactory<>();
        factory.setConsumerFactory(consumerFactory(WasteCompletedEvent.class));
        return factory;
    }
}