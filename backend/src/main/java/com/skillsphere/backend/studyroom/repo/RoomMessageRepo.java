package com.skillsphere.backend.studyroom.repo;

import com.skillsphere.backend.studyroom.entity.MessageType;
import com.skillsphere.backend.studyroom.entity.RoomMessageEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface RoomMessageRepo extends JpaRepository<RoomMessageEntity, Long> {

    // ========================================
    // GET MESSAGES
    // ========================================

    /**
     * Get all messages for a room (including deleted - for moderation)
     */
    List<RoomMessageEntity> findByRoomId(Long roomId);

    /**
     * Get only non-deleted messages for a room
     */
    List<RoomMessageEntity> findByRoomIdAndIsDeletedFalseOrderByCreatedAtAsc(Long roomId);

    /**
     * Get messages by user
     */
    List<RoomMessageEntity> findByUserId(Long userId);

    /**
     * Get messages by type
     */
    List<RoomMessageEntity> findByRoomIdAndMessageType(Long roomId, MessageType messageType);

    // ========================================
    // PAGINATION & LIMITS
    // ========================================

    /**
     * Get recent messages (limit N)
     * Note: Spring Data JPA doesn't support LIMIT directly in method names
     * Use @Query or Pageable for this
     */
    @Query("SELECT m FROM RoomMessageEntity m WHERE m.roomId = :roomId AND m.isDeleted = false ORDER BY m.createdAt DESC LIMIT :limit")
    List<RoomMessageEntity> findRecentMessages(@Param("roomId") Long roomId, @Param("limit") int limit);

    /**
     * Get messages after a certain time (for polling)
     */
    @Query("SELECT m FROM RoomMessageEntity m WHERE m.roomId = :roomId AND m.isDeleted = false AND m.createdAt > :since ORDER BY m.createdAt ASC")
    List<RoomMessageEntity> findMessagesSince(@Param("roomId") Long roomId, @Param("since") LocalDateTime since);

    // ========================================
    // COUNTS & STATS
    // ========================================

    /**
     * Count messages in a room
     */
    Long countByRoomIdAndIsDeletedFalse(Long roomId);

    /**
     * Count messages by user in a room
     */
    Long countByRoomIdAndUserIdAndIsDeletedFalse(Long roomId, Long userId);

    /**
     * Count total messages posted by user (across all rooms)
     */
    Long countByUserIdAndIsDeletedFalse(Long userId);

    // ========================================
    // MODERATION
    // ========================================

    /**
     * Get deleted messages (for moderation review)
     */
    List<RoomMessageEntity> findByRoomIdAndIsDeletedTrue(Long roomId);

    /**
     * Check if user has posted in room
     */
    boolean existsByRoomIdAndUserId(Long roomId, Long userId);
}
