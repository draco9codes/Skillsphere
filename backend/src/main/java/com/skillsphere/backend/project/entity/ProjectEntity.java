package com.skillsphere.backend.project.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "projects")  // Database table name
@Data                       // Lombok: Generates getters, setters, toString, equals, hashCode
@Builder                    // Lombok: Enables builder pattern - Project.builder().title("...").build()
@NoArgsConstructor         // Lombok: Generates no-args constructor (required by JPA)
@AllArgsConstructor        // Lombok: Generates all-args constructor (used by builder)
public class ProjectEntity {

    @Id  // Marks this as primary key
    @GeneratedValue(strategy = GenerationType.IDENTITY)  // Auto-increment ID
    private Long id;

    @Column(nullable = false, length = 200)  // NOT NULL constraint, max 200 chars
    private String title;

    @Column(columnDefinition = "TEXT")  // Large text field for long descriptions
    private String description;

    // ENUMS - We'll create these next
    @Enumerated(EnumType.STRING)  // Store as "BEGINNER" not 0,1,2 (more readable)
    @Column(nullable = false)
    private ProjectDifficulty difficulty;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ProjectType projectType;

    @Column(nullable = false)
    private Integer xpReward;  // XP earned on completion

    private Integer estimatedHours;  // How long project takes

    // RELATIONSHIPS & PREREQUISITES
    private Long requiredSkillNodeId;  // Must complete this skill node to unlock (null = no requirement)

    @ElementCollection  // Stores list in separate table (project_prerequisite_ids)
    @CollectionTable(name = "project_prerequisites", joinColumns = @JoinColumn(name = "project_id"))
    @Column(name = "prerequisite_project_id")
    private List<Long> prerequisiteProjectIds = new ArrayList<>();

    // CATEGORIES (Tags)
    @ElementCollection
    @CollectionTable(name = "project_categories", joinColumns = @JoinColumn(name = "project_id"))
    @Column(name = "category")
    private List<String> categories = new ArrayList<>();  // ["Frontend", "React", "CSS"]

    // RESOURCES (Store as JSON string for flexibility)
    @Column(columnDefinition = "TEXT")
    private String resourceLinksJson;  // We'll parse this as JSON in service layer

    // TIMESTAMPS
    @CreationTimestamp  // Hibernate auto-fills on creation
    @Column(updatable = false)  // Never update this field
    private LocalDateTime createdAt;

    @UpdateTimestamp  // Hibernate auto-updates on every save
    private LocalDateTime updatedAt;
}
