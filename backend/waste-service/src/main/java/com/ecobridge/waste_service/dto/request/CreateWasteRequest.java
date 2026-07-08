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
public class CreateWasteRequest {

    @NotBlank(message = "Title is required")
    private String title;

    private String description;

    @NotNull(message = "Waste type is required")
    private WasteType wasteType;

    @NotNull(message = "Quantity is required")
    @Positive(message = "Quantity must be greater than 0")
    private Double quantity;

    @NotNull(message = "Quantity unit is required")
    private QuantityUnit quantityUnit;

    @NotBlank(message = "Address is required")
    private String address;

    @NotNull(message = "Latitude is required")
    private Double latitude;

    @NotNull(message = "Longitude is required")
    private Double longitude;

    private String imageUrl;

    private LocalDateTime pickupStart;

    private LocalDateTime pickupEnd;
}