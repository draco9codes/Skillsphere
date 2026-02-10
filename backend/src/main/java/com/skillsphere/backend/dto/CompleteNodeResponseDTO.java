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
public class CompleteNodeResponseDTO {
    private Boolean success;
    private Integer xpEarned;
    private Integer newLevel;
    private Boolean leveledUp;
    private Double updatedProgress;
    private List<Long> unlockedNodes;
}
