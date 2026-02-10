package com.skillsphere.backend.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "skill_trees")
public class SkillTreeEntity {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "tree_id")
    private Long treeId;
    
    @Column(name = "title", nullable = false, length = 200)
    private String title;
    
    @Column(name = "description", columnDefinition = "TEXT")
    private String description;
    
    @Column(name = "category", length = 100)
    private String category;
    
    @Column(name = "thumbnail_url", length = 500)
    private String thumbnailUrl;
    
    @Column(name = "total_nodes")
    private Integer totalNodes = 0;
    
    @Column(name = "estimated_hours")
    private Integer estimatedHours;
    
    @Enumerated(EnumType.STRING)
    @Column(name = "difficulty", length = 50)
    private DifficultyLevel difficulty;
    
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;
    
    // Relationships
    @OneToMany(mappedBy = "skillTree", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<SkillNodeEntity> nodes = new ArrayList<>();
    
    @OneToMany(mappedBy = "skillTree", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<UserSkillTreeEntity> enrollments = new ArrayList<>();
    
    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
    
    // Enum for difficulty
    public enum DifficultyLevel {
        BEGINNER, INTERMEDIATE, ADVANCED
    }
}
