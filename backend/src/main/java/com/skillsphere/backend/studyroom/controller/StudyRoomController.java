package com.skillsphere.backend.studyroom.controller;

import com.skillsphere.backend.studyroom.dto.*;
import com.skillsphere.backend.studyroom.entity.RoomType;
import com.skillsphere.backend.studyroom.service.StudyRoomService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/study-rooms")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:3000"})
public class StudyRoomController {

    private final StudyRoomService studyRoomService;

    // ========================================
    // BROWSE & SEARCH ROOMS
    // ========================================

    /**
     * GET /api/study-rooms
     * Get all active public rooms
     */
    @GetMapping
    public ResponseEntity<List<StudyRoomDTO>> getAllRooms(
            @RequestParam(required = false) String type,
            @RequestParam(required = false) String topic,
            @RequestParam(required = false) String search,
            @RequestParam(required = false) Boolean hasSpace
    ) {
        log.info("GET /api/study-rooms - type: {}, topic: {}, search: {}, hasSpace: {}", 
                type, topic, search, hasSpace);

        List<StudyRoomDTO> rooms;

        // Apply filters
        if (type != null) {
            RoomType roomType = RoomType.valueOf(type.toUpperCase());
            rooms = studyRoomService.getRoomsByType(roomType);
        } else if (topic != null) {
            rooms = studyRoomService.getRoomsByTopic(topic);
        } else if (search != null) {
            rooms = studyRoomService.searchRooms(search);
        } else if (hasSpace != null && hasSpace) {
            rooms = studyRoomService.getRoomsWithSpace();
        } else {
            rooms = studyRoomService.getAllActiveRooms();
        }

        return ResponseEntity.ok(rooms);
    }

    /**
     * GET /api/study-rooms/upcoming
     * Get upcoming teaching rooms (scheduled)
     */
    @GetMapping("/upcoming")
    public ResponseEntity<List<StudyRoomDTO>> getUpcomingRooms() {
        log.info("GET /api/study-rooms/upcoming");
        List<StudyRoomDTO> rooms = studyRoomService.getUpcomingTeachingRooms();
        return ResponseEntity.ok(rooms);
    }

    /**
     * GET /api/study-rooms/{id}
     * Get detailed room information
     */
    @GetMapping("/{id}")
    public ResponseEntity<StudyRoomDetailDTO> getRoomDetail(
            @PathVariable Long id,
            @RequestHeader(value = "X-User-Id", required = false) Long userId
    ) {
        log.info("GET /api/study-rooms/{} - userId: {}", id, userId);
        StudyRoomDetailDTO room = studyRoomService.getRoomDetail(id, userId);
        return ResponseEntity.ok(room);
    }

    // ========================================
    // CREATE ROOM
    // ========================================

    /**
     * POST /api/study-rooms
     * Create a new room
     * Requires authentication
     */
    @PostMapping
    public ResponseEntity<StudyRoomDTO> createRoom(
            @Valid @RequestBody CreateRoomRequestDTO request,
            @RequestHeader("X-User-Id") Long userId
    ) {
        log.info("POST /api/study-rooms - user: {}, room: {}", userId, request.getName());
        
        // TODO: Validate user role for TEACHING rooms
        // if (request.getRoomType() == RoomType.TEACHING) {
        //     check if user is MENTOR
        // }
        
        StudyRoomDTO room = studyRoomService.createRoom(request, userId);
        return ResponseEntity.status(HttpStatus.CREATED).body(room);
    }

    // ========================================
    // JOIN & LEAVE ROOM
    // ========================================

    /**
     * POST /api/study-rooms/{id}/join
     * Join a room
     * Requires authentication
     */
    @PostMapping("/{id}/join")
    public ResponseEntity<JoinRoomResponseDTO> joinRoom(
            @PathVariable Long id,
            @RequestHeader("X-User-Id") Long userId
    ) {
        log.info("POST /api/study-rooms/{}/join - user: {}", id, userId);
        JoinRoomResponseDTO response = studyRoomService.joinRoom(id, userId);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    /**
     * POST /api/study-rooms/{id}/leave
     * Leave a room
     * Requires authentication
     */
    @PostMapping("/{id}/leave")
    public ResponseEntity<LeaveRoomResponseDTO> leaveRoom(
            @PathVariable Long id,
            @RequestHeader("X-User-Id") Long userId
    ) {
        log.info("POST /api/study-rooms/{}/leave - user: {}", id, userId);
        LeaveRoomResponseDTO response = studyRoomService.leaveRoom(id, userId);
        return ResponseEntity.ok(response);
    }

    // ========================================
    // MESSAGES
    // ========================================

    /**
     * GET /api/study-rooms/{id}/messages
     * Get all messages in a room
     */
    @GetMapping("/{id}/messages")
    public ResponseEntity<List<RoomMessageDTO>> getRoomMessages(
            @PathVariable Long id,
            @RequestParam(required = false) String since,
            @RequestHeader(value = "X-User-Id", required = false) Long userId
    ) {
        log.info("GET /api/study-rooms/{}/messages - since: {}, userId: {}", id, since, userId);

        List<RoomMessageDTO> messages;
        
        if (since != null) {
            // Get messages since timestamp (for polling)
            LocalDateTime sinceTime = LocalDateTime.parse(since);
            messages = studyRoomService.getMessagesSince(id, sinceTime, userId);
        } else {
            // Get all messages
            messages = studyRoomService.getRoomMessages(id, userId);
        }

        return ResponseEntity.ok(messages);
    }

    /**
     * POST /api/study-rooms/{id}/messages
     * Post a message in a room
     * Requires authentication
     */
    @PostMapping("/{id}/messages")
    public ResponseEntity<RoomMessageDTO> postMessage(
            @PathVariable Long id,
            @Valid @RequestBody PostMessageRequestDTO request,
            @RequestHeader("X-User-Id") Long userId
    ) {
        log.info("POST /api/study-rooms/{}/messages - user: {}", id, userId);
        RoomMessageDTO message = studyRoomService.postMessage(id, request, userId);
        return ResponseEntity.status(HttpStatus.CREATED).body(message);
    }

    /**
     * DELETE /api/study-rooms/messages/{messageId}
     * Delete a message
     * Only author or room creator can delete
     */
    @DeleteMapping("/messages/{messageId}")
    public ResponseEntity<Void> deleteMessage(
            @PathVariable Long messageId,
            @RequestHeader("X-User-Id") Long userId
    ) {
        log.info("DELETE /api/study-rooms/messages/{} - user: {}", messageId, userId);
        studyRoomService.deleteMessage(messageId, userId);
        return ResponseEntity.noContent().build();
    }

    // ========================================
    // UPDATE & CLOSE ROOM
    // ========================================

    /**
     * PUT /api/study-rooms/{id}
     * Update room information
     * Only creator can update
     */
    @PutMapping("/{id}")
    public ResponseEntity<StudyRoomDTO> updateRoom(
            @PathVariable Long id,
            @Valid @RequestBody UpdateRoomRequestDTO request,
            @RequestHeader("X-User-Id") Long userId
    ) {
        log.info("PUT /api/study-rooms/{} - user: {}", id, userId);
        StudyRoomDTO room = studyRoomService.updateRoom(id, request, userId);
        return ResponseEntity.ok(room);
    }

    /**
     * POST /api/study-rooms/{id}/close
     * Close a room
     * Only creator can close
     */
    @PostMapping("/{id}/close")
    public ResponseEntity<StudyRoomDTO> closeRoom(
            @PathVariable Long id,
            @RequestHeader("X-User-Id") Long userId
    ) {
        log.info("POST /api/study-rooms/{}/close - user: {}", id, userId);
        StudyRoomDTO room = studyRoomService.closeRoom(id, userId);
        return ResponseEntity.ok(room);
    }

    // ========================================
    // MY ROOMS
    // ========================================

    /**
     * GET /api/study-rooms/my-rooms
     * Get user's rooms dashboard
     * Requires authentication
     */
    @GetMapping("/my-rooms")
    public ResponseEntity<MyRoomsDashboardDTO> getMyRoomsDashboard(
            @RequestHeader("X-User-Id") Long userId
    ) {
        log.info("GET /api/study-rooms/my-rooms - user: {}", userId);
        MyRoomsDashboardDTO dashboard = studyRoomService.getMyRoomsDashboard(userId);
        return ResponseEntity.ok(dashboard);
    }

    /**
     * GET /api/study-rooms/my-rooms/created
     * Get rooms created by user
     */
    @GetMapping("/my-rooms/created")
    public ResponseEntity<List<StudyRoomDTO>> getMyCreatedRooms(
            @RequestHeader("X-User-Id") Long userId
    ) {
        log.info("GET /api/study-rooms/my-rooms/created - user: {}", userId);
        List<StudyRoomDTO> rooms = studyRoomService.getMyCreatedRooms(userId);
        return ResponseEntity.ok(rooms);
    }

    /**
     * GET /api/study-rooms/my-rooms/joined
     * Get rooms user has joined
     */
    @GetMapping("/my-rooms/joined")
    public ResponseEntity<List<StudyRoomDTO>> getMyJoinedRooms(
            @RequestHeader("X-User-Id") Long userId
    ) {
        log.info("GET /api/study-rooms/my-rooms/joined - user: {}", userId);
        List<StudyRoomDTO> rooms = studyRoomService.getMyJoinedRooms(userId);
        return ResponseEntity.ok(rooms);
    }

    // ========================================
    // HEALTH CHECK
    // ========================================

    /**
     * GET /api/study-rooms/health
     * Health check endpoint
     */
    @GetMapping("/health")
    public ResponseEntity<String> healthCheck() {
        return ResponseEntity.ok("Study Rooms API is running! 🏫");
    }
}
