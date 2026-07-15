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
public class WasteReservedEvent {

    private UUID wasteId;
    private UUID recyclerId;
    private String wasteType;
    private Double quantity;
    private LocalDateTime reservededAt;

}