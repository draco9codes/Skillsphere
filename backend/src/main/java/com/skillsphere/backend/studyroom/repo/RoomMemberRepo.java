package com.skillsphere.backend.studyroom.repo;

import com.skillsphere.backend.studyroom.entity.RoomMemberEntity;
import com.skillsphere.backend.studyroom.entity.RoomMemberRole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RoomMemberRepo extends JpaRepository<RoomMemberEntity, Long> {

    // ========================================
    // MEMBERSHIP CHECKS
    // ========================================

    /**
     * Check if user is member of a room
     * Returns Optional - present if exists
     */
    Optional<RoomMemberEntity> findByRoomIdAndUserId(Long roomId, Long userId);

    /**
     * Check if user exists in room (any status)
     */
    boolean existsByRoomIdAndUserId(Long roomId, Long userId);

    /**
     * Check if user is ACTIVE member
     */
    boolean existsByRoomIdAndUserIdAndIsActiveTrue(Long roomId, Long userId);

    // ========================================
    // GET MEMBERS
    // ========================================

    /**
     * Get all members of a room (including those who left)
     */
    List<RoomMemberEntity> findByRoomId(Long roomId);

    /**
     * Get only ACTIVE members of a room
     */
    List<RoomMemberEntity> findByRoomIdAndIsActiveTrue(Long roomId);

    /**
     * Get all rooms a user is member of (active memberships)
     */
    List<RoomMemberEntity> findByUserIdAndIsActiveTrue(Long userId);

    /**
     * Get all rooms user has ever joined
     */
    List<RoomMemberEntity> findByUserId(Long userId);

    /**
     * Get room creator (role = CREATOR)
     */
    Optional<RoomMemberEntity> findByRoomIdAndRole(Long roomId, RoomMemberRole role);

    // ========================================
    // COUNTS & STATS
    // ========================================

    /**
     * Count active members in a room
     */
    @Query("SELECT COUNT(m) FROM RoomMemberEntity m WHERE m.roomId = :roomId AND m.isActive = true")
    Long countActiveMembersByRoom(@Param("roomId") Long roomId);

    /**
     * Count total members ever joined (including left)
     */
    Long countByRoomId(Long roomId);

    /**
     * Get user's total study time across all rooms
     */
    @Query("SELECT COALESCE(SUM(m.totalStudyTime), 0) FROM RoomMemberEntity m WHERE m.userId = :userId")
    Integer getTotalStudyTimeByUser(@Param("userId") Long userId);

    /**
     * Count how many rooms user has joined
     */
    Long countByUserId(Long userId);

    /**
     * Count active rooms user is in
     */
    Long countByUserIdAndIsActiveTrue(Long userId);

    // ========================================
    // ROLE-BASED QUERIES
    // ========================================

    /**
     * Get all rooms where user is creator
     */
    @Query("SELECT m FROM RoomMemberEntity m WHERE m.userId = :userId AND m.role = 'CREATOR'")
    List<RoomMemberEntity> findRoomsCreatedByUser(@Param("userId") Long userId);

    /**
     * Check if user is creator of room
     */
    @Query("SELECT CASE WHEN COUNT(m) > 0 THEN true ELSE false END FROM RoomMemberEntity m WHERE m.roomId = :roomId AND m.userId = :userId AND m.role = 'CREATOR'")
    boolean isUserCreatorOfRoom(@Param("roomId") Long roomId, @Param("userId") Long userId);
}
