package com.ecobridge.waste_service.controller;

import com.ecobridge.waste_service.dto.request.CreateWasteRequest;
import com.ecobridge.waste_service.dto.request.UpdateWasteRequest;
import com.ecobridge.waste_service.dto.response.WasteResponse;
import com.ecobridge.waste_service.service.WasteService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.PathVariable;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/waste")
@RequiredArgsConstructor
public class WasteController {

    private final WasteService wasteService;


    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping
    public WasteResponse createWaste(
            @RequestBody @Valid CreateWasteRequest request
    ) {
        return wasteService.createWaste(request);
    }
    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public WasteResponse getWasteById(@PathVariable UUID id) {

        return wasteService.getWasteById(id);

    }
    @GetMapping("/my")
    public List<WasteResponse> getMyWaste() {
        return wasteService.getMyWaste();
    }
    @PutMapping("/{id}")
    public WasteResponse updateWaste(
            @PathVariable UUID id,
            @Valid @RequestBody UpdateWasteRequest request
    ) {
        return wasteService.updateWaste(id, request);
    }
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteWaste(@PathVariable UUID id) {
        wasteService.deleteWaste(id);
    }
    @GetMapping
    public List<WasteResponse> getAllWaste() {
        return wasteService.getAllWaste();
    }
    @PutMapping("/{id}/reserve")
    public WasteResponse reserveWaste(
            @PathVariable UUID id
    ) {
        return wasteService.reserveWaste(id);
    }
}