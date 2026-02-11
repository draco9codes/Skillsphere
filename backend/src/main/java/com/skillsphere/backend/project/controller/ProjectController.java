package com.skillsphere.backend.project.controller;

import com.skillsphere.backend.project.dto.*;
import com.skillsphere.backend.project.entity.ProjectDifficulty;
import com.skillsphere.backend.project.entity.ProjectType;
import com.skillsphere.backend.project.service.ProjectService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController  // Combines @Controller + @ResponseBody (returns JSON automatically)
@RequestMapping("/api/projects")  // Base path: All endpoints start with /api/projects
@RequiredArgsConstructor
public class ProjectController {

    private final ProjectService projectService;

    // ========================================
    // GET ENDPOINTS - Fetch Projects
    // ========================================

    /**
     * GET /api/projects
     * Get all projects (with optional filters)
     * 
     * Examples:
     * - /api/projects → All projects
     * - /api/projects?difficulty=BEGINNER → Filter by difficulty
     * - /api/projects?type=CODING_CHALLENGE → Filter by type
     * - /api/projects?category=Frontend → Filter by category
     */
    @GetMapping
    public ResponseEntity<List<ProjectDTO>> getAllProjects(
            @RequestParam(required = false) ProjectDifficulty difficulty,
            @RequestParam(required = false) ProjectType type,
            @RequestParam(required = false) String category
    ) {
        List<ProjectDTO> projects;

        // Apply filters based on query parameters
        if (difficulty != null) {
            projects = projectService.getProjectsByDifficulty(difficulty);
        } else if (type != null) {
            projects = projectService.getProjectsByType(type);
        } else if (category != null) {
            projects = projectService.getProjectsByCategory(category);
        } else {
            projects = projectService.getAllProjects();
        }

        return ResponseEntity.ok(projects);
    }

    /**
     * GET /api/projects/{id}
     * Get single project with full details
     * 
     * Example: /api/projects/5
     * Optional: Pass userId in header for personalized data
     */
    @GetMapping("/{id}")
    public ResponseEntity<ProjectDetailDTO> getProjectDetail(
            @PathVariable Long id,
            @RequestHeader(value = "X-User-Id", required = false) Long userId
    ) {
        ProjectDetailDTO project = projectService.getProjectDetail(id, userId);
        return ResponseEntity.ok(project);
    }

    /**
     * GET /api/projects/showcase
     * Get all public submissions for showcase gallery
     */
    @GetMapping("/showcase")
    public ResponseEntity<List<ProjectSubmissionResponseDTO>> getShowcase() {
        List<ProjectSubmissionResponseDTO> submissions = projectService.getPublicSubmissions();
        return ResponseEntity.ok(submissions);
    }

    // ========================================
    // USER SUBMISSIONS ENDPOINTS
    // ========================================

    /**
     * GET /api/projects/my-submissions
     * Get current user's all project submissions
     * 
     * Requires: X-User-Id header
     */
    @GetMapping("/my-submissions")
    public ResponseEntity<List<ProjectSubmissionResponseDTO>> getMySubmissions(
            @RequestHeader("X-User-Id") Long userId
    ) {
        List<ProjectSubmissionResponseDTO> submissions = projectService.getUserSubmissions(userId);
        return ResponseEntity.ok(submissions);
    }
}