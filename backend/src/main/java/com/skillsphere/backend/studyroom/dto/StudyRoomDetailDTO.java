package com.skillsphere.backend.studyroom.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

/**
 * Detailed room info for room detail page
 * Extends basic DTO and adds members list
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class StudyRoomDetailDTO {
    // Include all fields from StudyRoomDTO
    private StudyRoomDTO roomInfo;
    
    // Additional details
    private List<RoomMemberDTO> activeMembers;  // Current participants
    private List<RoomMessageDTO> recentMessages; // Last N messages
    
    // User-specific info (if logged in)
    private Boolean isUserMember;       // Is current user in this room?
    private Boolean isUserCreator;      // Is current user the creator?
    private Integer userStudyTime;      // User's time spent in this room
}
