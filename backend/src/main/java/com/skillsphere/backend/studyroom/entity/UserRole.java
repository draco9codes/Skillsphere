package com.skillsphere.backend.studyroom.entity;

public enum UserRole {
    STUDENT,   // Default role, can create discussion rooms
    MENTOR,    // Can create teaching rooms + discussion rooms
    ADMIN      // Full privileges (future use)
}
