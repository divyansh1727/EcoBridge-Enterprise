package com.ecobridge.waste_service.entity;

import com.ecobridge.waste_service.enums.QuantityUnit;
import com.ecobridge.waste_service.enums.WasteStatus;
import com.ecobridge.waste_service.enums.WasteType;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "waste")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Waste {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false, length = 100)
    private String title;

    @Column(length = 1000)
    private String description;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private WasteType wasteType;

    @Column(nullable = false)
    private Double quantity;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private QuantityUnit quantityUnit;

    @Column(nullable = false)
    private String address;

    @Column(nullable = false)
    private Double latitude;

    @Column(nullable = false)
    private Double longitude;

    private String imageUrl;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private WasteStatus status;

    @Column(nullable = false)
    private UUID createdBy;

    private LocalDateTime pickupStart;

    private LocalDateTime pickupEnd;

    @Column(updatable = false)
    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    @Column(name = "reserved_by")
    private UUID reservedBy;

    @PrePersist
    public void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();

        if (status == null) {
            status = WasteStatus.AVAILABLE;
        }
    }

    @PreUpdate
    public void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}