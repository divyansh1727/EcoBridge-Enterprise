package com.ecobridge.waste_service.repository;

import com.ecobridge.waste_service.entity.Waste;
import com.ecobridge.waste_service.enums.WasteStatus;
import com.ecobridge.waste_service.enums.WasteType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.UUID;

public interface WasteRepository extends JpaRepository<Waste, UUID> {

    List<Waste> findByCreatedBy(UUID createdBy);

    List<Waste> findByWasteType(WasteType wasteType);

    List<Waste> findByStatus(WasteStatus status);

    List<Waste> findByReservedBy(UUID reservedBy);

    List<Waste> findByReservedByAndStatus(
            UUID reservedBy,
            WasteStatus status
    );

    long countByStatus(WasteStatus status);

    long countByReservedBy(UUID reservedBy);

    long countByReservedByAndStatus(
            UUID reservedBy,
            WasteStatus status
    );
    long count();
    @Query("""
SELECT COALESCE(SUM(w.quantity),0)
FROM Waste w
WHERE w.status='COMPLETED'
""")
    Double totalRecycledKg();



}