package com.skillsphere.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class EnrollTreeResponseDTO {
    private Long enrollmentId;
    private Long treeId;
    private LocalDateTime enrollmentDate;
    private String status;
}
