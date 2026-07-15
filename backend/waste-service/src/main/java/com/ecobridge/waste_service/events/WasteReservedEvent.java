package com.ecobridge.waste_service.events;

import lombok.*;

import java.time.LocalDateTime;
import java.util.UUID;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class WasteReservedEvent {

    private UUID wasteId;

    private UUID recyclerId;

    private String wasteType;

    private Double quantity;

    private LocalDateTime reservedAt;

}