package com.ecobridge.matching.client;

import com.ecobridge.matching.dto.RecyclerResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;
import java.util.UUID;

@FeignClient(name = "recycler-service")
public interface RecyclerClient {

    @GetMapping("/api/v1/recyclers/eligible")
    List<RecyclerResponse> getEligibleRecyclers();

    @PutMapping("/api/v1/recyclers/{id}/capacity")
    RecyclerResponse reduceCapacity(
            @PathVariable UUID id,
            @RequestParam Double quantity
    );

}