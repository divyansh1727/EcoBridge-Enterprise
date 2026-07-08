package com.ecobridge.matching.entity;

import com.ecobridge.matching.enums.MatchStatus;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "match_requests")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MatchRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false)
    private UUID wasteId;

    @Column(nullable = false)
    private UUID generatorId;

    @Column(nullable = false)
    private UUID recyclerId;

    @Enumerated(EnumType.STRING)
    private MatchStatus status;

    private Double distanceKm;

    private LocalDateTime requestedAt;

    private LocalDateTime acceptedAt;

    private LocalDateTime completedAt;

    @PrePersist
    public void prePersist() {
        requestedAt = LocalDateTime.now();

        if (status == null) {
            status = MatchStatus.PENDING;
        }
    }
}