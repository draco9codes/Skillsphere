package com.skillsphere.backend.mapper;

import com.skillsphere.backend.dto.UserProfileResponseDTO;
import com.skillsphere.backend.entity.UserProfileEntity;
import org.springframework.stereotype.Component;

@Component
public class UserProfileMapper {
    
    public UserProfileResponseDTO toDto(UserProfileEntity entity) {
        if (entity == null) {
            return null;
        }
        
        return UserProfileResponseDTO.builder()
                .profileId(entity.getProfileId())
                .userId(entity.getUserId())
                .level(entity.getLevel())
                .totalXp(entity.getTotalXp())
                .currentXp(entity.getCurrentXp())
                .xpToNextLevel(entity.getXpToNextLevel())
                .avatarUrl(entity.getAvatarUrl())
                .userTitle(entity.getUserTitle())
                .learningStreak(entity.getLearningStreak())
                .totalTimeSpent(entity.getTotalTimeSpent())
                .achievementsCount(entity.getAchievementsCount())
                .build();
    }
    
    public UserProfileEntity toEntity(UserProfileResponseDTO dto) {
        if (dto == null) {
            return null;
        }
        
        UserProfileEntity entity = new UserProfileEntity();
        entity.setProfileId(dto.getProfileId());
        entity.setUserId(dto.getUserId());
        entity.setLevel(dto.getLevel());
        entity.setTotalXp(dto.getTotalXp());
        entity.setCurrentXp(dto.getCurrentXp());
        entity.setXpToNextLevel(dto.getXpToNextLevel());
        entity.setAvatarUrl(dto.getAvatarUrl());
        entity.setUserTitle(dto.getUserTitle());
        entity.setLearningStreak(dto.getLearningStreak());
        entity.setTotalTimeSpent(dto.getTotalTimeSpent());
        entity.setAchievementsCount(dto.getAchievementsCount());
        return entity;
    }
}
