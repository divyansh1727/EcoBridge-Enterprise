package com.ecobridge.recycler.repository;

import com.ecobridge.recycler.entity.Recycler;
import com.ecobridge.recycler.enums.RecyclerStatus;
import com.ecobridge.recycler.enums.VerificationStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface RecyclerRepository extends JpaRepository<Recycler, UUID> {

    List<Recycler> findByCreatedBy(UUID createdBy);

    Optional<Recycler> findByEmail(String email);

    Optional<Recycler> findByPhone(String phone);

    List<Recycler> findByStatusAndVerificationStatus(
            RecyclerStatus status,
            VerificationStatus verificationStatus
    );
}