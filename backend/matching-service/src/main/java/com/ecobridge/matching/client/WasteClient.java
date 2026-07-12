package com.ecobridge.matching.client;

import com.ecobridge.matching.config.FeignConfig;
import com.ecobridge.matching.dto.WasteResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;

import java.util.List;
import java.util.UUID;

@FeignClient(
        name = "WASTE-SERVICE",
        configuration = FeignConfig.class
)
public interface WasteClient {
    @GetMapping("/api/v1/waste")
    List<WasteResponse> getAllWaste();

    @GetMapping("/api/v1/waste/{id}")
    WasteResponse getWaste(@PathVariable UUID id);

    @PutMapping("/api/v1/waste/{id}/reserve")
    WasteResponse reserveWaste(
            @PathVariable UUID id
    );
    @GetMapping("/api/v1/waste/available")
    List<WasteResponse> getAvailableWaste();

}
