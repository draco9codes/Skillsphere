package com.skillsphere.backend.project.repo;

import com.skillsphere.backend.project.entity.ProjectDifficulty;
import com.skillsphere.backend.project.entity.ProjectEntity;
import com.skillsphere.backend.project.entity.ProjectType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository  // Tells Spring this is a database access component
public interface ProjectRepo extends JpaRepository<ProjectEntity, Long> {
    // JpaRepository<EntityType, PrimaryKeyType>
    //              ^^^^^^^^^^^  ^^^^^^^^^^^^^^
    //              ProjectEntity    Long (the ID type)

    // ========================================
    // CUSTOM QUERY METHODS
    // ========================================

    // 1. Find projects by difficulty
    // Spring auto-generates SQL: SELECT * FROM projects WHERE difficulty = ?
    List<ProjectEntity> findByDifficulty(ProjectDifficulty difficulty);

    // 2. Find projects by type
    List<ProjectEntity> findByProjectType(ProjectType projectType);

    // 3. Find projects by category (searches in categories list)
    // Uses JPQL to query the @ElementCollection
    @Query("SELECT p FROM ProjectEntity p JOIN p.categories c WHERE c = :category")
    List<ProjectEntity> findByCategory(@Param("category") String category);

    // 4. Find unlocked projects (no skill requirement or specific skill node)
    @Query("SELECT p FROM ProjectEntity p WHERE p.requiredSkillNodeId IS NULL OR p.requiredSkillNodeId = :skillNodeId")
    List<ProjectEntity> findUnlockedProjects(@Param("skillNodeId") Long skillNodeId);

    // 5. Find projects with XP reward >= minimum
    // Method name auto-generates: SELECT * FROM projects WHERE xp_reward >= ?
    List<ProjectEntity> findByXpRewardGreaterThanEqual(Integer minXp);

    // 6. Find all projects ordered by XP (highest first)
    List<ProjectEntity> findAllByOrderByXpRewardDesc();

    // 7. Find projects by difficulty and type (combined filters)
    List<ProjectEntity> findByDifficultyAndProjectType(
        ProjectDifficulty difficulty, 
        ProjectType projectType
    );
}
