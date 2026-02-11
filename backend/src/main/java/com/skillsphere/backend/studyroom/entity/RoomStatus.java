package com.skillsphere.backend.studyroom.entity;

public enum RoomStatus {
    SCHEDULED,   // Teaching room scheduled for future
    ACTIVE,      // Currently running/open
    CLOSED,      // Manually closed by creator
    ARCHIVED     // Automatically archived after inactivity
}
