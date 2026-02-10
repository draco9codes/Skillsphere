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
@Table(name = "user_profile")
public class UserProfileEntity {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "profile_id")
    private Long profileId;
    
    @Column(name = "user_id", unique = true, nullable = false)
    private Long userId;
    
    @Column(name = "level")
    private Integer level = 1;
    
    @Column(name = "total_xp")
    private Integer totalXp = 0;
    
    @Column(name = "current_xp")
    private Integer currentXp = 0;
    
    @Column(name = "xp_to_next_level")
    private Integer xpToNextLevel = 100;
    
    @Column(name = "avatar_url", length = 500)
    private String avatarUrl;
    
    @Column(name = "user_title", length = 100)
    private String userTitle = "Novice Learner";
    
    @Column(name = "learning_streak")
    private Integer learningStreak = 0;
    
    @Column(name = "total_time_spent")
    private Integer totalTimeSpent = 0;
    
    @Column(name = "achievements_count")
    private Integer achievementsCount = 0;
    
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;
    
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
    
    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }
    
    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}
