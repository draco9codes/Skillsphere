package com.skillsphere.backend.studyroom.dto;

import com.skillsphere.backend.studyroom.entity.MessageType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

/**
 * Message info for message board
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RoomMessageDTO {
    private Long id;
    private Long roomId;
    
    // Sender info
    private Long userId;
    private String username;
    private String userRole;  // STUDENT, MENTOR
    
    // Message content
    private String message;
    private MessageType messageType;
    
    // Status
    private Boolean isDeleted;
    
    // Permissions (for UI)
    private Boolean canDelete;  // Can current user delete this?
    
    // Timestamps
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
