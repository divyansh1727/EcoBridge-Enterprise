package com.ecobridge.recycler.entity;
import com.ecobridge.recycler.enums.WasteType;
import jakarta.persistence.*;
import lombok.*;

import java.util.UUID;

@Entity
@Table(name = "recycler_waste_types")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class RecyclerWasteType {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "recycler_id", nullable = false)
    private Recycler recycler;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private WasteType wasteType;
}
