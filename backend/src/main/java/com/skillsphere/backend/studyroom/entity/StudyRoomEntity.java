package com.skillsphere.backend.studyroom.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "study_rooms")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class StudyRoomEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 200)
    private String name;

    @Column(columnDefinition = "TEXT")
    private String description;

    // ROOM TYPE & STATUS
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private RoomType roomType;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    @Builder.Default
    private RoomStatus status = RoomStatus.ACTIVE;

    // CATEGORIZATION
    @Column(length = 100)
    private String topic;  // "Frontend", "Backend", "Algorithms"

    @Column(length = 100)
    private String category;  // "React", "Spring Boot", "DSA"

    private Long skillTreeId;  // Optional: Link to a skill tree

    // CREATOR & PERMISSIONS
    @Column(nullable = false)
    private Long createdByUserId;

    @Column(nullable = false)
    private Boolean isPublic = true;  // Public or invite-only

    // CAPACITY
    private Integer maxParticipants;  // null = unlimited

    // SCHEDULING (for TEACHING rooms)
    private LocalDateTime scheduledStart;
    private LocalDateTime scheduledEnd;
    private LocalDateTime actualStart;  // When room actually became active

    // TIMESTAMPS
    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;
}
