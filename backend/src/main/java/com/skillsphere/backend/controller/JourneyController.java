package com.skillsphere.backend.controller;

import com.skillsphere.backend.dto.*;
import com.skillsphere.backend.entity.UserEntity;
import com.skillsphere.backend.repo.UserRepo;
import com.skillsphere.backend.service.*;
import lombok.RequiredArgsConstructor;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/journey")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
@RequiredArgsConstructor
public class JourneyController {
    
    private static final Logger logger = LogManager.getLogger(JourneyController.class);
    
    private final JourneyService journeyService;
    private final UserProfileService userProfileService;
    private final SkillTreeService skillTreeService;
    private final AchievementService achievementService;
    private final UserRepo userRepo;
    
    /**
     * Get authenticated user's ID from JWT token
     */
    private Long getAuthenticatedUserId() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        
        if (auth == null || !auth.isAuthenticated()) {
            throw new RuntimeException("User not authenticated");
        }
        
        String username = (String) auth.getPrincipal();
        
        UserEntity user = userRepo.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found: " + username));
        
        return user.getUserId();
    }
    
    /**
     * GET /api/journey/dashboard
     * Get complete dashboard for authenticated user
     */
    @GetMapping("/dashboard")
    public ResponseEntity<JourneyDashboardDTO> getDashboard() {
        Long userId = getAuthenticatedUserId();
        logger.info("GET /api/journey/dashboard - User: {}", userId);
        
        JourneyDashboardDTO dashboard = journeyService.getDashboard(userId);
        return ResponseEntity.ok(dashboard);
    }
    
    /**
     * GET /api/journey/profile
     * Get authenticated user's profile
     */
    @GetMapping("/profile")
    public ResponseEntity<UserProfileResponseDTO> getUserProfile() {
        Long userId = getAuthenticatedUserId();
        logger.info("GET /api/journey/profile - User: {}", userId);
        
        UserProfileResponseDTO profile = userProfileService.getUserProfile(userId);
        return ResponseEntity.ok(profile);
    }
    
    /**
     * POST /api/journey/profile
     * Create profile for authenticated user
     */
    @PostMapping("/profile")
    public ResponseEntity<UserProfileResponseDTO> createProfile() {
        Long userId = getAuthenticatedUserId();
        logger.info("POST /api/journey/profile - User: {}", userId);
        
        UserProfileResponseDTO profile = userProfileService.createProfile(userId);
        return ResponseEntity.status(201).body(profile);
    }
    
    /**
     * GET /api/journey/trees/enrolled
     * Get authenticated user's enrolled trees
     */
    @GetMapping("/trees/enrolled")
    public ResponseEntity<List<EnrolledTreeDTO>> getEnrolledTrees() {
        Long userId = getAuthenticatedUserId();
        logger.info("GET /api/journey/trees/enrolled - User: {}", userId);
        
        List<EnrolledTreeDTO> trees = skillTreeService.getEnrolledTrees(userId);
        return ResponseEntity.ok(trees);
    }
    
    /**
     * GET /api/journey/trees/active
     * Get authenticated user's active trees
     */
    @GetMapping("/trees/active")
    public ResponseEntity<List<EnrolledTreeDTO>> getActiveTrees() {
        Long userId = getAuthenticatedUserId();
        logger.info("GET /api/journey/trees/active - User: {}", userId);
        
        List<EnrolledTreeDTO> trees = skillTreeService.getActiveTrees(userId);
        return ResponseEntity.ok(trees);
    }
    
    /**
     * GET /api/journey/trees/all
     * Get all available skill trees (PUBLIC - no auth needed)
     */
    @GetMapping("/trees/all")
    public ResponseEntity<List<SkillTreeSummaryDTO>> getAllSkillTrees() {
        logger.info("GET /api/journey/trees/all - Public access");
        
        List<SkillTreeSummaryDTO> trees = skillTreeService.getAllSkillTrees();
        return ResponseEntity.ok(trees);
    }
    
    /**
     * POST /api/journey/trees/enroll
     * Enroll authenticated user in a tree
     */
    @PostMapping("/trees/enroll")
    public ResponseEntity<EnrolledTreeDTO> enrollInTree(
            @Valid @RequestBody EnrollTreeRequestDTO request) {
        
        Long userId = getAuthenticatedUserId();
        logger.info("POST /api/journey/trees/enroll - User {} enrolling in tree {}", 
                    userId, request.getTreeId());
        
        EnrolledTreeDTO enrollment = skillTreeService.enrollInTree(userId, request.getTreeId());
        return ResponseEntity.status(201).body(enrollment);
    }
    
    /**
     * GET /api/journey/achievements
     * Get all achievements for authenticated user
     */
    @GetMapping("/achievements")
    public ResponseEntity<List<AchievementDTO>> getAllAchievements() {
        Long userId = getAuthenticatedUserId();
        logger.info("GET /api/journey/achievements - User: {}", userId);
        
        List<AchievementDTO> achievements = achievementService.getAllAchievements(userId);
        return ResponseEntity.ok(achievements);
    }
    
    /**
     * GET /api/journey/achievements/unlocked
     * Get unlocked achievements for authenticated user
     */
    @GetMapping("/achievements/unlocked")
    public ResponseEntity<List<AchievementDTO>> getUnlockedAchievements() {
        Long userId = getAuthenticatedUserId();
        logger.info("GET /api/journey/achievements/unlocked - User: {}", userId);
        
        List<AchievementDTO> achievements = achievementService.getUnlockedAchievements(userId);
        return ResponseEntity.ok(achievements);
    }
}
