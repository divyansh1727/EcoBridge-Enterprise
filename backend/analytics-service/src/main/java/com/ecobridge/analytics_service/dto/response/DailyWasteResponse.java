package com.ecobridge.analytics_service.dto.response;

import lombok.*;
import java.io.Serializable;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DailyWasteResponse implements Serializable {

    private static final long serialVersionUID = 1L;

    private String day;
    private Long count;
}