package com.skillsphere.backend.project.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

/**
 * DTO for project detail page
 * Contains FULL information including resources, prerequisites
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProjectDetailDTO {
    
    // Includes everything from ProjectDTO
    private Long id;
    private String title;
    private String description;  // FULL description
    private String difficulty;
    private String projectType;
    private Integer xpReward;
    private Integer estimatedHours;
    private List<String> categories;
    
    // Additional detail-only fields
    private List<Long> prerequisiteProjectIds;
    private List<ResourceLinkDTO> resourceLinks;  // Parsed from JSON
    private Long requiredSkillNodeId;
    private Boolean isLocked;
    
    // User's progress on THIS project (if logged in)
    private UserProjectProgressDTO userProgress;
    
    // Community stats
    private Integer totalAttempts;
    private Integer completedCount;
    private Double averageCompletionTime;  // In hours
}
