package com.ecobridge.analytics_service.client;
import java.util.List;
import com.ecobridge.analytics_service.dto.response.WasteStatsResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import com.ecobridge.analytics_service.dto.response.DailyWasteResponse;

@FeignClient(name = "waste-service")
public interface WasteClient {

    @GetMapping("/api/v1/waste/stats")
    WasteStatsResponse getWasteStats();

    @GetMapping("/api/v1/waste/weekly")
List<DailyWasteResponse> getWeeklyWaste();

}