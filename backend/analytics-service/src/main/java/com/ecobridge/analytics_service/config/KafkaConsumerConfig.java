package com.ecobridge.analytics_service.config;
import org.springframework.boot.autoconfigure.kafka.KafkaProperties;
import com.ecobridge.analytics_service.events.WasteCompletedEvent;
import com.ecobridge.analytics_service.events.WasteCreatedEvent;
import org.apache.kafka.clients.consumer.ConsumerConfig;
import org.apache.kafka.common.serialization.StringDeserializer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.config.ConcurrentKafkaListenerContainerFactory;
import org.springframework.kafka.core.*;
import org.springframework.kafka.support.serializer.JsonDeserializer;
import com.ecobridge.analytics_service.events.WasteReservedEvent;
import java.util.Map;

@Configuration
public class KafkaConsumerConfig {
    private final KafkaProperties kafkaProperties;

public KafkaConsumerConfig(KafkaProperties kafkaProperties) {
    this.kafkaProperties = kafkaProperties;
}

    @Bean
    public ConsumerFactory<String, WasteCreatedEvent> consumerFactory() {

        JsonDeserializer<WasteCreatedEvent> deserializer =
                new JsonDeserializer<>(WasteCreatedEvent.class);

        deserializer.addTrustedPackages("*");
        deserializer.setUseTypeHeaders(false);

       Map<String, Object> props =
        kafkaProperties.buildConsumerProperties();

props.put(
        ConsumerConfig.GROUP_ID_CONFIG,
        "analytics-group"
);

props.put(
        ConsumerConfig.KEY_DESERIALIZER_CLASS_CONFIG,
        StringDeserializer.class
);

props.put(
        ConsumerConfig.VALUE_DESERIALIZER_CLASS_CONFIG,
        JsonDeserializer.class
);

        return new DefaultKafkaConsumerFactory<>(
                props,
                new StringDeserializer(),
                deserializer
        );

    }

    @Bean
public ConsumerFactory<String, WasteReservedEvent> reservedConsumerFactory() {

    JsonDeserializer<WasteReservedEvent> deserializer =
            new JsonDeserializer<>(WasteReservedEvent.class);

    deserializer.addTrustedPackages("*");
    deserializer.setUseTypeHeaders(false);

    Map<String, Object> props =
        kafkaProperties.buildConsumerProperties();

props.put(
        ConsumerConfig.GROUP_ID_CONFIG,
        "analytics-group"
);

props.put(
        ConsumerConfig.KEY_DESERIALIZER_CLASS_CONFIG,
        StringDeserializer.class
);

props.put(
        ConsumerConfig.VALUE_DESERIALIZER_CLASS_CONFIG,
        JsonDeserializer.class
);
return new DefaultKafkaConsumerFactory<>(
        props,
        new StringDeserializer(),
        deserializer
);
}

@Bean
public ConcurrentKafkaListenerContainerFactory<String, WasteReservedEvent>
reservedKafkaListenerContainerFactory() {

    ConcurrentKafkaListenerContainerFactory<String, WasteReservedEvent> factory =
            new ConcurrentKafkaListenerContainerFactory<>();

    factory.setConsumerFactory(
            reservedConsumerFactory()
    );

    return factory;
}

@Bean
public ConsumerFactory<String, WasteCompletedEvent> completedConsumerFactory() {

    JsonDeserializer<WasteCompletedEvent> deserializer =
            new JsonDeserializer<>(WasteCompletedEvent.class);

    deserializer.addTrustedPackages("*");
    deserializer.setUseTypeHeaders(false);

    Map<String, Object> props =
        kafkaProperties.buildConsumerProperties();

props.put(
        ConsumerConfig.GROUP_ID_CONFIG,
        "analytics-group"
);

props.put(
        ConsumerConfig.KEY_DESERIALIZER_CLASS_CONFIG,
        StringDeserializer.class
);

props.put(
        ConsumerConfig.VALUE_DESERIALIZER_CLASS_CONFIG,
        JsonDeserializer.class
);
return new DefaultKafkaConsumerFactory<>(
        props,
        new StringDeserializer(),
        deserializer
);
}

    @Bean
    public ConcurrentKafkaListenerContainerFactory<String, WasteCreatedEvent>
    kafkaListenerContainerFactory() {

        ConcurrentKafkaListenerContainerFactory<String, WasteCreatedEvent> factory =
                new ConcurrentKafkaListenerContainerFactory<>();

        factory.setConsumerFactory(consumerFactory());

        return factory;
    }

    @Bean
public ConcurrentKafkaListenerContainerFactory<String, WasteCompletedEvent>
completedKafkaListenerContainerFactory() {

    ConcurrentKafkaListenerContainerFactory<String, WasteCompletedEvent> factory =
            new ConcurrentKafkaListenerContainerFactory<>();

    factory.setConsumerFactory(
            completedConsumerFactory()
    );

    return factory;
}

}