package com.ecobridge.analytics_service.events;

import lombok.*;

import java.time.LocalDateTime;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class WasteCompletedEvent {

    private UUID wasteId;
    private UUID recyclerId;
    private String wasteType;
    private Double quantity;
    private LocalDateTime completedAt;

}