package com.skillsphere.backend.studyroom.dto;

import com.skillsphere.backend.studyroom.entity.RoomStatus;
import com.skillsphere.backend.studyroom.entity.RoomType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

/**
 * Basic room info for list views (browse page)
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class StudyRoomDTO {
    private Long id;
    private String name;
    private String description;
    private RoomType roomType;
    private RoomStatus status;
    
    // Categorization
    private String topic;
    private String category;
    private Long skillTreeId;
    
    // Creator info
    private Long createdByUserId;
    private String createdByUsername;  // Joined from User table
    
    // Capacity
    private Integer maxParticipants;
    private Boolean isPublic;
    
    // Stats (calculated)
    private Long currentParticipants;  // Count of active members
    private Long totalMessages;        // Count of messages
    private Boolean hasSpace;          // true if room not full
    
    // Scheduling
    private LocalDateTime scheduledStart;
    private LocalDateTime scheduledEnd;
    private LocalDateTime actualStart;
    
    // Timestamps
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
