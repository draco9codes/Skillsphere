package com.skillsphere.backend.studyroom.mapper;

import com.skillsphere.backend.studyroom.dto.PostMessageRequestDTO;
import com.skillsphere.backend.studyroom.dto.RoomMessageDTO;
import com.skillsphere.backend.studyroom.entity.MessageType;
import com.skillsphere.backend.studyroom.entity.RoomMessageEntity;
import com.skillsphere.backend.studyroom.repo.RoomMemberRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class RoomMessageMapper {

    private final RoomMemberRepo roomMemberRepo;

    /**
     * Convert entity to DTO
     */
    public RoomMessageDTO toDTO(RoomMessageEntity entity, Long currentUserId) {
        if (entity == null) return null;

        // Determine if current user can delete this message
        boolean canDelete = false;
        if (currentUserId != null) {
            // User can delete their own message
            canDelete = entity.getUserId().equals(currentUserId);
            
            // OR if user is creator of the room
            if (!canDelete) {
                canDelete = roomMemberRepo.isUserCreatorOfRoom(entity.getRoomId(), currentUserId);
            }
        }

        return RoomMessageDTO.builder()
                .id(entity.getId())
                .roomId(entity.getRoomId())
                .userId(entity.getUserId())
                .username("User" + entity.getUserId()) // TODO: Get from User table
                .userRole("STUDENT") // TODO: Get from User table
                .message(entity.getMessage())
                .messageType(entity.getMessageType())
                .isDeleted(entity.getIsDeleted())
                .canDelete(canDelete)
                .createdAt(entity.getCreatedAt())
                .updatedAt(entity.getUpdatedAt())
                .build();
    }

    /**
     * Convert list of entities to DTOs
     */
    public List<RoomMessageDTO> toDTOList(List<RoomMessageEntity> entities, Long currentUserId) {
        if (entities == null) return List.of();
        return entities.stream()
                .map(entity -> toDTO(entity, currentUserId))
                .collect(Collectors.toList());
    }

    /**
     * Convert request DTO to entity
     */
    public RoomMessageEntity toEntity(PostMessageRequestDTO dto, Long roomId, Long userId) {
        if (dto == null) return null;

        return RoomMessageEntity.builder()
                .roomId(roomId)
                .userId(userId)
                .message(dto.getMessage())
                .messageType(dto.getMessageType())
                .isDeleted(false)
                .build();
    }

    /**
     * Create system message (user joined, room started, etc.)
     */
    public RoomMessageEntity createSystemMessage(Long roomId, String message) {
        return RoomMessageEntity.builder()
                .roomId(roomId)
                .userId(0L) // System user ID
                .message(message)
                .messageType(MessageType.SYSTEM)
                .isDeleted(false)
                .build();
    }
}
