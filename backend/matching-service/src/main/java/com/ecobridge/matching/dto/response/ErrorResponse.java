package com.ecobridge.matching.dto.response;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ErrorResponse {

    private String error;

    private String message;

    private LocalDateTime timestamp;

    private int status;

}