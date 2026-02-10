package com.skillsphere.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class StatsDTO {
    private Integer totalTreesEnrolled;
    private Integer totalTreesCompleted;
    private Integer totalNodesCompleted;
    private Integer totalTimeSpentHours;  // converted from minutes
    private Integer currentStreak;
    private Integer longestStreak;
}
