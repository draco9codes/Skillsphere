package com.skillsphere.backend.studyroom.dto;

import com.skillsphere.backend.studyroom.entity.RoomMemberRole;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

/**
 * Member info for member lists
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RoomMemberDTO {
    private Long id;
    private Long roomId;
    
    // User info
    private Long userId;
    private String username;
    private String userRole;  // STUDENT, MENTOR (from User entity)
    
    // Member role in room
    private RoomMemberRole roomRole;  // CREATOR, MODERATOR, MEMBER
    
    // Activity
    private Boolean isActive;
    private Integer totalStudyTime;  // Minutes
    
    // Timestamps
    private LocalDateTime joinedAt;
    private LocalDateTime leftAt;
}
