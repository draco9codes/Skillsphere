package com.skillsphere.backend.studyroom.mapper;

import com.skillsphere.backend.studyroom.dto.RoomMemberDTO;
import com.skillsphere.backend.studyroom.entity.RoomMemberEntity;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class RoomMemberMapper {

    /**
     * Convert entity to DTO
     */
    public RoomMemberDTO toDTO(RoomMemberEntity entity) {
        if (entity == null) return null;

        return RoomMemberDTO.builder()
                .id(entity.getId())
                .roomId(entity.getRoomId())
                .userId(entity.getUserId())
                .username("User" + entity.getUserId()) // TODO: Get from User table
                .userRole("STUDENT") // TODO: Get from User table
                .roomRole(entity.getRole())
                .isActive(entity.getIsActive())
                .totalStudyTime(entity.getTotalStudyTime())
                .joinedAt(entity.getJoinedAt())
                .leftAt(entity.getLeftAt())
                .build();
    }

    /**
     * Convert list of entities to DTOs
     */
    public List<RoomMemberDTO> toDTOList(List<RoomMemberEntity> entities) {
        if (entities == null) return List.of();
        return entities.stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    /**
     * Create new membership entity
     */
    public RoomMemberEntity createMembership(
            Long roomId, 
            Long userId, 
            com.skillsphere.backend.studyroom.entity.RoomMemberRole role
    ) {
        return RoomMemberEntity.builder()
                .roomId(roomId)
                .userId(userId)
                .role(role)
                .isActive(true)
                .totalStudyTime(0)
                .build();
    }
}
