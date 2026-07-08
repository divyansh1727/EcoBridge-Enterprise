package com.ecobridge.waste_service.repository;

import com.ecobridge.waste_service.entity.Waste;
import com.ecobridge.waste_service.enums.WasteStatus;
import com.ecobridge.waste_service.enums.WasteType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface WasteRepository extends JpaRepository<Waste, UUID> {

    List<Waste> findByCreatedBy(UUID createdBy);

    List<Waste> findByWasteType(WasteType wasteType);

    List<Waste> findByStatus(WasteStatus status);

}