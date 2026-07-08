package com.ecobridge.recycler.dto.request;

import com.ecobridge.recycler.enums.WasteType;
import com.ecobridge.recycler.enums.RecyclerType;
import jakarta.validation.constraints.*;
import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CreateRecyclerRequest {

    @NotBlank
    private String companyName;

    @NotBlank
    private String recyclerName;

    @Email
    @NotBlank
    private String email;

    @NotBlank
    private String phone;

    @NotBlank
    private String address;

    @NotNull
    private Double latitude;

    @NotNull
    private Double longitude;

    @Positive
    private Double serviceRadiusKm;

    @Positive
    private Double totalCapacity;

    private RecyclerType recyclerType;

    @NotEmpty
    private List<WasteType> acceptedWasteTypes;
}