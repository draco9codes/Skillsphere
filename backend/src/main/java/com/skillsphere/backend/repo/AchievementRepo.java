package com.skillsphere.backend.repo;

import com.skillsphere.backend.entity.AchievementEntity;
import com.skillsphere.backend.entity.AchievementEntity.AchievementRarity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface AchievementRepo extends JpaRepository<AchievementEntity, Long> {
    
    // Find achievements by rarity
    List<AchievementEntity> findByRarity(AchievementRarity rarity);
    
    // Find all, ordered by XP reward (highest first)
    List<AchievementEntity> findAllByOrderByXpRewardDesc();
}
