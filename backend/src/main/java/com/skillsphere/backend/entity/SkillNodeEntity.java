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
@Table(name = "skill_nodes")
public class SkillNodeEntity {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "node_id")
    private Long nodeId;
    
    @Column(name = "tree_id", nullable = false, insertable = false, updatable = false)
    private Long treeId;
    
    @Column(name = "title", nullable = false, length = 200)
    private String title;
    
    @Column(name = "description", columnDefinition = "TEXT")
    private String description;
    
    @Column(name = "order_index", nullable = false)
    private Integer orderIndex;
    
    // ✅ FIX: Add insertable=false, updatable=false
    @Column(name = "parent_node_id", insertable = false, updatable = false)
    private Long parentNodeId;
    
    @Column(name = "xp_reward")
    private Integer xpReward = 10;
    
    @Column(name = "estimated_minutes")
    private Integer estimatedMinutes;
    
    @Enumerated(EnumType.STRING)
    @Column(name = "node_type", length = 50)
    private NodeType nodeType;
    
    @Column(name = "is_locked")
    private Boolean isLocked = false;
    
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;
    
    // Relationships
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "tree_id", nullable = false)
    private SkillTreeEntity skillTree;
    
    // ✅ This owns the parent_node_id column (can write to it)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "parent_node_id", referencedColumnName = "node_id")
    private SkillNodeEntity parentNode;
    
    @OneToMany(mappedBy = "parentNode", cascade = CascadeType.ALL)
    private List<SkillNodeEntity> childNodes = new ArrayList<>();
    
    @OneToMany(mappedBy = "skillNode", cascade = CascadeType.ALL)
    private List<UserNodeProgressEntity> userProgress = new ArrayList<>();
    
    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
    
    // Enum for node type
    public enum NodeType {
        LESSON, PROJECT, QUIZ, CHALLENGE
    }
}
