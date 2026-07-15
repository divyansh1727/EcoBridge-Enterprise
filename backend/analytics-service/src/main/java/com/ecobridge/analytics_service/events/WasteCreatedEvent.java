package com.ecobridge.analytics_service.events;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class WasteCreatedEvent {

    private UUID wasteId;
    private String title;
    private String wasteType;
    private Double quantity;
    private Double latitude;
    private Double longitude;
    private LocalDateTime createdAt;

}