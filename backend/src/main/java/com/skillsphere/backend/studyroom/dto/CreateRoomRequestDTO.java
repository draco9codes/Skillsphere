package com.skillsphere.backend.studyroom.dto;

import com.skillsphere.backend.studyroom.entity.RoomType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

/**
 * Request body for creating a new room
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CreateRoomRequestDTO {
    
    @NotBlank(message = "Room name is required")
    @Size(min = 3, max = 200, message = "Room name must be between 3 and 200 characters")
    private String name;
    
    @Size(max = 2000, message = "Description cannot exceed 2000 characters")
    private String description;
    
    @NotNull(message = "Room type is required")
    private RoomType roomType;  // TEACHING or DISCUSSION
    
    private String topic;
    private String category;
    private Long skillTreeId;
    
    private Integer maxParticipants;  // null = unlimited
    
    @Builder.Default
    private Boolean isPublic = true;
    
    // For TEACHING rooms
    private LocalDateTime scheduledStart;
    private LocalDateTime scheduledEnd;
}
