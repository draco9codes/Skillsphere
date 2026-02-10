package com.skillsphere.backend.service;

import com.skillsphere.backend.dto.*;
import lombok.RequiredArgsConstructor;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class JourneyService {
    
    private static final Logger logger = LogManager.getLogger(JourneyService.class);
    
    private final UserProfileService userProfileService;
    private final SkillTreeService skillTreeService;
    private final AchievementService achievementService;
    
    /**
     * Get complete dashboard data for My Journey page
     */
    @Transactional(readOnly = true)
    public JourneyDashboardDTO getDashboard(Long userId) {
        logger.info("Building dashboard for user: {}", userId);
        
        // Fetch user profile
        UserProfileResponseDTO profile = userProfileService.getUserProfile(userId);
        
        // Fetch enrolled trees
        List<EnrolledTreeDTO> enrolledTrees = skillTreeService.getEnrolledTrees(userId);
        
        // Fetch recent achievements (last 5)
        List<AchievementDTO> recentAchievements = achievementService.getRecentAchievements(userId, 5);
        
        // Build stats
        StatsDTO stats = buildStats(userId, profile, enrolledTrees);
        
        return JourneyDashboardDTO.builder()
                .profile(profile)
                .enrolledTrees(enrolledTrees)
                .recentAchievements(recentAchievements)
                .stats(stats)
                .build();
    }
    
    /**
     * Build computed statistics
     */
    private StatsDTO buildStats(Long userId, UserProfileResponseDTO profile, 
                                 List<EnrolledTreeDTO> enrolledTrees) {
        
        // Count completed trees
        long completedTreesCount = enrolledTrees.stream()
                .filter(tree -> "COMPLETED".equals(tree.getStatus()))
                .count();
        
        // Sum total nodes completed
        int totalNodesCompleted = enrolledTrees.stream()
                .mapToInt(EnrolledTreeDTO::getNodesCompleted)
                .sum();
        
        // Convert minutes to hours
        int totalTimeHours = profile.getTotalTimeSpent() / 60;
        
        return StatsDTO.builder()
                .totalTreesEnrolled(enrolledTrees.size())
                .totalTreesCompleted((int) completedTreesCount)
                .totalNodesCompleted(totalNodesCompleted)
                .totalTimeSpentHours(totalTimeHours)
                .currentStreak(profile.getLearningStreak())
                .longestStreak(profile.getLearningStreak())  // TODO: Track separately
                .build();
    }
}
