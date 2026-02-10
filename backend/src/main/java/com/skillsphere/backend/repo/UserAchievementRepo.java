package com.skillsphere.backend.repo;

import com.skillsphere.backend.entity.UserAchievementEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface UserAchievementRepo extends JpaRepository<UserAchievementEntity, Long> {
    
    // Find all achievements unlocked by a user
    List<UserAchievementEntity> findByUserId(Long userId);
    
    // Check if user has unlocked a specific achievement
    boolean existsByUserIdAndAchievementId(Long userId, Long achievementId);
    
    // Count achievements unlocked by user
    Long countByUserId(Long userId);
    
    // Get user's achievements with full achievement details (JOIN query)
    @Query("SELECT ua FROM UserAchievementEntity ua " +
           "JOIN FETCH ua.achievement " +
           "WHERE ua.userId = :userId " +
           "ORDER BY ua.unlockedDate DESC")
    List<UserAchievementEntity> findByUserIdWithDetails(@Param("userId") Long userId);
}
