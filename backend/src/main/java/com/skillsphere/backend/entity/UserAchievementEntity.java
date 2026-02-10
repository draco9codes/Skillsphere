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
@Table(name = "user_achievements",
       uniqueConstraints = @UniqueConstraint(columnNames = {"user_id", "achievement_id"}))
public class UserAchievementEntity {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_achievement_id")
    private Long userAchievementId;
    
    @Column(name = "user_id", nullable = false)
    private Long userId;
    
    @Column(name = "achievement_id", nullable = false, insertable = false, updatable = false)
    private Long achievementId;
    
    @Column(name = "unlocked_date")
    private LocalDateTime unlockedDate;
    
    // Relationships
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "achievement_id", nullable = false)
    private AchievementEntity achievement;
    
    @PrePersist
    protected void onCreate() {
        unlockedDate = LocalDateTime.now();
    }
}
