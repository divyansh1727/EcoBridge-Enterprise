package com.ecobridge.matching.service.impl;

import com.ecobridge.matching.client.RecyclerClient;
import com.ecobridge.matching.client.WasteClient;
import com.ecobridge.matching.dto.MatchResultResponse;
import com.ecobridge.matching.dto.RecyclerResponse;
import com.ecobridge.matching.dto.WasteResponse;
import com.ecobridge.matching.service.MatchingService;
import com.ecobridge.matching.util.DistanceUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class MatchingServiceImpl implements MatchingService {

    private final WasteClient wasteClient;
    private final RecyclerClient recyclerClient;

    @Override
    public List<MatchResultResponse> findMatches(UUID wasteId) {

        WasteResponse waste = wasteClient.getWaste(wasteId);

        List<RecyclerResponse> recyclers =
                recyclerClient.getEligibleRecyclers();

        return recyclers.stream()

                .filter(recycler ->
                        recycler.getAcceptedWasteTypes()
                                .contains(waste.getWasteType())
                )
                .filter(recycler ->
                        recycler.getAvailableCapacity() >= waste.getQuantity()
                )

                .flatMap(recycler -> {

                    double distance = DistanceUtil.calculateDistance(
                            waste.getLatitude(),
                            waste.getLongitude(),
                            recycler.getLatitude(),
                            recycler.getLongitude()
                    );

                    if (distance > recycler.getServiceRadiusKm()) {
                        return java.util.stream.Stream.empty();
                    }

                    MatchResultResponse response = MatchResultResponse.builder()
                            .recyclerId(recycler.getId())
                            .companyName(recycler.getCompanyName())
                            .recyclerName(recycler.getRecyclerName())
                            .availableCapacity(recycler.getAvailableCapacity())
                            .distanceKm(distance)
                            .build();

                    return java.util.stream.Stream.of(response);
                })
                .sorted(Comparator.comparing(MatchResultResponse::getDistanceKm))
                .limit(5)

                .toList();
    }

}