package com.skillsphere.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class EnrolledTreeDTO {
    private Long enrollmentId;
    private Long treeId;
    private String title;
    private String description;
    private String category;
    private String thumbnailUrl;
    private Integer totalNodes;
    private Integer nodesCompleted;
    private BigDecimal progressPercentage;
    private String status;  // "ACTIVE", "COMPLETED", "PAUSED"
    private LocalDateTime enrollmentDate;
    private LocalDateTime lastAccessed;
    private Integer xpEarned;
    private Integer estimatedHours;
    private String difficulty;
}
