package com.skillsphere.backend.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class AwardXpRequestDTO {
    
    @NotNull(message = "User ID is required")
    private Long userId;
    
    @NotNull(message = "XP amount is required")
    @Min(value = 1, message = "XP amount must be at least 1")
    private Integer xpAmount;
}
