package com.ecobridge.recycler.dto.request;
import com.ecobridge.recycler.enums.RecyclerType;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.*;


    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public class UpdateRecyclerRequest {


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

        @NotNull
        private RecyclerType recyclerType;
    }

