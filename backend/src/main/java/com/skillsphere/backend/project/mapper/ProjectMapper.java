package com.skillsphere.backend.project.mapper;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.skillsphere.backend.project.dto.*;
import com.skillsphere.backend.project.entity.ProjectEntity;
import com.skillsphere.backend.project.entity.ProjectSubmissionEntity;
import com.skillsphere.backend.project.entity.SubmissionStatus;
import com.skillsphere.backend.project.repo.ProjectRepo;
import com.skillsphere.backend.project.repo.ProjectSubmissionRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
@RequiredArgsConstructor
public class ProjectMapper {

    private final ObjectMapper objectMapper;
    private final ProjectSubmissionRepo submissionRepo;
    private final ProjectRepo projectRepo;

    /**
     * Convert ProjectEntity to ProjectDTO (summary for list view)
     */
    public ProjectDTO toDto(ProjectEntity entity) {
        if (entity == null) {
            return null;
        }

        // Calculate stats
        List<ProjectSubmissionEntity> submissions = submissionRepo.findByProjectId(entity.getId());
        int totalSubmissions = submissions.size();
        long completedCount = submissions.stream()
                .filter(s -> s.getStatus() == SubmissionStatus.COMPLETED)
                .count();
        int completionRate = totalSubmissions > 0 
                ? (int) ((completedCount * 100) / totalSubmissions) 
                : 0;

        return ProjectDTO.builder()
                .id(entity.getId())
                .title(entity.getTitle())
                .description(truncateDescription(entity.getDescription()))
                .difficulty(entity.getDifficulty())
                .projectType(entity.getProjectType())
                .xpReward(entity.getXpReward())
                .estimatedHours(entity.getEstimatedHours())
                .categories(entity.getCategories())
                .requiredSkillNodeId(entity.getRequiredSkillNodeId())
                .isLocked(false)  // TODO: Implement lock logic
                .totalSubmissions(totalSubmissions)
                .completionRate(completionRate)
                .createdAt(entity.getCreatedAt())
                .build();
    }

    /**
     * Convert ProjectEntity to ProjectDetailDTO (full details for detail page)
     */
    public ProjectDetailDTO toDetailDto(ProjectEntity entity) {
        if (entity == null) {
            return null;
        }

        // Calculate community stats
        List<ProjectSubmissionEntity> submissions = submissionRepo.findByProjectId(entity.getId());
        int totalAttempts = submissions.size();
        long completedCount = submissions.stream()
                .filter(s -> s.getStatus() == SubmissionStatus.COMPLETED)
                .count();
        
        // Calculate average completion time
        double avgTime = submissions.stream()
                .filter(s -> s.getStartedAt() != null && s.getCompletedAt() != null)
                .mapToLong(s -> java.time.Duration.between(s.getStartedAt(), s.getCompletedAt()).toHours())
                .average()
                .orElse(0.0);

        return ProjectDetailDTO.builder()
                .id(entity.getId())
                .title(entity.getTitle())
                .description(entity.getDescription())  // Full description
                .difficulty(entity.getDifficulty().toString())
                .projectType(entity.getProjectType().toString())
                .xpReward(entity.getXpReward())
                .estimatedHours(entity.getEstimatedHours())
                .categories(entity.getCategories())
                .prerequisiteProjectIds(entity.getPrerequisiteProjectIds())
                .resourceLinks(parseResourceLinks(entity.getResourceLinksJson()))
                .requiredSkillNodeId(entity.getRequiredSkillNodeId())
                .isLocked(false)  // TODO: Implement
                .totalAttempts(totalAttempts)
                .completedCount((int) completedCount)
                .averageCompletionTime(avgTime)
                .build();
    }

    /**
     * Convert ProjectSubmissionEntity to UserProjectProgressDTO
     */
    public UserProjectProgressDTO toUserProgressDto(ProjectSubmissionEntity entity) {
        if (entity == null) {
            return null;
        }

        return UserProjectProgressDTO.builder()
                .submissionId(entity.getId())
                .status(entity.getStatus())
                .githubUrl(entity.getGithubUrl())
                .liveUrl(entity.getLiveUrl())
                .xpEarned(entity.getXpEarned())
                .startedAt(entity.getStartedAt())
                .submittedAt(entity.getSubmittedAt())
                .feedbackText(entity.getFeedbackText())
                .build();
    }

    /**
     * Convert ProjectSubmissionEntity to ProjectSubmissionResponseDTO
     */
    public ProjectSubmissionResponseDTO toSubmissionResponseDto(ProjectSubmissionEntity entity) {
        if (entity == null) {
            return null;
        }

        // Fetch project title
        String projectTitle = projectRepo.findById(entity.getProjectId())
                .map(ProjectEntity::getTitle)
                .orElse("Unknown Project");

        return ProjectSubmissionResponseDTO.builder()
                .id(entity.getId())
                .projectId(entity.getProjectId())
                .projectTitle(projectTitle)
                .userId(entity.getUserId())
                .username("User" + entity.getUserId())  // TODO: Fetch real username
                .githubUrl(entity.getGithubUrl())
                .liveUrl(entity.getLiveUrl())
                .codeSnippet(entity.getCodeSnippet())
                .description(entity.getDescription())
                .status(entity.getStatus())
                .isPublic(entity.getIsPublic())
                .xpEarned(entity.getXpEarned())
                .feedbackText(entity.getFeedbackText())
                .startedAt(entity.getStartedAt())
                .submittedAt(entity.getSubmittedAt())
                .completedAt(entity.getCompletedAt())
                .build();
    }

    // ========================================
    // HELPER METHODS
    // ========================================

    /**
     * Truncate description for card view (first 200 chars)
     */
    private String truncateDescription(String description) {
        if (description == null) return "";
        return description.length() > 200 
                ? description.substring(0, 200) + "..." 
                : description;
    }

    /**
     * Parse JSON string to List<ResourceLinkDTO>
     */
    private List<ResourceLinkDTO> parseResourceLinks(String json) {
        if (json == null || json.isEmpty()) {
            return new ArrayList<>();
        }
        try {
            return objectMapper.readValue(json, new TypeReference<List<ResourceLinkDTO>>() {});
        } catch (Exception e) {
            return new ArrayList<>();
        }
    }
}
