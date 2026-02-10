package com.skillsphere.backend.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class EnrollTreeRequestDTO {
    @NotNull(message = "Tree ID is required")
    private Long treeId;
}
