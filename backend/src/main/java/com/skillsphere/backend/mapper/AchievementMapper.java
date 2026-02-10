package com.skillsphere.backend.mapper;

import com.skillsphere.backend.dto.AchievementDTO;
import com.skillsphere.backend.entity.AchievementEntity;
import com.skillsphere.backend.entity.UserAchievementEntity;
import org.springframework.stereotype.Component;

@Component
public class AchievementMapper {
    
    public AchievementDTO toDto(AchievementEntity entity, UserAchievementEntity userAchievement) {
        if (entity == null) {
            return null;
        }
        
        return AchievementDTO.builder()
                .achievementId(entity.getAchievementId())
                .title(entity.getTitle())
                .description(entity.getDescription())
                .iconName(entity.getIconName())
                .xpReward(entity.getXpReward())
                .rarity(entity.getRarity() != null ? entity.getRarity().name() : null)
                .unlocked(userAchievement != null)
                .unlockedDate(userAchievement != null ? userAchievement.getUnlockedDate() : null)
                .build();
    }
    
    // Simpler version when we know it's unlocked
    public AchievementDTO toUnlockedDto(UserAchievementEntity userAchievement) {
        if (userAchievement == null || userAchievement.getAchievement() == null) {
            return null;
        }
        
        AchievementEntity achievement = userAchievement.getAchievement();
        
        return AchievementDTO.builder()
                .achievementId(achievement.getAchievementId())
                .title(achievement.getTitle())
                .description(achievement.getDescription())
                .iconName(achievement.getIconName())
                .xpReward(achievement.getXpReward())
                .rarity(achievement.getRarity() != null ? achievement.getRarity().name() : null)
                .unlocked(true)
                .unlockedDate(userAchievement.getUnlockedDate())
                .build();
    }
}
