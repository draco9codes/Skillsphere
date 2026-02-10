package com.skillsphere.backend.repo;

import com.skillsphere.backend.entity.UserSkillTreeEntity;
import com.skillsphere.backend.entity.UserSkillTreeEntity.EnrollmentStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface UserSkillTreeRepo extends JpaRepository<UserSkillTreeEntity, Long> {
    
    // Find all enrollments for a user
    // SQL: SELECT * FROM user_skill_trees WHERE user_id = ?
    List<UserSkillTreeEntity> findByUserId(Long userId);
    
    // Find active enrollments for a user
    // SQL: SELECT * FROM user_skill_trees WHERE user_id = ? AND status = 'ACTIVE'
    List<UserSkillTreeEntity> findByUserIdAndStatus(Long userId, EnrollmentStatus status);
    
    // Find specific enrollment
    // SQL: SELECT * FROM user_skill_trees WHERE user_id = ? AND tree_id = ?
    Optional<UserSkillTreeEntity> findByUserIdAndTreeId(Long userId, Long treeId);
    
    // Check if user is enrolled in a tree
    boolean existsByUserIdAndTreeId(Long userId, Long treeId);
    
    // Custom query using @Query annotation (we'll explain this!)
    @Query("SELECT u FROM UserSkillTreeEntity u WHERE u.userId = :userId ORDER BY u.lastAccessed DESC")
    List<UserSkillTreeEntity> findRecentlyAccessedByUser(@Param("userId") Long userId);
}
