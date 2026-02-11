package com.skillsphere.backend.project.repo;

import com.skillsphere.backend.project.entity.ProjectSubmissionEntity;
import com.skillsphere.backend.project.entity.SubmissionStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProjectSubmissionRepo extends JpaRepository<ProjectSubmissionEntity, Long> {

    // 1. Find all submissions by a specific user
    List<ProjectSubmissionEntity> findByUserId(Long userId);

    // 2. Find user's submission for a specific project
    // Returns Optional (may not exist if user hasn't started project)
    Optional<ProjectSubmissionEntity> findByUserIdAndProjectId(Long userId, Long projectId);

    // 3. Find all submissions for a specific project (all users)
    List<ProjectSubmissionEntity> findByProjectId(Long projectId);

    // 4. Find submissions by status
    List<ProjectSubmissionEntity> findByStatus(SubmissionStatus status);

    // 5. Find all public submissions (for showcase page)
    List<ProjectSubmissionEntity> findByIsPublicTrue();

    // 6. Find public submissions for a specific project
    List<ProjectSubmissionEntity> findByProjectIdAndIsPublicTrue(Long projectId);

    // 7. Find submissions waiting for review
    @Query("SELECT s FROM ProjectSubmissionEntity s WHERE s.status IN ('SUBMITTED', 'UNDER_REVIEW')")
    List<ProjectSubmissionEntity> findSubmissionsNeedingReview();

    // 8. Find user's completed projects (for calculating total XP)
    List<ProjectSubmissionEntity> findByUserIdAndStatus(Long userId, SubmissionStatus status);

    // 9. Count completed submissions by user
    @Query("SELECT COUNT(s) FROM ProjectSubmissionEntity s WHERE s.userId = :userId AND s.status = 'COMPLETED'")
    Long countCompletedByUserId(@Param("userId") Long userId);

    // 10. Get user's total earned XP from projects
    @Query("SELECT COALESCE(SUM(s.xpEarned), 0) FROM ProjectSubmissionEntity s WHERE s.userId = :userId AND s.status = 'COMPLETED'")
    Integer getTotalXpByUserId(@Param("userId") Long userId);
}
