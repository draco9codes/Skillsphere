package com.skillsphere.backend.project.dto;

import com.skillsphere.backend.project.entity.ProjectDifficulty;
import com.skillsphere.backend.project.entity.ProjectType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

/**
 * DTO for project listing/card view
 * Contains summary info, not full details
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProjectDTO {
    
    private Long id;
    private String title;
    private String description;  // Truncated for card view (first 200 chars)
    private ProjectDifficulty difficulty;
    private ProjectType projectType;
    private Integer xpReward;
    private Integer estimatedHours;
    private List<String> categories;
    
    // For locked/unlocked logic (frontend shows lock icon)
    private Long requiredSkillNodeId;
    private Boolean isLocked;  // Calculated field (not in entity)
    
    // Stats for card display
    private Integer totalSubmissions;  // How many students attempted
    private Integer completionRate;    // Percentage completed (calculated)
    
    private LocalDateTime createdAt;
}
