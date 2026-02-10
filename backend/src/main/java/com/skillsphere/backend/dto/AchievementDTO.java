package com.skillsphere.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AchievementDTO {
    private Long achievementId;
    private String title;
    private String description;
    private String iconName;  // Lucide icon name
    private Integer xpReward;
    private String rarity;  // "COMMON", "RARE", "EPIC", "LEGENDARY"
    private LocalDateTime unlockedDate;  // null if not unlocked
    private Boolean unlocked;
}
