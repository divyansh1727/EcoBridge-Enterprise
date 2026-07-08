package com.ecobridge.matching.dto.response;

import com.ecobridge.matching.enums.MatchStatus;
import lombok.*;

import java.time.LocalDateTime;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MatchRequestResponse {

    private UUID id;

    private UUID wasteId;

    private UUID generatorId;

    private UUID recyclerId;

    private MatchStatus status;

    private Double distanceKm;

    private LocalDateTime requestedAt;

    private LocalDateTime acceptedAt;

    private LocalDateTime completedAt;
}