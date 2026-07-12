package com.ecobridge.matching.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PublicRecyclerResponse {

    private String name;

    private String address;

    private Double latitude;

    private Double longitude;

}