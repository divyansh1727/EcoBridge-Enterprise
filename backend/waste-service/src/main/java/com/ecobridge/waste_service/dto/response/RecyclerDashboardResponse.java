package com.ecobridge.waste_service.dto.response;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RecyclerDashboardResponse {

    private long availableWaste;

    private long reservedWaste;

    private long completedWaste;

}
