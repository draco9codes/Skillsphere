package com.skillsphere.backend.studyroom.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * User's study rooms statistics
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MyRoomsStatsDTO {
    private Long roomsCreated;      // Rooms user created
    private Long roomsJoined;       // Rooms user is member of
    private Long activeRooms;       // Currently active memberships
    private Integer totalStudyTime; // Total minutes across all rooms
    private Long totalMessages;     // Total messages posted
}
