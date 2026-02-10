package com.skillsphere.backend.mapper;

import com.skillsphere.backend.dto.EnrolledTreeDTO;
import com.skillsphere.backend.dto.SkillTreeSummaryDTO;
import com.skillsphere.backend.entity.SkillTreeEntity;
import com.skillsphere.backend.entity.UserSkillTreeEntity;
import org.springframework.stereotype.Component;

@Component
public class SkillTreeMapper {
    
    public SkillTreeSummaryDTO toSummaryDto(SkillTreeEntity entity) {
        if (entity == null) {
            return null;
        }
        
        return SkillTreeSummaryDTO.builder()
                .treeId(entity.getTreeId())
                .title(entity.getTitle())
                .description(entity.getDescription())
                .category(entity.getCategory())
                .thumbnailUrl(entity.getThumbnailUrl())
                .totalNodes(entity.getTotalNodes())
                .estimatedHours(entity.getEstimatedHours())
                .difficulty(entity.getDifficulty() != null ? entity.getDifficulty().name() : null)
                .build();
    }
    
    public EnrolledTreeDTO toEnrolledDto(UserSkillTreeEntity enrollment, SkillTreeEntity tree) {
        if (enrollment == null || tree == null) {
            return null;
        }
        
        return EnrolledTreeDTO.builder()
                .enrollmentId(enrollment.getEnrollmentId())
                .treeId(tree.getTreeId())
                .title(tree.getTitle())
                .description(tree.getDescription())
                .category(tree.getCategory())
                .thumbnailUrl(tree.getThumbnailUrl())
                .totalNodes(tree.getTotalNodes())
                .nodesCompleted(enrollment.getNodesCompleted())
                .progressPercentage(enrollment.getProgressPercentage())
                .status(enrollment.getStatus() != null ? enrollment.getStatus().name() : null)
                .enrollmentDate(enrollment.getEnrollmentDate())
                .lastAccessed(enrollment.getLastAccessed())
                .xpEarned(enrollment.getXpEarned())
                .estimatedHours(tree.getEstimatedHours())
                .difficulty(tree.getDifficulty() != null ? tree.getDifficulty().name() : null)
                .build();
    }
}
