package com.skillsphere.backend.studyroom.mapper;

import com.skillsphere.backend.studyroom.dto.MyRoomsDashboardDTO;
import com.skillsphere.backend.studyroom.dto.MyRoomsStatsDTO;
import com.skillsphere.backend.studyroom.dto.StudyRoomDTO;
import com.skillsphere.backend.studyroom.entity.RoomMemberEntity;
import com.skillsphere.backend.studyroom.entity.StudyRoomEntity;
import com.skillsphere.backend.studyroom.repo.RoomMemberRepo;
import com.skillsphere.backend.studyroom.repo.RoomMessageRepo;
import com.skillsphere.backend.studyroom.repo.StudyRoomRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class MyRoomsMapper {

    private final RoomMemberRepo roomMemberRepo;
    private final RoomMessageRepo roomMessageRepo;
    private final StudyRoomRepo studyRoomRepo;
    private final StudyRoomMapper studyRoomMapper;

    /**
     * Create stats DTO for user
     */
    public MyRoomsStatsDTO createStatsDTO(Long userId) {
        Long roomsCreated = roomMemberRepo.countByUserId(userId); // Count created by checking CREATOR role
        Long roomsJoined = roomMemberRepo.countByUserId(userId);
        Long activeRooms = roomMemberRepo.countByUserIdAndIsActiveTrue(userId);
        Integer totalStudyTime = roomMemberRepo.getTotalStudyTimeByUser(userId);
        Long totalMessages = roomMessageRepo.countByUserIdAndIsDeletedFalse(userId);

        return MyRoomsStatsDTO.builder()
                .roomsCreated(roomsCreated)
                .roomsJoined(roomsJoined)
                .activeRooms(activeRooms)
                .totalStudyTime(totalStudyTime)
                .totalMessages(totalMessages)
                .build();
    }

    /**
     * Create full dashboard DTO
     */
    public MyRoomsDashboardDTO createDashboardDTO(Long userId) {
        // Get stats
        MyRoomsStatsDTO stats = createStatsDTO(userId);

        // Get rooms created by user
        List<RoomMemberEntity> createdMemberships = roomMemberRepo.findRoomsCreatedByUser(userId);
        List<StudyRoomEntity> createdEntities = createdMemberships.stream()
                .map(m -> studyRoomRepo.findById(m.getRoomId()).orElse(null))
                .filter(r -> r != null)
                .collect(Collectors.toList());
        List<StudyRoomDTO> roomsCreated = studyRoomMapper.toDTOList(createdEntities);

        // Get rooms joined by user (excluding created ones)
        List<RoomMemberEntity> joinedMemberships = roomMemberRepo.findByUserIdAndIsActiveTrue(userId);
        List<StudyRoomEntity> joinedEntities = joinedMemberships.stream()
                .filter(m -> !m.getRole().equals(com.skillsphere.backend.studyroom.entity.RoomMemberRole.CREATOR))
                .map(m -> studyRoomRepo.findById(m.getRoomId()).orElse(null))
                .filter(r -> r != null)
                .collect(Collectors.toList());
        List<StudyRoomDTO> roomsJoined = studyRoomMapper.toDTOList(joinedEntities);

        return MyRoomsDashboardDTO.builder()
                .stats(stats)
                .roomsCreated(roomsCreated)
                .roomsJoined(roomsJoined)
                .build();
    }
}
