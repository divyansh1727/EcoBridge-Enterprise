package com.ecobridge.matching.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import com.ecobridge.matching.dto.response.ErrorResponse;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.LocalDateTime;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(MatchRequestNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleNotFound(
            MatchRequestNotFoundException ex
    ) {

        ErrorResponse response = ErrorResponse.builder()
                .error("Not Found")
                .message(ex.getMessage())
                .status(HttpStatus.NOT_FOUND.value())
                .timestamp(LocalDateTime.now())
                .build();

        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(response);
    }

}