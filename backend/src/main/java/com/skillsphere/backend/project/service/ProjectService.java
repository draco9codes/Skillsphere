package com.skillsphere.backend.project.service;

import com.skillsphere.backend.exception.EntityNotFoundException;
import com.skillsphere.backend.project.dto.*;
import com.skillsphere.backend.project.entity.*;
import com.skillsphere.backend.project.mapper.ProjectMapper;
import com.skillsphere.backend.project.repo.ProjectRepo;
import com.skillsphere.backend.project.repo.ProjectSubmissionRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ProjectService {

    private final ProjectRepo projectRepo;
    private final ProjectSubmissionRepo submissionRepo;
    private final ProjectMapper projectMapper;  // ⭐ Inject mapper

    // ========================================
    // PUBLIC API METHODS
    // ========================================

    /**
     * Get all projects (for browse/listing page)
     */
    public List<ProjectDTO> getAllProjects() {
        List<ProjectEntity> projects = projectRepo.findAll();
        return projects.stream()
                .map(projectMapper::toDto)  // ✨ Clean!
                .collect(Collectors.toList());
    }

    /**
     * Get projects filtered by difficulty
     */
    public List<ProjectDTO> getProjectsByDifficulty(ProjectDifficulty difficulty) {
        List<ProjectEntity> projects = projectRepo.findByDifficulty(difficulty);
        return projects.stream()
                .map(projectMapper::toDto)
                .collect(Collectors.toList());
    }

    /**
     * Get projects filtered by type
     */
    public List<ProjectDTO> getProjectsByType(ProjectType projectType) {
        List<ProjectEntity> projects = projectRepo.findByProjectType(projectType);
        return projects.stream()
                .map(projectMapper::toDto)
                .collect(Collectors.toList());
    }

    /**
     * Get projects by category tag
     */
    public List<ProjectDTO> getProjectsByCategory(String category) {
        List<ProjectEntity> projects = projectRepo.findByCategory(category);
        return projects.stream()
                .map(projectMapper::toDto)
                .collect(Collectors.toList());
    }

    /**
     * Get single project with FULL details
     */
    public ProjectDetailDTO getProjectDetail(Long projectId, Long userId) {
        ProjectEntity project = projectRepo.findById(projectId)
                .orElseThrow(() -> new EntityNotFoundException("Project not found with id: " + projectId));

        ProjectDetailDTO dto = projectMapper.toDetailDto(project);

        // If user is logged in, add their progress
        if (userId != null) {
            submissionRepo.findByUserIdAndProjectId(userId, projectId)
                    .ifPresent(submission -> {
                        dto.setUserProgress(projectMapper.toUserProgressDto(submission));
                    });
        }

        return dto;
    }

    /**
     * Get all submissions by a user
     */
    public List<ProjectSubmissionResponseDTO> getUserSubmissions(Long userId) {
        List<ProjectSubmissionEntity> submissions = submissionRepo.findByUserId(userId);
        return submissions.stream()
                .map(projectMapper::toSubmissionResponseDto)
                .collect(Collectors.toList());
    }

    /**
     * Get public submissions for showcase
     */
    public List<ProjectSubmissionResponseDTO> getPublicSubmissions() {
        List<ProjectSubmissionEntity> submissions = submissionRepo.findByIsPublicTrue();
        return submissions.stream()
                .map(projectMapper::toSubmissionResponseDto)
                .collect(Collectors.toList());
    }

    // ========================================
    // SUBMISSION MANAGEMENT
    // ========================================

    /**
     * Start a project
     */
    @Transactional
    public ProjectSubmissionResponseDTO startProject(Long projectId, Long userId) {
        // Check if already started
        if (submissionRepo.findByUserIdAndProjectId(userId, projectId).isPresent()) {
            throw new IllegalArgumentException("Project already started by this user");
        }

        // Verify project exists
        if (!projectRepo.existsById(projectId)) {
            throw new EntityNotFoundException("Project not found with id: " + projectId);
        }

        ProjectSubmissionEntity submission = ProjectSubmissionEntity.builder()
                .projectId(projectId)
                .userId(userId)
                .status(SubmissionStatus.IN_PROGRESS)
                .startedAt(LocalDateTime.now())
                .isPublic(false)
                .build();

        ProjectSubmissionEntity saved = submissionRepo.save(submission);
        return projectMapper.toSubmissionResponseDto(saved);
    }

    /**
     * Submit project for review
     */
    @Transactional
    public ProjectSubmissionResponseDTO submitProject(Long submissionId, ProjectSubmissionRequestDTO request) {
        ProjectSubmissionEntity submission = submissionRepo.findById(submissionId)
                .orElseThrow(() -> new EntityNotFoundException("Submission not found"));

        submission.setGithubUrl(request.getGithubUrl());
        submission.setLiveUrl(request.getLiveUrl());
        submission.setCodeSnippet(request.getCodeSnippet());
        submission.setDescription(request.getDescription());
        submission.setIsPublic(request.getIsPublic());
        submission.setStatus(SubmissionStatus.SUBMITTED);
        submission.setSubmittedAt(LocalDateTime.now());

        ProjectSubmissionEntity updated = submissionRepo.save(submission);
        return projectMapper.toSubmissionResponseDto(updated);
    }

    /**
     * Mark project as completed (awards XP)
     */
    @Transactional
    public ProjectSubmissionResponseDTO completeProject(Long submissionId) {
        ProjectSubmissionEntity submission = submissionRepo.findById(submissionId)
                .orElseThrow(() -> new EntityNotFoundException("Submission not found"));

        ProjectEntity project = projectRepo.findById(submission.getProjectId())
                .orElseThrow(() -> new EntityNotFoundException("Project not found"));

        submission.setStatus(SubmissionStatus.COMPLETED);
        submission.setCompletedAt(LocalDateTime.now());
        submission.setXpEarned(project.getXpReward());

        // TODO: Update user's total XP in UserProfile

        ProjectSubmissionEntity updated = submissionRepo.save(submission);
        return projectMapper.toSubmissionResponseDto(updated);
    }
}
