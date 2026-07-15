package com.ecobridge.analytics_service.repository;

import com.ecobridge.analytics_service.entity.AnalyticsStats;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AnalyticsRepository
        extends JpaRepository<AnalyticsStats, Long> {
}