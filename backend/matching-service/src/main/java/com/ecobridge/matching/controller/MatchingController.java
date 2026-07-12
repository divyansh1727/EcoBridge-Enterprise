package com.ecobridge.matching.controller;

import com.ecobridge.matching.client.WasteClient;
import com.ecobridge.matching.dto.*;
import com.ecobridge.matching.service.MatchingService;
import com.ecobridge.matching.service.OpenStreetMapService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/matching")
@RequiredArgsConstructor
public class MatchingController {

    private final MatchingService matchingService;
    private final WasteClient wasteClient;
    private final OpenStreetMapService openStreetMapService;


    @GetMapping("/{wasteId}")
    public List<MatchResultResponse> findMatches(
            @PathVariable UUID wasteId
    ) {
        return matchingService.findMatches(wasteId);
    }

    @GetMapping("/test")
    public List<WasteResponse> test() {

        return wasteClient.getAvailableWaste();

    }

    @GetMapping("/recyclers-nearby")
    public NearbyPartnersResponse nearbyRecyclers(

            @RequestParam Double latitude,

            @RequestParam Double longitude

    ) {

        return  matchingService.getNearbyRecyclers(
                latitude,
                longitude
        );

    }
    @GetMapping("/nearby")
    public List<NearbyWasteResponse> nearby(

            @RequestParam Double latitude,

            @RequestParam Double longitude

    ) {

        return matchingService.getNearbyWaste(
                latitude,
                longitude
        );
    }
    @GetMapping("/public-recyclers")
    public List<PublicRecyclerResponse> getPublicRecyclers(

            @RequestParam Double latitude,

            @RequestParam Double longitude

    ) {

        return openStreetMapService.findNearby(
                latitude,
                longitude
        );

    }

}
