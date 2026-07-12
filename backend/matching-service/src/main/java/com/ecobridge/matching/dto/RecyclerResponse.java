package com.ecobridge.matching.dto;

import com.ecobridge.matching.enums.RecyclerStatus;
import com.ecobridge.matching.enums.RecyclerType;
import com.ecobridge.matching.enums.VerificationStatus;
import lombok.*;
import com.ecobridge.matching.enums.WasteType;
import java.time.LocalDateTime;
import java.util.List;
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


