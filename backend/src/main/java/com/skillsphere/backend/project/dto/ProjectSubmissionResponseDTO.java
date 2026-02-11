package com.skillsphere.backend.project.dto;

import com.skillsphere.backend.project.entity.SubmissionStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

/**
 * Response when fetching submission details
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProjectSubmissionResponseDTO {
    private Long id;
    private Long projectId;
    private String projectTitle;  // Joined from project
    private Long userId;
    private String username;      // Joined from user (for showcase)
    
    private String githubUrl;
    private String liveUrl;
    private String codeSnippet;
    private String description;
    
    private SubmissionStatus status;
    private Boolean isPublic;
    private Integer xpEarned;
    private String feedbackText;
    
    private LocalDateTime startedAt;
    private LocalDateTime submittedAt;
    private LocalDateTime completedAt;
}
