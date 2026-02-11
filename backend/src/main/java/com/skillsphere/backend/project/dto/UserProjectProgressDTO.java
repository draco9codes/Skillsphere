package com.skillsphere.backend.project.dto;

import com.skillsphere.backend.project.entity.SubmissionStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

/**
 * User's progress on a specific project
 * Nested inside ProjectDetailDTO
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserProjectProgressDTO {
    private Long submissionId;
    private SubmissionStatus status;
    private String githubUrl;
    private String liveUrl;
    private Integer xpEarned;
    private LocalDateTime startedAt;
    private LocalDateTime submittedAt;
    private String feedbackText;
}
