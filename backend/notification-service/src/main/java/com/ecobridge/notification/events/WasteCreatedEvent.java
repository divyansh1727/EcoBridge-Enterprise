package com.ecobridge.notification.events;

import lombok.*;

import java.time.LocalDateTime;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class WasteCreatedEvent {

    private UUID wasteId;

    private UUID generatorId;

    private String title;

    private String wasteType;

    private Double quantity;

    private Double latitude;

    private Double longitude;

    private LocalDateTime createdAt;

}