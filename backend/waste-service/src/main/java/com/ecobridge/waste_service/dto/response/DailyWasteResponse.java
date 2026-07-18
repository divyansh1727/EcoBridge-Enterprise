package com.ecobridge.waste_service.dto.response;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DailyWasteResponse {

    private String day;
    private Long count;

}