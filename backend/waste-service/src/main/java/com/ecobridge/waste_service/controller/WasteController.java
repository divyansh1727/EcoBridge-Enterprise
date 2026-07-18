package com.ecobridge.waste_service.controller;

import com.ecobridge.waste_service.dto.request.CreateWasteRequest;
import com.ecobridge.waste_service.dto.request.UpdateWasteRequest;
import com.ecobridge.waste_service.dto.response.RecyclerDashboardResponse;
import com.ecobridge.waste_service.dto.response.WasteResponse;
import com.ecobridge.waste_service.dto.response.WasteStatsResponse;
import com.ecobridge.waste_service.service.WasteService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import java.util.List;
import com.ecobridge.waste_service.dto.response.DailyWasteResponse;
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
    @GetMapping("/available")
    public ResponseEntity<List<WasteResponse>> getAvailableWaste() {

        return ResponseEntity.ok(
                wasteService.getAvailableWaste()
        );
    }

    @GetMapping("/stats")
    public ResponseEntity<WasteStatsResponse> getStats() {

        return ResponseEntity.ok(
                wasteService.getWasteStats()
        );

    }

    @GetMapping("/weekly")
public ResponseEntity<List<DailyWasteResponse>> getWeeklyWaste() {

    return ResponseEntity.ok(
            wasteService.getWeeklyWaste()
    );

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

    @GetMapping("/my-pickups")
    public ResponseEntity<List<WasteResponse>> getMyPickups() {

        return ResponseEntity.ok(
                wasteService.getMyPickups()
        );

    }

    @GetMapping("/pickup-history")
    public ResponseEntity<List<WasteResponse>> getPickupHistory() {

        return ResponseEntity.ok(
                wasteService.getPickupHistory()
        );

    }

    @PutMapping("/{id}/complete")
    public ResponseEntity<WasteResponse> completePickup(
            @PathVariable UUID id
    ) {

        return ResponseEntity.ok(
                wasteService.completePickup(id)
        );

    }

    @GetMapping("/recycler-dashboard")
    public ResponseEntity<RecyclerDashboardResponse> recyclerDashboard() {

        return ResponseEntity.ok(
                wasteService.getRecyclerDashboard()
        );

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
    public ResponseEntity<WasteResponse> reserveWaste(
            @PathVariable UUID id
    ) {

        return ResponseEntity.ok(
                wasteService.reserveWaste(id)
        );

    }
}