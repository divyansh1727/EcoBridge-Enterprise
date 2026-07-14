package com.ecobridge.matching.service.impl;
import com.ecobridge.matching.dto.*;
import com.ecobridge.matching.client.RecyclerClient;
import com.ecobridge.matching.client.WasteClient;
import com.ecobridge.matching.service.MatchingService;
import com.ecobridge.matching.service.OpenStreetMapService;
import com.ecobridge.matching.util.DistanceUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class MatchingServiceImpl implements MatchingService {

    private final WasteClient wasteClient;
    private final RecyclerClient recyclerClient;
    @Override
    @Cacheable(
            value = "nearbyWaste",
            key = "#latitude + '_' + #longitude"
    )
        public List<NearbyWasteResponse> getNearbyWaste(
                Double latitude,
                Double longitude
        ) {

            List<WasteResponse> wasteList =
                    wasteClient.getAvailableWaste();

            List<NearbyWasteResponse> nearbyWaste =
                    new ArrayList<>();

            for (WasteResponse waste : wasteList) {

                double distance =
                        DistanceUtil.calculateDistance(
                                latitude,
                                longitude,
                                waste.getLatitude(),
                                waste.getLongitude()
                        );

                NearbyWasteResponse response =
                        NearbyWasteResponse.builder()

                                .id(waste.getId())
                                .title(waste.getTitle())
                                .description(waste.getDescription())
                                .wasteType(waste.getWasteType())
                                .quantity(waste.getQuantity())
                                .quantityUnit(waste.getQuantityUnit())
                                .address(waste.getAddress())
                                .latitude(waste.getLatitude())
                                .longitude(waste.getLongitude())
                                .imageUrl(waste.getImageUrl())
                                .distance(distance)

                                .build();

                nearbyWaste.add(response);

            }

            nearbyWaste.sort(
                    Comparator.comparing(
                            NearbyWasteResponse::getDistance
                    )
            );

            return nearbyWaste;

        }

    @Override
    public List<WasteResponse> test() {

        return wasteClient.getAvailableWaste();

    }

    @Override
    @Cacheable(
            value = "matches",
            key = "#wasteId"
    )
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

    @Override
    @Cacheable(
            value = "nearbyRecyclers",
            key = "#latitude + '_' + #longitude"
    )
    public NearbyPartnersResponse getNearbyRecyclers(
            Double latitude,
            Double longitude
    ) {

        List<RecyclerResponse> recyclers =
                recyclerClient.getEligibleRecyclers();

        List<NearbyRecyclerResponse> verified =
                recyclers.stream()

                        .map(recycler -> {

                            double distance =
                                    DistanceUtil.calculateDistance(
                                            latitude,
                                            longitude,
                                            recycler.getLatitude(),
                                            recycler.getLongitude()
                                    );

                            return NearbyRecyclerResponse.builder()

                                    .recyclerId(recycler.getId())

                                    .recyclerName(recycler.getRecyclerName())

                                    .companyName(recycler.getCompanyName())

                                    .latitude(recycler.getLatitude())

                                    .longitude(recycler.getLongitude())

                                    .availableCapacity(
                                            recycler.getAvailableCapacity()
                                    )

                                    .distanceKm(distance)

                                    .build();

                        })

                        .sorted(
                                Comparator.comparing(
                                        NearbyRecyclerResponse::getDistanceKm
                                )
                        )

                        .limit(10)

                        .toList();



        return NearbyPartnersResponse.builder()

                .verified(verified)

                .publicRecyclers(new ArrayList<>())

                .build();

    }



}