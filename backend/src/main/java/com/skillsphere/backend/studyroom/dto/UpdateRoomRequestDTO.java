package com.skillsphere.backend.studyroom.dto;

import com.skillsphere.backend.studyroom.entity.RoomStatus;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

/**
 * Request body for updating room info (creator only)
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UpdateRoomRequestDTO {
    
    @Size(min = 3, max = 200, message = "Room name must be between 3 and 200 characters")
    private String name;
    
    @Size(max = 2000, message = "Description cannot exceed 2000 characters")
    private String description;
    
    private RoomStatus status;  // ACTIVE, CLOSED, etc.
    
    private Integer maxParticipants;
    private Boolean isPublic;
    
    // Update schedule
    private LocalDateTime scheduledStart;
    private LocalDateTime scheduledEnd;
}
