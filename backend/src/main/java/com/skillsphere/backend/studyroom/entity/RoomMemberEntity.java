package com.skillsphere.backend.studyroom.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(
    name = "room_members",
    uniqueConstraints = @UniqueConstraint(columnNames = {"room_id", "user_id"})
)
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RoomMemberEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long roomId;

    @Column(nullable = false)
    private Long userId;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    @Builder.Default
    private RoomMemberRole role = RoomMemberRole.MEMBER;

    // ACTIVITY TRACKING
    @Column(nullable = false)
    @Builder.Default
    private Boolean isActive = true;  // Currently in room or left

    @Builder.Default
    private Integer totalStudyTime = 0;  // Minutes spent in room

    // TIMESTAMPS
    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime joinedAt;

    private LocalDateTime leftAt;  // null if still in room
}
