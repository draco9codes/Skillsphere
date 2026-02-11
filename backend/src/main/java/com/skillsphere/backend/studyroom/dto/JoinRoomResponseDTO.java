package com.skillsphere.backend.studyroom.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Response after joining a room
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class JoinRoomResponseDTO {
    private Long roomId;
    private Long membershipId;  // RoomMember ID
    private String message;     // "Successfully joined [Room Name]"
}
