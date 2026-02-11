package com.skillsphere.backend.project.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Request body when user submits/updates a project
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProjectSubmissionRequestDTO {
    private Long projectId;
    private String githubUrl;
    private String liveUrl;
    private String codeSnippet;
    private String description;
    private Boolean isPublic;  // Visibility preference
}
