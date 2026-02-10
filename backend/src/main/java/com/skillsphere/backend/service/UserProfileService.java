package com.skillsphere.backend.service;

import com.skillsphere.backend.dto.UserProfileResponseDTO;
import com.skillsphere.backend.entity.UserProfileEntity;
import com.skillsphere.backend.exception.EntityNotFoundException;
import com.skillsphere.backend.mapper.UserProfileMapper;
import com.skillsphere.backend.repo.UserProfileRepo;
import lombok.RequiredArgsConstructor;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class UserProfileService {
    
    private static final Logger logger = LogManager.getLogger(UserProfileService.class);
    
    private final UserProfileRepo userProfileRepo;
    private final UserProfileMapper userProfileMapper;
    
    /**
     * Get user profile by user ID
     */
    @Transactional(readOnly = true)
    public UserProfileResponseDTO getUserProfile(Long userId) {
        logger.debug("Fetching profile for user: {}", userId);
        
        UserProfileEntity profile = userProfileRepo.findByUserId(userId)
                .orElseThrow(() -> new EntityNotFoundException(
                        "Profile not found for user: " + userId));
        
        return userProfileMapper.toDto(profile);
    }
    
    /**
     * Create a new user profile (called when user registers)
     */
    @Transactional
    public UserProfileResponseDTO createProfile(Long userId) {
        logger.info("Creating new profile for user: {}", userId);
        
        // Check if profile already exists
        if (userProfileRepo.existsByUserId(userId)) {
            throw new IllegalStateException("Profile already exists for user: " + userId);
        }
        
        UserProfileEntity profile = new UserProfileEntity();
        profile.setUserId(userId);
        profile.setLevel(1);
        profile.setTotalXp(0);
        profile.setCurrentXp(0);
        profile.setXpToNextLevel(100);
        profile.setUserTitle("Novice Learner");
        profile.setLearningStreak(0);
        profile.setTotalTimeSpent(0);
        profile.setAchievementsCount(0);
        
        UserProfileEntity saved = userProfileRepo.save(profile);
        logger.info("Profile created successfully for user: {}", userId);
        
        return userProfileMapper.toDto(saved);
    }
    
    /**
     * Award XP to user and handle level-ups
     */
    @Transactional
    public UserProfileResponseDTO awardXp(Long userId, Integer xpAmount) {
        logger.info("Awarding {} XP to user: {}", xpAmount, userId);
        
        UserProfileEntity profile = userProfileRepo.findByUserId(userId)
                .orElseThrow(() -> new EntityNotFoundException(
                        "Profile not found for user: " + userId));
        
        // Add XP
        profile.setTotalXp(profile.getTotalXp() + xpAmount);
        profile.setCurrentXp(profile.getCurrentXp() + xpAmount);
        
        // Check for level up
        while (profile.getCurrentXp() >= profile.getXpToNextLevel()) {
            levelUp(profile);
        }
        
        UserProfileEntity updated = userProfileRepo.save(profile);
        return userProfileMapper.toDto(updated);
    }
    
    /**
     * Handle level-up logic
     */
    private void levelUp(UserProfileEntity profile) {
        profile.setCurrentXp(profile.getCurrentXp() - profile.getXpToNextLevel());
        profile.setLevel(profile.getLevel() + 1);
        
        // XP required increases by 50 per level (100, 150, 200, 250...)
        profile.setXpToNextLevel(100 + (profile.getLevel() - 1) * 50);
        
        // Update title based on level
        updateTitle(profile);
        
        logger.info("User {} leveled up to level {}!", profile.getUserId(), profile.getLevel());
    }
    
    /**
     * Update user title based on level
     */
    private void updateTitle(UserProfileEntity profile) {
        Integer level = profile.getLevel();
        
        if (level >= 50) {
            profile.setUserTitle("Master Builder");
        } else if (level >= 40) {
            profile.setUserTitle("Expert Coder");
        } else if (level >= 30) {
            profile.setUserTitle("Senior Developer");
        } else if (level >= 20) {
            profile.setUserTitle("Skilled Craftsman");
        } else if (level >= 10) {
            profile.setUserTitle("Aspiring Developer");
        } else if (level >= 5) {
            profile.setUserTitle("Eager Learner");
        } else {
            profile.setUserTitle("Novice Learner");
        }
    }
    
    /**
     * Update learning streak
     */
    @Transactional
    public void updateStreak(Long userId, Integer streakDays) {
        UserProfileEntity profile = userProfileRepo.findByUserId(userId)
                .orElseThrow(() -> new EntityNotFoundException(
                        "Profile not found for user: " + userId));
        
        profile.setLearningStreak(streakDays);
        userProfileRepo.save(profile);
    }
    
    /**
     * Increment achievements count
     */
    @Transactional
    public void incrementAchievements(Long userId) {
        UserProfileEntity profile = userProfileRepo.findByUserId(userId)
                .orElseThrow(() -> new EntityNotFoundException(
                        "Profile not found for user: " + userId));
        
        profile.setAchievementsCount(profile.getAchievementsCount() + 1);
        userProfileRepo.save(profile);
    }
}
