package com.skillsphere.backend.studyroom.service;

import com.skillsphere.backend.studyroom.dto.*;
import com.skillsphere.backend.studyroom.entity.*;
import com.skillsphere.backend.studyroom.mapper.*;
import com.skillsphere.backend.studyroom.repo.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class StudyRoomService {

    // Repositories
    private final StudyRoomRepo studyRoomRepo;
    private final RoomMemberRepo roomMemberRepo;
    private final RoomMessageRepo roomMessageRepo;

    // Mappers
    private final StudyRoomMapper studyRoomMapper;
    private final RoomMemberMapper roomMemberMapper;
    private final RoomMessageMapper roomMessageMapper;
    private final MyRoomsMapper myRoomsMapper;

    // TODO: Add UserRepo to check user roles

    // ========================================
    // BROWSE & SEARCH ROOMS
    // ========================================

    /**
     * Get all active public rooms
     */
    public List<StudyRoomDTO> getAllActiveRooms() {
        log.info("Fetching all active public rooms");
        List<StudyRoomEntity> rooms = studyRoomRepo.findActivePublicRooms();
        return studyRoomMapper.toDTOList(rooms);
    }

    /**
     * Filter rooms by type
     */
    public List<StudyRoomDTO> getRoomsByType(RoomType roomType) {
        log.info("Fetching rooms by type: {}", roomType);
        List<StudyRoomEntity> rooms = studyRoomRepo.findByStatusAndRoomType(RoomStatus.ACTIVE, roomType);
        return studyRoomMapper.toDTOList(rooms);
    }

    /**
     * Filter rooms by topic/category
     */
    public List<StudyRoomDTO> getRoomsByTopic(String topic) {
        log.info("Fetching rooms by topic: {}", topic);
        List<StudyRoomEntity> rooms = studyRoomRepo.findByTopic(topic);
        return studyRoomMapper.toDTOList(rooms);
    }

    /**
     * Get rooms with available space
     */
    public List<StudyRoomDTO> getRoomsWithSpace() {
        log.info("Fetching rooms with available space");
        List<StudyRoomEntity> rooms = studyRoomRepo.findRoomsWithSpace();
        return studyRoomMapper.toDTOList(rooms);
    }

    /**
     * Search rooms by keyword
     */
    public List<StudyRoomDTO> searchRooms(String keyword) {
        log.info("Searching rooms with keyword: {}", keyword);
        List<StudyRoomEntity> rooms = studyRoomRepo.searchRooms(keyword);
        return studyRoomMapper.toDTOList(rooms);
    }

    /**
     * Get upcoming teaching rooms (scheduled but not started)
     */
    public List<StudyRoomDTO> getUpcomingTeachingRooms() {
        log.info("Fetching upcoming teaching rooms");
        List<StudyRoomEntity> rooms = studyRoomRepo.findUpcomingTeachingRooms(LocalDateTime.now());
        return studyRoomMapper.toDTOList(rooms);
    }

    // ========================================
    // GET ROOM DETAILS
    // ========================================

    /**
     * Get detailed room information
     */
    public StudyRoomDetailDTO getRoomDetail(Long roomId, Long currentUserId) {
        log.info("Fetching room detail for roomId: {}, userId: {}", roomId, currentUserId);

        // Get room entity
        StudyRoomEntity room = studyRoomRepo.findById(roomId)
                .orElseThrow(() -> new RuntimeException("Room not found with id: " + roomId));

        // Get active members
        List<RoomMemberEntity> memberEntities = roomMemberRepo.findByRoomIdAndIsActiveTrue(roomId);
        List<RoomMemberDTO> members = roomMemberMapper.toDTOList(memberEntities);

        // Get recent messages (last 50)
        List<RoomMessageEntity> messageEntities = roomMessageRepo.findRecentMessages(roomId, 50);
        List<RoomMessageDTO> messages = roomMessageMapper.toDTOList(messageEntities, currentUserId);

        return studyRoomMapper.toDetailDTO(room, members, messages, currentUserId);
    }

    // ========================================
    // CREATE ROOM
    // ========================================

    /**
     * Create a new study room
     * Validates user permissions based on room type
     */
    @Transactional
    public StudyRoomDTO createRoom(CreateRoomRequestDTO request, Long creatorUserId) {
        log.info("Creating new room: {} by user: {}", request.getName(), creatorUserId);

        // TODO: Validate user role
        // If roomType = TEACHING, check if user is MENTOR
        // For now, we'll allow creation

        // Create room entity
        StudyRoomEntity room = studyRoomMapper.toEntity(request, creatorUserId);

        // If teaching room with schedule, keep status as SCHEDULED
        // Otherwise set to ACTIVE
        if (room.getRoomType() == RoomType.TEACHING && room.getScheduledStart() != null) {
            room.setStatus(RoomStatus.SCHEDULED);
        } else {
            room.setStatus(RoomStatus.ACTIVE);
            room.setActualStart(LocalDateTime.now());
        }

        // Save room
        StudyRoomEntity savedRoom = studyRoomRepo.save(room);
        log.info("Room created with id: {}", savedRoom.getId());

        // Add creator as member with CREATOR role
        RoomMemberEntity creatorMember = roomMemberMapper.createMembership(
                savedRoom.getId(),
                creatorUserId,
                RoomMemberRole.CREATOR
        );
        roomMemberRepo.save(creatorMember);
        log.info("Creator added as member");

        // Create system message
        RoomMessageEntity systemMessage = roomMessageMapper.createSystemMessage(
                savedRoom.getId(),
                "Room created and ready for collaboration!"
        );
        roomMessageRepo.save(systemMessage);

        return studyRoomMapper.toDTO(savedRoom);
    }

    // ========================================
    // JOIN ROOM
    // ========================================

    /**
     * Join a room
     * Validates room capacity and user eligibility
     */
    @Transactional
    public JoinRoomResponseDTO joinRoom(Long roomId, Long userId) {
        log.info("User {} attempting to join room {}", userId, roomId);

        // Check if room exists
        StudyRoomEntity room = studyRoomRepo.findById(roomId)
                .orElseThrow(() -> new RuntimeException("Room not found with id: " + roomId));

        // Validate room is joinable
        if (room.getStatus() == RoomStatus.CLOSED || room.getStatus() == RoomStatus.ARCHIVED) {
            throw new RuntimeException("Cannot join a closed or archived room");
        }

        // Check if already a member
        var existingMembership = roomMemberRepo.findByRoomIdAndUserId(roomId, userId);
        if (existingMembership.isPresent()) {
            RoomMemberEntity membership = existingMembership.get();
            if (membership.getIsActive()) {
                throw new RuntimeException("You are already a member of this room");
            } else {
                // Rejoin - reactivate membership
                membership.setIsActive(true);
                membership.setLeftAt(null);
                roomMemberRepo.save(membership);
                log.info("User {} rejoined room {}", userId, roomId);

                // System message
                RoomMessageEntity systemMessage = roomMessageMapper.createSystemMessage(
                        roomId,
                        "User" + userId + " rejoined the room"
                );
                roomMessageRepo.save(systemMessage);

                return JoinRoomResponseDTO.builder()
                        .roomId(roomId)
                        .membershipId(membership.getId())
                        .message("Welcome back to " + room.getName() + "!")
                        .build();
            }
        }

        // Check room capacity
        Long currentCount = roomMemberRepo.countActiveMembersByRoom(roomId);
        if (room.getMaxParticipants() != null && currentCount >= room.getMaxParticipants()) {
            throw new RuntimeException("Room is full. Max capacity: " + room.getMaxParticipants());
        }

        // Create new membership
        RoomMemberEntity newMember = roomMemberMapper.createMembership(roomId, userId, RoomMemberRole.MEMBER);
        RoomMemberEntity savedMember = roomMemberRepo.save(newMember);
        log.info("User {} joined room {} successfully", userId, roomId);

        // System message
        RoomMessageEntity systemMessage = roomMessageMapper.createSystemMessage(
                roomId,
                "User" + userId + " joined the room"
        );
        roomMessageRepo.save(systemMessage);

        return JoinRoomResponseDTO.builder()
                .roomId(roomId)
                .membershipId(savedMember.getId())
                .message("Successfully joined " + room.getName() + "!")
                .build();
    }

    // ========================================
    // LEAVE ROOM
    // ========================================

    /**
     * Leave a room
     * Marks membership as inactive
     */
    @Transactional
    public LeaveRoomResponseDTO leaveRoom(Long roomId, Long userId) {
        log.info("User {} attempting to leave room {}", userId, roomId);

        // Check if room exists
        StudyRoomEntity room = studyRoomRepo.findById(roomId)
                .orElseThrow(() -> new RuntimeException("Room not found with id: " + roomId));

        // Check if user is member
        RoomMemberEntity membership = roomMemberRepo.findByRoomIdAndUserId(roomId, userId)
                .orElseThrow(() -> new RuntimeException("You are not a member of this room"));

        if (!membership.getIsActive()) {
            throw new RuntimeException("You have already left this room");
        }

        // Cannot leave if creator (must close room instead)
        if (membership.getRole() == RoomMemberRole.CREATOR) {
            throw new RuntimeException("Room creator cannot leave. Please close the room instead.");
        }

        // Mark as inactive
        membership.setIsActive(false);
        membership.setLeftAt(LocalDateTime.now());
        roomMemberRepo.save(membership);
        log.info("User {} left room {} successfully", userId, roomId);

        // System message
        RoomMessageEntity systemMessage = roomMessageMapper.createSystemMessage(
                roomId,
                "User" + userId + " left the room"
        );
        roomMessageRepo.save(systemMessage);

        return LeaveRoomResponseDTO.builder()
                .roomId(roomId)
                .studyTimeMinutes(membership.getTotalStudyTime())
                .message("You left " + room.getName() + ". Study time: " + membership.getTotalStudyTime() + " minutes")
                .build();
    }

    // ========================================
    // POST MESSAGE
    // ========================================

    /**
     * Post a message in a room
     * User must be an active member
     */
    @Transactional
    public RoomMessageDTO postMessage(Long roomId, PostMessageRequestDTO request, Long userId) {
        log.info("User {} posting message in room {}", userId, roomId);

        // Check if room exists and is active
        StudyRoomEntity room = studyRoomRepo.findById(roomId)
                .orElseThrow(() -> new RuntimeException("Room not found with id: " + roomId));

        if (room.getStatus() != RoomStatus.ACTIVE) {
            throw new RuntimeException("Cannot post messages in a non-active room");
        }

        // Check if user is active member
        boolean isActiveMember = roomMemberRepo.existsByRoomIdAndUserIdAndIsActiveTrue(roomId, userId);
        if (!isActiveMember) {
            throw new RuntimeException("You must be an active member to post messages");
        }

        // Create message
        RoomMessageEntity message = roomMessageMapper.toEntity(request, roomId, userId);
        RoomMessageEntity savedMessage = roomMessageRepo.save(message);
        log.info("Message posted with id: {}", savedMessage.getId());

        return roomMessageMapper.toDTO(savedMessage, userId);
    }

    /**
     * Get messages in a room
     */
    public List<RoomMessageDTO> getRoomMessages(Long roomId, Long currentUserId) {
        log.info("Fetching messages for room: {}", roomId);

        // Check if room exists
        if (!studyRoomRepo.existsById(roomId)) {
            throw new RuntimeException("Room not found with id: " + roomId);
        }

        List<RoomMessageEntity> messages = roomMessageRepo.findByRoomIdAndIsDeletedFalseOrderByCreatedAtAsc(roomId);
        return roomMessageMapper.toDTOList(messages, currentUserId);
    }

    /**
     * Get messages since a timestamp (for polling)
     */
    public List<RoomMessageDTO> getMessagesSince(Long roomId, LocalDateTime since, Long currentUserId) {
        log.info("Fetching messages for room {} since {}", roomId, since);
        List<RoomMessageEntity> messages = roomMessageRepo.findMessagesSince(roomId, since);
        return roomMessageMapper.toDTOList(messages, currentUserId);
    }

    // ========================================
    // DELETE MESSAGE
    // ========================================

    /**
     * Delete a message
     * Only creator or message author can delete
     */
    @Transactional
    public void deleteMessage(Long messageId, Long userId) {
        log.info("User {} attempting to delete message {}", userId, messageId);

        // Get message
        RoomMessageEntity message = roomMessageRepo.findById(messageId)
                .orElseThrow(() -> new RuntimeException("Message not found with id: " + messageId));

        // Check permissions
        boolean isAuthor = message.getUserId().equals(userId);
        boolean isCreator = roomMemberRepo.isUserCreatorOfRoom(message.getRoomId(), userId);

        if (!isAuthor && !isCreator) {
            throw new RuntimeException("You don't have permission to delete this message");
        }

        // Soft delete
        message.setIsDeleted(true);
        roomMessageRepo.save(message);
        log.info("Message {} deleted successfully", messageId);
    }

    // ========================================
    // UPDATE ROOM
    // ========================================

    /**
     * Update room information
     * Only creator can update
     */
    @Transactional
    public StudyRoomDTO updateRoom(Long roomId, UpdateRoomRequestDTO request, Long userId) {
        log.info("User {} attempting to update room {}", userId, roomId);

        // Get room
        StudyRoomEntity room = studyRoomRepo.findById(roomId)
                .orElseThrow(() -> new RuntimeException("Room not found with id: " + roomId));

        // Check if user is creator
        boolean isCreator = roomMemberRepo.isUserCreatorOfRoom(roomId, userId);
        if (!isCreator) {
            throw new RuntimeException("Only room creator can update room information");
        }

        // Update fields
        studyRoomMapper.updateEntityFromDTO(room, request);
        StudyRoomEntity updatedRoom = studyRoomRepo.save(room);
        log.info("Room {} updated successfully", roomId);

        return studyRoomMapper.toDTO(updatedRoom);
    }

    /**
     * Close a room
     * Only creator can close
     */
    @Transactional
    public StudyRoomDTO closeRoom(Long roomId, Long userId) {
        log.info("User {} attempting to close room {}", userId, roomId);

        // Get room
        StudyRoomEntity room = studyRoomRepo.findById(roomId)
                .orElseThrow(() -> new RuntimeException("Room not found with id: " + roomId));

        // Check if user is creator
        boolean isCreator = roomMemberRepo.isUserCreatorOfRoom(roomId, userId);
        if (!isCreator) {
            throw new RuntimeException("Only room creator can close the room");
        }

        // Update status
        room.setStatus(RoomStatus.CLOSED);
        StudyRoomEntity closedRoom = studyRoomRepo.save(room);
        log.info("Room {} closed successfully", roomId);

        // System message
        RoomMessageEntity systemMessage = roomMessageMapper.createSystemMessage(
                roomId,
                "Room has been closed by the creator"
        );
        roomMessageRepo.save(systemMessage);

        return studyRoomMapper.toDTO(closedRoom);
    }

    // ========================================
    // MY ROOMS DASHBOARD
    // ========================================

    /**
     * Get user's rooms dashboard
     */
    public MyRoomsDashboardDTO getMyRoomsDashboard(Long userId) {
        log.info("Fetching dashboard for user: {}", userId);
        return myRoomsMapper.createDashboardDTO(userId);
    }

    /**
     * Get rooms created by user
     */
    public List<StudyRoomDTO> getMyCreatedRooms(Long userId) {
        log.info("Fetching rooms created by user: {}", userId);
        List<StudyRoomEntity> rooms = studyRoomRepo.findByCreatedByUserId(userId);
        return studyRoomMapper.toDTOList(rooms);
    }

    /**
     * Get rooms user has joined
     */
    public List<StudyRoomDTO> getMyJoinedRooms(Long userId) {
        log.info("Fetching rooms joined by user: {}", userId);
        
        // Get active memberships
        List<RoomMemberEntity> memberships = roomMemberRepo.findByUserIdAndIsActiveTrue(userId);
        
        // Get room entities
        List<StudyRoomEntity> rooms = memberships.stream()
                .map(m -> studyRoomRepo.findById(m.getRoomId()).orElse(null))
                .filter(r -> r != null)
                .toList();
        
        return studyRoomMapper.toDTOList(rooms);
    }
}
