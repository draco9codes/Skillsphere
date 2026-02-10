package com.skillsphere.backend.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "user_skill_trees", 
       uniqueConstraints = @UniqueConstraint(columnNames = {"user_id", "tree_id"}))
public class UserSkillTreeEntity {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "enrollment_id")
    private Long enrollmentId;
    
    @Column(name = "user_id", nullable = false)
    private Long userId;
    
    @Column(name = "tree_id", nullable = false, insertable = false, updatable = false)
    private Long treeId;
    
    @Column(name = "enrollment_date")
    private LocalDateTime enrollmentDate;
    
    @Column(name = "progress_percentage", precision = 5, scale = 2)
    private BigDecimal progressPercentage = BigDecimal.ZERO;
    
    @Column(name = "nodes_completed")
    private Integer nodesCompleted = 0;
    
    @Enumerated(EnumType.STRING)
    @Column(name = "status", length = 50)
    private EnrollmentStatus status = EnrollmentStatus.ACTIVE;
    
    @Column(name = "last_accessed")
    private LocalDateTime lastAccessed;
    
    @Column(name = "xp_earned")
    private Integer xpEarned = 0;
    
    // Relationships
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "tree_id", nullable = false)
    private SkillTreeEntity skillTree;
    
    @PrePersist
    protected void onCreate() {
        enrollmentDate = LocalDateTime.now();
        lastAccessed = LocalDateTime.now();
    }
    
    @PreUpdate
    protected void onUpdate() {
        lastAccessed = LocalDateTime.now();
    }
    
    // Enum for status
    public enum EnrollmentStatus {
        ACTIVE, COMPLETED, PAUSED
    }
}
