package com.skillsphere.backend.project.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "project_submissions")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProjectSubmissionEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // RELATIONSHIPS
    @Column(nullable = false)
    private Long projectId;  // Which project/quest they're attempting

    @Column(nullable = false)
    private Long userId;  // Who is submitting

    // SUBMISSION CONTENT
    @Column(length = 500)
    private String githubUrl;  // GitHub repository link

    @Column(length = 500)
    private String liveUrl;  // Deployed app URL (Vercel, Netlify, etc.)

    @Column(columnDefinition = "TEXT")
    private String codeSnippet;  // For coding challenges (paste code directly)

    @Column(columnDefinition = "TEXT")
    private String description;  // Student's explanation of their work

    // STATUS & PROGRESS
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    @Builder.Default  // Set default value when using builder
    private SubmissionStatus status = SubmissionStatus.NOT_STARTED;

    // PRIVACY CONTROL
    @Column(nullable = false)
    @Builder.Default
    private Boolean isPublic = false;  // If true, peers can see in showcase

    // GRADING & FEEDBACK
    private Integer xpEarned;  // Actual XP awarded (may differ from project.xpReward if bonuses applied)

    @Column(columnDefinition = "TEXT")
    private String feedbackText;  // Mentor/reviewer comments

    private Long reviewerId;  // Who reviewed this submission (mentor user ID)

    // TIMESTAMPS - Track the journey
    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime createdAt;  // When submission record was created

    private LocalDateTime startedAt;  // When user clicked "Start Project"

    private LocalDateTime submittedAt;  // When user clicked "Submit for Review"

    private LocalDateTime reviewedAt;  // When reviewer provided feedback

    private LocalDateTime completedAt;  // When marked as COMPLETED
}
