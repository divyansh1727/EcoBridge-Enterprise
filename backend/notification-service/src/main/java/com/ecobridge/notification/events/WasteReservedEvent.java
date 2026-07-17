package com.ecobridge.notification.events;


import lombok.*;

import java.time.LocalDateTime;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class WasteReservedEvent {

    private UUID wasteId;

    private UUID recyclerId;

    private String wasteType;

    private Double quantity;

    private LocalDateTime reservedAt;

}