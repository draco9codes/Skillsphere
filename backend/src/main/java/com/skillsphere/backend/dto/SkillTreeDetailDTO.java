package com.skillsphere.backend.dto;

import java.time.LocalDateTime;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SkillTreeDetailDTO {
    private Long treeId;
    private String title;
    private String description;
    private String category;
    private String difficulty;
    private String thumbnailUrl;
    private Integer totalNodes;
    private Integer completedNodes;
    private Double progressPercentage;
    private Integer totalXp;
    private Integer earnedXp;
    private Integer estimatedHours;
    private List<TreeNodeDTO> nodes;
    private Long enrollmentId;
    private LocalDateTime enrollmentDate;
    private String status;
}

