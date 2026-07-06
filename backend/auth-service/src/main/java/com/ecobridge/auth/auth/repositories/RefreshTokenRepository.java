package com.ecobridge.auth.auth.repositories;

import com.ecobridge.auth.auth.entities.RefreshToken;
import com.ecobridge.auth.auth.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;


import java.util.Optional;

import java.util.UUID;

public interface RefreshTokenRepository extends JpaRepository<RefreshToken, UUID> {

    Optional<RefreshToken> findByJti(String jti);
    void deleteByUser(User user);
}