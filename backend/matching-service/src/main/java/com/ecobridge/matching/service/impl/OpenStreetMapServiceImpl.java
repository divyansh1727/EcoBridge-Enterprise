package com.ecobridge.matching.service.impl;

import com.ecobridge.matching.dto.PublicRecyclerResponse;
import com.ecobridge.matching.service.OpenStreetMapService;
import lombok.RequiredArgsConstructor;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.*;

@Service
@RequiredArgsConstructor
public class OpenStreetMapServiceImpl implements OpenStreetMapService {

    private final RestTemplate restTemplate;

    @Override
    public List<PublicRecyclerResponse> findNearby(
            Double latitude,
            Double longitude
    ) {

        String query = """
                [out:json];
                (
                  node
                    ["amenity"="recycling"]
                    (around:10000,%f,%f);
                );
                out;
                """.formatted(latitude, longitude);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.TEXT_PLAIN);

        HttpEntity<String> entity =
                new HttpEntity<>(query, headers);

        Map<String, Object> response;

        try {

            response = restTemplate.exchange(
                    "https://overpass-api.de/api/interpreter",
                    HttpMethod.POST,
                    entity,
                    new ParameterizedTypeReference<Map<String, Object>>() {}
            ).getBody();

        } catch (Exception e) {

            e.printStackTrace();

            return List.of();

        }

        List<Map<String, Object>> elements =
                (List<Map<String, Object>>) response.get("elements");

        List<PublicRecyclerResponse> result =
                new ArrayList<>();

        for (Map<String, Object> element : elements) {

            Map<String, Object> tags =
                    (Map<String, Object>) element.get("tags");

            result.add(

                    PublicRecyclerResponse.builder()

                            .name(
                                    tags.getOrDefault(
                                            "name",
                                            "Public Recycling Centre"
                                    ).toString()
                            )

                            .address(
                                    tags.getOrDefault(
                                            "addr:street",
                                            "Address unavailable"
                                    ).toString()
                            )

                            .latitude(
                                    ((Number) element.get("lat")).doubleValue()
                            )

                            .longitude(
                                    ((Number) element.get("lon")).doubleValue()
                            )

                            .build()

            );

        }

        return result;

    }

}