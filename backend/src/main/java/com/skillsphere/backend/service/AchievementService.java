package com.skillsphere.backend.service;

import com.skillsphere.backend.dto.AchievementDTO;
import com.skillsphere.backend.entity.AchievementEntity;
import com.skillsphere.backend.entity.UserAchievementEntity;
import com.skillsphere.backend.exception.EntityNotFoundException;
import com.skillsphere.backend.mapper.AchievementMapper;
import com.skillsphere.backend.repo.AchievementRepo;
import com.skillsphere.backend.repo.UserAchievementRepo;
import lombok.RequiredArgsConstructor;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AchievementService {
    
    private static final Logger logger = LogManager.getLogger(AchievementService.class);
    
    private final AchievementRepo achievementRepo;
    private final UserAchievementRepo userAchievementRepo;
    private final AchievementMapper achievementMapper;
    private final UserProfileService userProfileService;
    
    /**
     * Get all achievements with user's unlock status
     */
    @Transactional(readOnly = true)
    public List<AchievementDTO> getAllAchievements(Long userId) {
        logger.debug("Fetching all achievements for user: {}", userId);
        
        List<AchievementEntity> allAchievements = achievementRepo.findAll();
        List<UserAchievementEntity> userAchievements = userAchievementRepo.findByUserId(userId);
        
        return allAchievements.stream()
                .map(achievement -> {
                    UserAchievementEntity userAchievement = userAchievements.stream()
                            .filter(ua -> ua.getAchievementId().equals(achievement.getAchievementId()))
                            .findFirst()
                            .orElse(null);
                    
                    return achievementMapper.toDto(achievement, userAchievement);
                })
                .collect(Collectors.toList());
    }
    
    /**
     * Get user's unlocked achievements only
     */
    @Transactional(readOnly = true)
    public List<AchievementDTO> getUnlockedAchievements(Long userId) {
        logger.debug("Fetching unlocked achievements for user: {}", userId);
        
        return userAchievementRepo.findByUserIdWithDetails(userId).stream()
                .map(achievementMapper::toUnlockedDto)
                .collect(Collectors.toList());
    }
    
    /**
     * Get recent achievements (last 5)
     */
    @Transactional(readOnly = true)
    public List<AchievementDTO> getRecentAchievements(Long userId, int limit) {
        logger.debug("Fetching recent {} achievements for user: {}", limit, userId);
        
        return userAchievementRepo.findByUserIdWithDetails(userId).stream()
                .limit(limit)
                .map(achievementMapper::toUnlockedDto)
                .collect(Collectors.toList());
    }
    
    /**
     * Unlock an achievement for user
     */
    @Transactional
    public AchievementDTO unlockAchievement(Long userId, Long achievementId) {
        logger.info("Unlocking achievement {} for user {}", achievementId, userId);
        
        // Check if already unlocked
        if (userAchievementRepo.existsByUserIdAndAchievementId(userId, achievementId)) {
            logger.warn("Achievement {} already unlocked for user {}", achievementId, userId);
            throw new IllegalStateException("Achievement already unlocked");
        }
        
        // Get achievement
        AchievementEntity achievement = achievementRepo.findById(achievementId)
                .orElseThrow(() -> new EntityNotFoundException(
                        "Achievement not found: " + achievementId));
        
        // Create user achievement
        UserAchievementEntity userAchievement = new UserAchievementEntity();
        userAchievement.setUserId(userId);
        userAchievement.setAchievementId(achievementId);
        userAchievement.setAchievement(achievement);
        
        UserAchievementEntity saved = userAchievementRepo.save(userAchievement);
        
        // Award XP to user
        userProfileService.awardXp(userId, achievement.getXpReward());
        
        // Increment achievement count
        userProfileService.incrementAchievements(userId);
        
        logger.info("Achievement {} unlocked for user {}, awarded {} XP", 
                    achievementId, userId, achievement.getXpReward());
        
        return achievementMapper.toUnlockedDto(saved);
    }
    
    /**
     * Check and unlock achievements based on criteria
     * (This would be called after completing nodes, trees, etc.)
     */
    @Transactional
    public void checkAndUnlockAchievements(Long userId) {
        logger.debug("Checking achievements for user: {}", userId);
        
        // Example: Check "First Steps" - Complete first node
        // This is a placeholder - you'd implement actual criteria checking
        
        // TODO: Implement achievement checking logic based on user stats
    }
}
