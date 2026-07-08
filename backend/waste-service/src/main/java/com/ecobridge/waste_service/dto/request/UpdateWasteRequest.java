package com.ecobridge.waste_service.dto.request;

import com.ecobridge.waste_service.enums.QuantityUnit;
import com.ecobridge.waste_service.enums.WasteType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UpdateWasteRequest {

    @NotBlank
    private String title;

    private String description;

    @NotNull
    private WasteType wasteType;

    @Positive
    private Double quantity;

    @NotNull
    private QuantityUnit quantityUnit;

    @NotBlank
    private String address;

    @NotNull
    private Double latitude;

    @NotNull
    private Double longitude;

    private String imageUrl;

    private LocalDateTime pickupStart;

    private LocalDateTime pickupEnd;
}