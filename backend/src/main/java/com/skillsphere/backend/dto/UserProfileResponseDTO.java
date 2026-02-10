package com.skillsphere.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserProfileResponseDTO {
    private Long profileId;
    private Long userId;
    private Integer level;
    private Integer totalXp;
    private Integer currentXp;
    private Integer xpToNextLevel;
    private String avatarUrl;
    private String userTitle;
    private Integer learningStreak;
    private Integer totalTimeSpent;  // in minutes
    private Integer achievementsCount;
}
