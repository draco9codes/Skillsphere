package com.skillsphere.backend.repo;

import com.skillsphere.backend.entity.SkillTreeEntity;
import com.skillsphere.backend.entity.SkillTreeEntity.DifficultyLevel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface SkillTreeRepo extends JpaRepository<SkillTreeEntity, Long> {
    
    // Find by category
    // SQL: SELECT * FROM skill_trees WHERE category = ?
    List<SkillTreeEntity> findByCategory(String category);
    
    // Find by difficulty
    // SQL: SELECT * FROM skill_trees WHERE difficulty = ?
    List<SkillTreeEntity> findByDifficulty(DifficultyLevel difficulty);
    
    // Find by category and difficulty
    // SQL: SELECT * FROM skill_trees WHERE category = ? AND difficulty = ?
    List<SkillTreeEntity> findByCategoryAndDifficulty(String category, DifficultyLevel difficulty);
    
    // Find all, ordered by title
    // SQL: SELECT * FROM skill_trees ORDER BY title ASC
    List<SkillTreeEntity> findAllByOrderByTitleAsc();
}

