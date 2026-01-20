package com.skillsphere.backend.service;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skillsphere.backend.repo.AuthRepo;

@Service
public class AuthService {
    
    private static final Logger logger = LogManager.getLogger(AuthService.class);
    
    @Autowired
    AuthRepo authRepo;

    public boolean validateUser(String username, String password) {
        logger.info("========== LOGIN ATTEMPT ==========");
        logger.info("Username provided: '{}'", username);
        logger.info("Password provided: '{}'", password);
        
        var user = authRepo.findByUsername(username);
        
        if (user == null) {
            logger.warn("✗ USER NOT FOUND in database with username: '{}'", username);
            return false;
        }
        
        logger.info("✓ User found in database");
        logger.info("  Username from DB: '{}'", user.getUsername());
        logger.info("  Password from DB: '{}'", user.getUserPassword());
        
        boolean passwordMatches = user.getUserPassword().equals(password);
        logger.info("Password comparison result: {}", passwordMatches);
        logger.info("Password from input: '{}' (length: {})", password, password.length());
        logger.info("Password from DB: '{}' (length: {})", user.getUserPassword(), user.getUserPassword().length());
        
        if (passwordMatches) {
            logger.info("✓ USER VALIDATED SUCCESSFULLY: {}", username);
            logger.info("========== LOGIN SUCCESS ==========");
            return true;
        } else {
            logger.warn("✗ PASSWORD MISMATCH for user: {}", username);
            logger.warn("========== LOGIN FAILED ==========");
            return false;
        }
    }
}
