package com.skillsphere.backend.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "user_node_progress",
       uniqueConstraints = @UniqueConstraint(columnNames = {"user_id", "node_id"}))
public class UserNodeProgressEntity {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "progress_id")
    private Long progressId;
    
    @Column(name = "user_id", nullable = false)
    private Long userId;
    
    @Column(name = "node_id", nullable = false, insertable = false, updatable = false)
    private Long nodeId;
    
    @Column(name = "completed")
    private Boolean completed = false;
    
    @Column(name = "completion_date")
    private LocalDateTime completionDate;
    
    @Column(name = "time_spent")
    private Integer timeSpent = 0;
    
    @Column(name = "score")
    private Integer score;
    
    // Relationships
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "node_id", nullable = false)
    private SkillNodeEntity skillNode;
}
