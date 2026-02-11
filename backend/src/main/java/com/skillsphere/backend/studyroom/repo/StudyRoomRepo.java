package com.skillsphere.backend.studyroom.repo;

import com.skillsphere.backend.studyroom.entity.RoomStatus;
import com.skillsphere.backend.studyroom.entity.RoomType;
import com.skillsphere.backend.studyroom.entity.StudyRoomEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface StudyRoomRepo extends JpaRepository<StudyRoomEntity, Long> {

    // ========================================
    // BASIC QUERIES
    // ========================================

    /**
     * Find rooms by status
     * Example: Get all ACTIVE rooms
     */
    List<StudyRoomEntity> findByStatus(RoomStatus status);

    /**
     * Find rooms by type
     * Example: Get all TEACHING rooms
     */
    List<StudyRoomEntity> findByRoomType(RoomType roomType);

    /**
     * Find public rooms only
     */
    List<StudyRoomEntity> findByIsPublicTrue();

    /**
     * Find rooms by creator
     */
    List<StudyRoomEntity> findByCreatedByUserId(Long userId);

    // ========================================
    // COMBINED FILTERS
    // ========================================

    /**
     * Find rooms by status and type
     * Example: Get all ACTIVE TEACHING rooms
     */
    List<StudyRoomEntity> findByStatusAndRoomType(RoomStatus status, RoomType roomType);

    /**
     * Find public active rooms
     */
    List<StudyRoomEntity> findByIsPublicTrueAndStatus(RoomStatus status);

    /**
     * Find rooms by topic/category
     */
    List<StudyRoomEntity> findByTopic(String topic);
    List<StudyRoomEntity> findByCategory(String category);

    /**
     * Find rooms linked to a skill tree
     */
    List<StudyRoomEntity> findBySkillTreeId(Long skillTreeId);

    // ========================================
    // CUSTOM QUERIES
    // ========================================

    /**
     * Get all active public rooms (most common query)
     */
    @Query("SELECT r FROM StudyRoomEntity r WHERE r.isPublic = true AND r.status = 'ACTIVE' ORDER BY r.createdAt DESC")
    List<StudyRoomEntity> findActivePublicRooms();

    /**
     * Get scheduled teaching rooms (not started yet)
     */
    @Query("SELECT r FROM StudyRoomEntity r WHERE r.roomType = 'TEACHING' AND r.status = 'SCHEDULED' AND r.scheduledStart > :now ORDER BY r.scheduledStart ASC")
    List<StudyRoomEntity> findUpcomingTeachingRooms(@Param("now") LocalDateTime now);

    /**
     * Find rooms with available space
     * (maxParticipants = null OR current count < max)
     */
    @Query("""
        SELECT r FROM StudyRoomEntity r 
        WHERE r.status = 'ACTIVE' 
        AND (r.maxParticipants IS NULL 
             OR (SELECT COUNT(m) FROM RoomMemberEntity m WHERE m.roomId = r.id AND m.isActive = true) < r.maxParticipants)
        ORDER BY r.createdAt DESC
    """)
    List<StudyRoomEntity> findRoomsWithSpace();

    /**
     * Search rooms by name or description
     */
    @Query("SELECT r FROM StudyRoomEntity r WHERE LOWER(r.name) LIKE LOWER(CONCAT('%', :keyword, '%')) OR LOWER(r.description) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    List<StudyRoomEntity> searchRooms(@Param("keyword") String keyword);

    /**
     * Get rooms created by user with specific status
     */
    List<StudyRoomEntity> findByCreatedByUserIdAndStatus(Long userId, RoomStatus status);

    /**
     * Count active rooms by creator
     */
    @Query("SELECT COUNT(r) FROM StudyRoomEntity r WHERE r.createdByUserId = :userId AND r.status = 'ACTIVE'")
    Long countActiveRoomsByCreator(@Param("userId") Long userId);
}
