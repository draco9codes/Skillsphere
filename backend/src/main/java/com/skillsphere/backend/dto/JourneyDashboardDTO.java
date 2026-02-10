package com.skillsphere.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class JourneyDashboardDTO {
    private UserProfileResponseDTO profile;
    private List<EnrolledTreeDTO> enrolledTrees;
    private List<AchievementDTO> recentAchievements;
    private StatsDTO stats;
}
