package com.skillsphere.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TreeNodeDTO {
    private Long nodeId;
    private String title;
    private String description;
    private String nodeType;
    private Integer xpReward;
    private Integer estimatedMinutes;
    private Integer orderIndex;
    private Boolean isCompleted;
    private Boolean isLocked;
    private LocalDateTime completedDate;
    private List<Long> prerequisiteNodes;
}
