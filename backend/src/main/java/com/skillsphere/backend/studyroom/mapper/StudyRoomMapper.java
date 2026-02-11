package com.skillsphere.backend.studyroom.mapper;

import com.skillsphere.backend.studyroom.dto.*;
import com.skillsphere.backend.studyroom.entity.StudyRoomEntity;
import com.skillsphere.backend.studyroom.entity.RoomStatus;
import com.skillsphere.backend.studyroom.repo.RoomMemberRepo;
import com.skillsphere.backend.studyroom.repo.RoomMessageRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class StudyRoomMapper {

    private final RoomMemberRepo roomMemberRepo;
    private final RoomMessageRepo roomMessageRepo;
    // TODO: Will need UserRepo to get username - add later

    /**
     * Convert entity to basic DTO (for list views)
     */
    public StudyRoomDTO toDTO(StudyRoomEntity entity) {
        if (entity == null) return null;

        // Calculate stats
        Long currentParticipants = roomMemberRepo.countActiveMembersByRoom(entity.getId());
        Long totalMessages = roomMessageRepo.countByRoomIdAndIsDeletedFalse(entity.getId());
        
        // Check if room has space
        Boolean hasSpace = entity.getMaxParticipants() == null 
            || currentParticipants < entity.getMaxParticipants();

        return StudyRoomDTO.builder()
                .id(entity.getId())
                .name(entity.getName())
                .description(entity.getDescription())
                .roomType(entity.getRoomType())
                .status(entity.getStatus())
                .topic(entity.getTopic())
                .category(entity.getCategory())
                .skillTreeId(entity.getSkillTreeId())
                .createdByUserId(entity.getCreatedByUserId())
                .createdByUsername("User" + entity.getCreatedByUserId()) // TODO: Get from User table
                .maxParticipants(entity.getMaxParticipants())
                .isPublic(entity.getIsPublic())
                .currentParticipants(currentParticipants)
                .totalMessages(totalMessages)
                .hasSpace(hasSpace)
                .scheduledStart(entity.getScheduledStart())
                .scheduledEnd(entity.getScheduledEnd())
                .actualStart(entity.getActualStart())
                .createdAt(entity.getCreatedAt())
                .updatedAt(entity.getUpdatedAt())
                .build();
    }

    /**
     * Convert entity to detailed DTO (for detail page)
     */
    public StudyRoomDetailDTO toDetailDTO(
            StudyRoomEntity entity, 
            List<RoomMemberDTO> activeMembers,
            List<RoomMessageDTO> recentMessages,
            Long currentUserId
    ) {
        if (entity == null) return null;

        StudyRoomDTO roomInfo = toDTO(entity);

        // Check if current user is member/creator
        Boolean isUserMember = false;
        Boolean isUserCreator = false;
        Integer userStudyTime = 0;

        if (currentUserId != null) {
            var membershipOpt = roomMemberRepo.findByRoomIdAndUserId(entity.getId(), currentUserId);
            if (membershipOpt.isPresent()) {
                var membership = membershipOpt.get();
                isUserMember = membership.getIsActive();
                isUserCreator = roomMemberRepo.isUserCreatorOfRoom(entity.getId(), currentUserId);
                userStudyTime = membership.getTotalStudyTime();
            }
        }

        return StudyRoomDetailDTO.builder()
                .roomInfo(roomInfo)
                .activeMembers(activeMembers)
                .recentMessages(recentMessages)
                .isUserMember(isUserMember)
                .isUserCreator(isUserCreator)
                .userStudyTime(userStudyTime)
                .build();
    }

    /**
     * Convert list of entities to DTOs
     */
    public List<StudyRoomDTO> toDTOList(List<StudyRoomEntity> entities) {
        if (entities == null) return List.of();
        return entities.stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    /**
     * Convert CreateRoomRequestDTO to entity
     */
    public StudyRoomEntity toEntity(CreateRoomRequestDTO dto, Long creatorUserId) {
        if (dto == null) return null;

        // Determine initial status
        RoomStatus status = RoomStatus.ACTIVE;
        if (dto.getScheduledStart() != null) {
            status = RoomStatus.SCHEDULED;
        }

        return StudyRoomEntity.builder()
                .name(dto.getName())
                .description(dto.getDescription())
                .roomType(dto.getRoomType())
                .status(status)
                .topic(dto.getTopic())
                .category(dto.getCategory())
                .skillTreeId(dto.getSkillTreeId())
                .createdByUserId(creatorUserId)
                .isPublic(dto.getIsPublic())
                .maxParticipants(dto.getMaxParticipants())
                .scheduledStart(dto.getScheduledStart())
                .scheduledEnd(dto.getScheduledEnd())
                .build();
    }

    /**
     * Update entity from UpdateRoomRequestDTO
     */
    public void updateEntityFromDTO(StudyRoomEntity entity, UpdateRoomRequestDTO dto) {
        if (dto == null) return;

        if (dto.getName() != null) {
            entity.setName(dto.getName());
        }
        if (dto.getDescription() != null) {
            entity.setDescription(dto.getDescription());
        }
        if (dto.getStatus() != null) {
            entity.setStatus(dto.getStatus());
        }
        if (dto.getMaxParticipants() != null) {
            entity.setMaxParticipants(dto.getMaxParticipants());
        }
        if (dto.getIsPublic() != null) {
            entity.setIsPublic(dto.getIsPublic());
        }
        if (dto.getScheduledStart() != null) {
            entity.setScheduledStart(dto.getScheduledStart());
        }
        if (dto.getScheduledEnd() != null) {
            entity.setScheduledEnd(dto.getScheduledEnd());
        }
    }
}
