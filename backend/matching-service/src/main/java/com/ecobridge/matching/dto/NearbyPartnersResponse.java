package com.ecobridge.matching.dto;

import lombok.*;
import java.io.Serializable;
import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class NearbyPartnersResponse implements Serializable {
    private static final long serialVersionUID = 1L;

    private List<NearbyRecyclerResponse> verified;

    private List<PublicRecyclerResponse> publicRecyclers;

}