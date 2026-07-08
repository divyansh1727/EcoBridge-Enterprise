package com.ecobridge.recycler.controller;

import com.ecobridge.recycler.dto.request.CreateRecyclerRequest;
import com.ecobridge.recycler.dto.request.UpdateRecyclerRequest;
import com.ecobridge.recycler.dto.response.RecyclerResponse;
import com.ecobridge.recycler.service.RecyclerService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/recyclers")
@RequiredArgsConstructor
public class RecyclerController {

    private final RecyclerService recyclerService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public RecyclerResponse createRecycler(
            @Valid @RequestBody CreateRecyclerRequest request
    ) {
        return recyclerService.createRecycler(request);
    }
    @GetMapping("/{id}")
    public RecyclerResponse getRecyclerById(@PathVariable UUID id) {
        return recyclerService.getRecyclerById(id);
    }
    @GetMapping("/my")
    public List<RecyclerResponse> getMyRecycler() {
        return recyclerService.getMyRecycler();
    }
    @PutMapping("/{id}")
    public RecyclerResponse updateRecycler(
            @PathVariable UUID id,
            @Valid @RequestBody UpdateRecyclerRequest request
    ) {
        return recyclerService.updateRecycler(id, request);
    }
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteRecycler(@PathVariable UUID id) {
        recyclerService.deleteRecycler(id);
    }
    @GetMapping
    public List<RecyclerResponse> getAllRecyclers() {
        return recyclerService.getAllRecyclers();
    }
    @GetMapping("/eligible")
    public List<RecyclerResponse> getEligibleRecyclers() {
        return recyclerService.getEligibleRecyclers();
    }
    @PutMapping("/{id}/capacity")
    public RecyclerResponse reduceCapacity(
            @PathVariable UUID id,
            @RequestParam Double quantity
    ) {
        return recyclerService.reduceCapacity(id, quantity);
    }
}