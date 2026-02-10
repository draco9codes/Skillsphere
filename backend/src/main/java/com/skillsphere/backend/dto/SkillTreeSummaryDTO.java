package com.skillsphere.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SkillTreeSummaryDTO {
    private Long treeId;
    private String title;
    private String description;
    private String category;
    private String thumbnailUrl;
    private Integer totalNodes;
    private Integer estimatedHours;
    private String difficulty;  // "BEGINNER", "INTERMEDIATE", "ADVANCED"
    private Integer totalXp;
    private Boolean isEnrolled;
}
