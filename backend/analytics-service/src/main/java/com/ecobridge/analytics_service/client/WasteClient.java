package com.ecobridge.analytics_service.client;

import com.ecobridge.analytics_service.dto.response.WasteStatsResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;

@FeignClient(name = "waste-service")
public interface WasteClient {

    @GetMapping("/api/v1/waste/stats")
    WasteStatsResponse getWasteStats();

}