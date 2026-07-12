package com.ecobridge.matching.dto;

import lombok.*;

import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class NearbyPartnersResponse {

    private List<NearbyRecyclerResponse> verified;

    private List<PublicRecyclerResponse> publicRecyclers;

}