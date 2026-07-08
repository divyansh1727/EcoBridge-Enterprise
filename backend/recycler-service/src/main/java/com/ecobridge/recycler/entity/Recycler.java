package com.ecobridge.recycler.entity;
import com.ecobridge.recycler.enums.RecyclerStatus;
import com.ecobridge.recycler.enums.RecyclerType;
import com.ecobridge.recycler.enums.VerificationStatus;
import jakarta.persistence.*;
import lombok.*;
import java.util.ArrayList;
import java.util.List;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "recyclers")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Recycler {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false)
    private String companyName;

    @Column(nullable = false)
    private String recyclerName;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false, unique = true)
    private String phone;

    @Column(nullable = false)
    private String address;

    @Column(nullable = false)
    private Double latitude;

    @Column(nullable = false)
    private Double longitude;

    @Column(nullable = false)
    private Double serviceRadiusKm;

    @Column(nullable = false)
    private Double totalCapacity;

    @Column(nullable = false)
    private Double availableCapacity;

    @Enumerated(EnumType.STRING)
    private RecyclerType recyclerType;

    @Enumerated(EnumType.STRING)
    private VerificationStatus verificationStatus;

    @Enumerated(EnumType.STRING)
    private RecyclerStatus status;

    @Column(nullable = false)
    private UUID createdBy;

    @Column(updatable = false)
    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    @OneToMany(
            mappedBy = "recycler",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    @Builder.Default
    private List<RecyclerWasteType> acceptedWasteTypes = new ArrayList<>();

    @PrePersist
    public void onCreate() {

        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();

        if (verificationStatus == null)
            verificationStatus = VerificationStatus.PENDING;

        if (status == null)
            status = RecyclerStatus.ACTIVE;

        if (availableCapacity == null)
            availableCapacity = totalCapacity;
    }

    @PreUpdate
    public void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}