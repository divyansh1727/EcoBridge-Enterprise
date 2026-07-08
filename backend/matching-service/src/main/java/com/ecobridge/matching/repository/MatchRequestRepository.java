package com.ecobridge.matching.repository;

import com.ecobridge.matching.entity.MatchRequest;
import com.ecobridge.matching.enums.MatchStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface MatchRequestRepository
        extends JpaRepository<MatchRequest, UUID> {
    List<MatchRequest> findByRecyclerIdAndStatus(
            UUID recyclerId,
            MatchStatus status
    );
}