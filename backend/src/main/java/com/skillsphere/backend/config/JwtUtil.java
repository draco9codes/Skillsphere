package com.skillsphere.backend.config;

import java.nio.charset.StandardCharsets;
import java.util.Date;

import javax.crypto.SecretKey;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

@Component
public class JwtUtil {
    private static final Logger logger = LogManager.getLogger(JwtUtil.class);

    @Value("${jwt.secret:mySecretKeyForJwtTokenGenerationThatIsAtLeast256BitsLongForHS256Algorithm}")
    private String secret;

    @Value("${jwt.expiration:3600000}")  // 1 hour in milliseconds
    private long expiration;

    /**
     * Generate JWT token from username
     */
    public String generateToken(String username) {
        logger.info("Generating JWT token for user: {}", username);
        
        SecretKey key = Keys.hmacShaKeyFor(secret.getBytes());
        
        String token = Jwts.builder()
                .subject(username)
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + expiration))
                .signWith(key)
                .compact();
        
        logger.info("✓ JWT token generated successfully for user: {}", username);
        return token;
    }

    /**
     * Extract username from JWT token
     */
    public String extractUsername(String token) {
        try {
            SecretKey key = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
            Claims claims = Jwts.parser()
                    .verifyWith(key)
                    .build()
                    .parseSignedClaims(token)
                    .getPayload();
            return claims.getSubject();
        } catch (Exception e) {
            logger.error("Error extracting username from token: {}", e.getMessage());
            return null;
        }
    }

    /**
     * Validate JWT token
     */
    public boolean validateToken(String token) {
        try {
            SecretKey key = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
            Jwts.parser()
                    .verifyWith(key)
                    .build()
                    .parseSignedClaims(token);
            logger.debug("✓ Token validated successfully");
            return true;
        } catch (Exception e) {
            logger.warn("✗ Token validation failed: {}", e.getMessage());
            return false;
        }
    }
}
