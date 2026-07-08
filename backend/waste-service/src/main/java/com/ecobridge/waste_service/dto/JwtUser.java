package com.ecobridge.waste_service.dto;

import lombok.*;

import java.util.List;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class JwtUser {

    private UUID id;

    private String email;

    private List<String> roles;
}