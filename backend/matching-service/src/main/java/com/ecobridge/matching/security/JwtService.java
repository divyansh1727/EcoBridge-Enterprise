package com.ecobridge.matching.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.UUID;

@Service
@Getter
public class JwtService {

    @Value("${security.jwt.secret}")
    private String secret;

    private SecretKey key;

    @PostConstruct
    public void init() {
        key = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
    }

    public Jws<Claims> parse(String token) {
        return Jwts.parser()
                .verifyWith(key)
                .build()
                .parseSignedClaims(token);
    }

    public UUID getUserId(String token) {
        return UUID.fromString(parse(token).getPayload().getSubject());
    }

    public String getEmail(String token) {
        return parse(token).getPayload().get("email", String.class);
    }

    public List<String> getRoles(String token) {
        return parse(token).getPayload().get("roles", List.class);
    }

    public boolean isAccessToken(String token) {
        return "access".equals(
                parse(token).getPayload().get("typ")
        );
    }
}