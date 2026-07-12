package com.ecobridge.analytics_service.client;

import com.ecobridge.analytics_service.dto.response.UserStatsResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;

@FeignClient(name = "auth-service")
public interface AuthClient {

    @GetMapping("/api/v1/users/stats")
    UserStatsResponse getUserStats();

}