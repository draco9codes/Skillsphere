package com.skillsphere.backend.repo;

import com.skillsphere.backend.entity.UserNodeProgressEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface UserNodeProgressRepo extends JpaRepository<UserNodeProgressEntity, Long> {
    
    // Find user's progress on a specific node
    Optional<UserNodeProgressEntity> findByUserIdAndNodeId(Long userId, Long nodeId);
    
    // Find all completed nodes for a user
    List<UserNodeProgressEntity> findByUserIdAndCompleted(Long userId, Boolean completed);
    
    // Find all progress records for a user
    List<UserNodeProgressEntity> findByUserId(Long userId);
    
    // Check if user completed a node
    boolean existsByUserIdAndNodeIdAndCompleted(Long userId, Long nodeId, Boolean completed);
    
    // Count completed nodes for a user in a specific tree
    @Query("SELECT COUNT(p) FROM UserNodeProgressEntity p " +
           "JOIN SkillNodeEntity n ON p.nodeId = n.nodeId " +
           "WHERE p.userId = :userId AND n.treeId = :treeId AND p.completed = true")
    Long countCompletedNodesByUserAndTree(@Param("userId") Long userId, @Param("treeId") Long treeId);
    
    // Get total time spent by user
    @Query("SELECT COALESCE(SUM(p.timeSpent), 0) FROM UserNodeProgressEntity p WHERE p.userId = :userId")
    Integer getTotalTimeSpentByUser(@Param("userId") Long userId);
}
