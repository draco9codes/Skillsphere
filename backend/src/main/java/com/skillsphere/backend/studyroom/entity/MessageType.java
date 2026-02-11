package com.skillsphere.backend.studyroom.entity;

public enum MessageType {
    TEXT,         // Regular user message
    ANNOUNCEMENT, // Important message from creator (highlighted in UI)
    SYSTEM        // Auto-generated: "User X joined", "Room started"
}
