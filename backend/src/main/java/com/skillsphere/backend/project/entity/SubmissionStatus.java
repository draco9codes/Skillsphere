package com.skillsphere.backend.project.entity;

public enum SubmissionStatus {
    NOT_STARTED,    // User hasn't begun (default state)
    IN_PROGRESS,    // User clicked "Start" but hasn't submitted
    SUBMITTED,      // Waiting for review
    UNDER_REVIEW,   // Reviewer is checking it
    COMPLETED,      // ✅ Approved! XP awarded
    REJECTED        // ❌ Needs revision
}
