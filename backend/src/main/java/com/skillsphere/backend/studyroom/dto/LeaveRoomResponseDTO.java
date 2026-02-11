package com.skillsphere.backend.studyroom.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Response after leaving a room
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LeaveRoomResponseDTO {
    private Long roomId;
    private Integer studyTimeMinutes;  // How long user was in room
    private String message;            // "You left [Room Name]. Study time: 45 minutes"
}
