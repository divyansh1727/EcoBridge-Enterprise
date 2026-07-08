package com.ecobridge.matching.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CreateMatchRequest {

    @NotNull
    private UUID wasteId;

    @NotNull
    private UUID recyclerId;
}