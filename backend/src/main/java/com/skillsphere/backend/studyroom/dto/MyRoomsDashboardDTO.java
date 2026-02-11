package com.skillsphere.backend.studyroom.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

/**
 * Complete dashboard data for "My Rooms" page
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MyRoomsDashboardDTO {
    private MyRoomsStatsDTO stats;
    private List<StudyRoomDTO> roomsCreated;
    private List<StudyRoomDTO> roomsJoined;
}
