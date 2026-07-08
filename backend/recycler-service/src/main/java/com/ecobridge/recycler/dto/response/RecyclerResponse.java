package com.ecobridge.recycler.dto.response;

import com.ecobridge.recycler.enums.RecyclerStatus;
import com.ecobridge.recycler.enums.RecyclerType;
import com.ecobridge.recycler.enums.VerificationStatus;
import lombok.*;
import java.util.List;
import com.ecobridge.recycler.enums.WasteType;

import java.time.LocalDateTime;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RecyclerResponse {

    private UUID id;

    private String companyName;

    private String recyclerName;

    private String email;

    private String phone;

    private String address;

    private List<WasteType> acceptedWasteTypes;

    private Double latitude;

    private Double longitude;

    private Double serviceRadiusKm;

    private Double totalCapacity;

    private Double availableCapacity;

    private RecyclerType recyclerType;

    private VerificationStatus verificationStatus;

    private RecyclerStatus status;

    private UUID createdBy;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;
}
