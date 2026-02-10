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
@Table(name = "achievements")
public class AchievementEntity {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "achievement_id")
    private Long achievementId;
    
    @Column(name = "title", nullable = false, length = 200)
    private String title;
    
    @Column(name = "description", columnDefinition = "TEXT")
    private String description;
    
    @Column(name = "icon_name", length = 100)
    private String iconName;
    
    @Column(name = "criteria", columnDefinition = "TEXT")
    private String criteria;
    
    @Column(name = "xp_reward")
    private Integer xpReward = 50;
    
    @Enumerated(EnumType.STRING)
    @Column(name = "rarity", length = 50)
    private AchievementRarity rarity;
    
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;
    
    // Relationships
    @OneToMany(mappedBy = "achievement", cascade = CascadeType.ALL)
    private List<UserAchievementEntity> userAchievements = new ArrayList<>();
    
    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
    
    // Enum for rarity
    public enum AchievementRarity {
        COMMON, RARE, EPIC, LEGENDARY
    }
}
