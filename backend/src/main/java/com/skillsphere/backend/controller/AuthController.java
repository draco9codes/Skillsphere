package com.skillsphere.backend.controller;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skillsphere.backend.dto.LoginRequest;
import com.skillsphere.backend.dto.LoginResponse;
import com.skillsphere.backend.security.JwtUtil;
import com.skillsphere.backend.service.AuthService;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {
    private static final Logger logger = LogManager.getLogger(AuthController.class);

    @Autowired
    private AuthService authService;

    @Autowired
    private JwtUtil jwtUtil;

    public AuthController() {
        logger.info("✓ AuthController initialized successfully");
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        logger.info("✓ Login endpoint accessed - Email: {}", loginRequest.getEmail());
        
        try {
            // Validate user credentials using email/username
            boolean isValidUser = authService.validateUser(loginRequest.getEmail(), loginRequest.getPassword());
            
            if (isValidUser) {
                // Generate JWT token
                String token = jwtUtil.generateToken(loginRequest.getEmail());
                logger.info("✓ Login successful for user: {}", loginRequest.getEmail());
                
                return ResponseEntity.ok(new LoginResponse(token));
            } else {
                logger.warn("✗ Login failed - Invalid credentials for: {}", loginRequest.getEmail());
                return ResponseEntity.status(401).body("{\"error\":\"Invalid email or password\"}");
            }
        } catch (Exception e) {
            logger.error("✗ Login failed with exception: {}", e.getMessage());
            logger.error("Full stack trace: ", e);
            return ResponseEntity.status(500).body("{\"error\":\"" + e.getMessage() + "\"}");
        }
    }
}

