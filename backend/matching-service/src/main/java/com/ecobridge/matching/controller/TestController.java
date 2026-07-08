package com.ecobridge.matching.controller;

import com.ecobridge.matching.client.RecyclerClient;
import com.ecobridge.matching.client.WasteClient;
import com.ecobridge.matching.dto.RecyclerResponse;
import com.ecobridge.matching.dto.WasteResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/test")
@RequiredArgsConstructor
public class TestController {

    private final WasteClient wasteClient;
    private final RecyclerClient recyclerClient;

    @GetMapping("/waste")
    public List<WasteResponse> getWaste() {
        return wasteClient.getAllWaste();
    }

    @GetMapping("/recyclers")
    public List<RecyclerResponse> getRecyclers() {
        return recyclerClient.getEligibleRecyclers();
    }
}