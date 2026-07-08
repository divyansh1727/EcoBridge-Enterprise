package com.ecobridge.recycler.repository;

import com.ecobridge.recycler.entity.RecyclerWasteType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface RecyclerWasteTypeRepository extends JpaRepository<RecyclerWasteType, UUID> {

    List<RecyclerWasteType> findByRecyclerId(UUID recyclerId);

}