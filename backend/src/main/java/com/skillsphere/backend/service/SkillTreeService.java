package com.skillsphere.backend.service;

import com.skillsphere.backend.dto.CompleteNodeResponseDTO;
import com.skillsphere.backend.dto.EnrolledTreeDTO;
import com.skillsphere.backend.dto.EnrollTreeResponseDTO;
import com.skillsphere.backend.dto.SkillTreeDetailDTO;
import com.skillsphere.backend.dto.SkillTreeSummaryDTO;
import com.skillsphere.backend.dto.TreeNodeDTO;
import com.skillsphere.backend.entity.SkillNodeEntity;
import com.skillsphere.backend.entity.SkillTreeEntity;
import com.skillsphere.backend.entity.UserEntity;
import com.skillsphere.backend.entity.UserNodeProgressEntity;
import com.skillsphere.backend.entity.UserProfileEntity;
import com.skillsphere.backend.entity.UserSkillTreeEntity;
import com.skillsphere.backend.entity.UserSkillTreeEntity.EnrollmentStatus;
import com.skillsphere.backend.exception.EntityNotFoundException;
import com.skillsphere.backend.mapper.SkillTreeMapper;
import com.skillsphere.backend.repo.SkillNodeRepo;
import com.skillsphere.backend.repo.SkillTreeRepo;
import com.skillsphere.backend.repo.UserNodeProgressRepo;
import com.skillsphere.backend.repo.UserProfileRepo;
import com.skillsphere.backend.repo.UserRepo;
import com.skillsphere.backend.repo.UserSkillTreeRepo;
import lombok.RequiredArgsConstructor;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SkillTreeService {
    
    private static final Logger logger = LogManager.getLogger(SkillTreeService.class);
    
    private final SkillTreeRepo skillTreeRepo;
    private final SkillNodeRepo skillNodeRepo;
    private final UserSkillTreeRepo userSkillTreeRepo;
    private final UserNodeProgressRepo userNodeProgressRepo;
    private final UserRepo userRepo;
    private final UserProfileRepo userProfileRepo;
    private final SkillTreeMapper skillTreeMapper;
    
    /**
     * Get all available skill trees
     */
    @Transactional(readOnly = true)
    public List<SkillTreeSummaryDTO> getAllSkillTrees() {
        logger.debug("Fetching all skill trees");
        
        return skillTreeRepo.findAll().stream()
                .map(skillTreeMapper::toSummaryDto)
                .collect(Collectors.toList());
    }
    
    /**
     * Get trees enrolled by user
     */
    @Transactional(readOnly = true)
    public List<EnrolledTreeDTO> getEnrolledTrees(Long userId) {
        logger.debug("Fetching enrolled trees for user: {}", userId);
        
        List<UserSkillTreeEntity> enrollments = userSkillTreeRepo.findByUserId(userId);
        
        return enrollments.stream()
                .map(enrollment -> {
                    SkillTreeEntity tree = skillTreeRepo.findById(enrollment.getTreeId())
                            .orElse(null);
                    return skillTreeMapper.toEnrolledDto(enrollment, tree);
                })
                .filter(dto -> dto != null)  // Remove any failed mappings
                .collect(Collectors.toList());
    }
    
    /**
     * Get active (in-progress) trees for user
     */
    @Transactional(readOnly = true)
    public List<EnrolledTreeDTO> getActiveTrees(Long userId) {
        logger.debug("Fetching active trees for user: {}", userId);
        
        List<UserSkillTreeEntity> enrollments = userSkillTreeRepo
                .findByUserIdAndStatus(userId, EnrollmentStatus.ACTIVE);
        
        return enrollments.stream()
                .map(enrollment -> {
                    SkillTreeEntity tree = skillTreeRepo.findById(enrollment.getTreeId())
                            .orElse(null);
                    return skillTreeMapper.toEnrolledDto(enrollment, tree);
                })
                .filter(dto -> dto != null)
                .collect(Collectors.toList());
    }
    
    /**
     * Enroll user in a skill tree
     */
    @Transactional
    public EnrolledTreeDTO enrollInTree(Long userId, Long treeId) {
        logger.info("Enrolling user {} in tree {}", userId, treeId);
        
        // Check if tree exists
        SkillTreeEntity tree = skillTreeRepo.findById(treeId)
                .orElseThrow(() -> new EntityNotFoundException("Skill tree not found: " + treeId));
        
        // Check if already enrolled
        if (userSkillTreeRepo.existsByUserIdAndTreeId(userId, treeId)) {
            throw new IllegalStateException("User already enrolled in this tree");
        }
        
        // Create enrollment
        UserSkillTreeEntity enrollment = new UserSkillTreeEntity();
        enrollment.setUserId(userId);
        enrollment.setTreeId(treeId);
        enrollment.setSkillTree(tree);
        enrollment.setStatus(EnrollmentStatus.ACTIVE);
        enrollment.setProgressPercentage(BigDecimal.ZERO);
        enrollment.setNodesCompleted(0);
        enrollment.setXpEarned(0);
        
        UserSkillTreeEntity saved = userSkillTreeRepo.save(enrollment);
        logger.info("User {} successfully enrolled in tree {}", userId, treeId);
        
        return skillTreeMapper.toEnrolledDto(saved, tree);
    }
    
    /**
     * Update progress when user completes a node
     */
    @Transactional
    public void updateTreeProgress(Long userId, Long treeId, Integer xpEarned) {
        logger.debug("Updating tree progress for user {} in tree {}", userId, treeId);
        
        UserSkillTreeEntity enrollment = userSkillTreeRepo
                .findByUserIdAndTreeId(userId, treeId)
                .orElseThrow(() -> new EntityNotFoundException(
                        "Enrollment not found for user " + userId + " and tree " + treeId));
        
        SkillTreeEntity tree = skillTreeRepo.findById(treeId)
                .orElseThrow(() -> new EntityNotFoundException("Skill tree not found: " + treeId));
        
        // Increment completed nodes
        enrollment.setNodesCompleted(enrollment.getNodesCompleted() + 1);
        
        // Calculate progress percentage
        if (tree.getTotalNodes() > 0) {
            BigDecimal progress = BigDecimal.valueOf(enrollment.getNodesCompleted())
                    .divide(BigDecimal.valueOf(tree.getTotalNodes()), 4, RoundingMode.HALF_UP)
                    .multiply(BigDecimal.valueOf(100))
                    .setScale(2, RoundingMode.HALF_UP);
            
            enrollment.setProgressPercentage(progress);
        }
        
        // Add XP earned
        enrollment.setXpEarned(enrollment.getXpEarned() + xpEarned);
        
        // Check if completed
        if (enrollment.getNodesCompleted().equals(tree.getTotalNodes())) {
            enrollment.setStatus(EnrollmentStatus.COMPLETED);
            logger.info("User {} completed tree {}!", userId, treeId);
        }
        
        userSkillTreeRepo.save(enrollment);
    }
    
    /**
     * Get count of enrolled trees
     */
    @Transactional(readOnly = true)
    public Integer getEnrolledTreesCount(Long userId) {
        return userSkillTreeRepo.findByUserId(userId).size();
    }
    
    /**
     * Get count of completed trees
     */
    @Transactional(readOnly = true)
    public Integer getCompletedTreesCount(Long userId) {
        return userSkillTreeRepo.findByUserIdAndStatus(userId, EnrollmentStatus.COMPLETED).size();
    }

    @Transactional(readOnly = true)
    public SkillTreeDetailDTO getTreeDetail(Long treeId, Long userId) {
        // Get the tree
        SkillTreeEntity tree = skillTreeRepo.findById(treeId)
                .orElseThrow(() -> new RuntimeException("Skill tree not found: " + treeId));

        // Get user's enrollment
        UserSkillTreeEntity enrollment = userSkillTreeRepo.findByUserIdAndTreeId(userId, treeId)
                .orElseThrow(() -> new RuntimeException("User not enrolled in this tree"));

        // Get all nodes for this tree
        List<SkillNodeEntity> nodes = skillNodeRepo.findByTreeIdOrderByOrderIndexAsc(treeId);

        // Get user's progress for all nodes
        List<UserNodeProgressEntity> progressList = userNodeProgressRepo.findByUserId(userId);

        // Calculate totals
        int totalXp = nodes.stream()
                .mapToInt(node -> node.getXpReward() != null ? node.getXpReward() : 0)
                .sum();

        // Build node DTOs
        List<TreeNodeDTO> nodeDTOs = nodes.stream()
                .map(node -> {
                    // Find progress for this specific node
                    UserNodeProgressEntity progress = progressList.stream()
                            .filter(p -> p.getNodeId().equals(node.getNodeId()))
                            .findFirst()
                            .orElse(null);

                    boolean isCompleted = progress != null && progress.getCompleted();
                    boolean isLocked = determineIfNodeIsLocked(node, progressList, nodes);

                    return TreeNodeDTO.builder()
                            .nodeId(node.getNodeId())
                            .title(node.getTitle())
                            .description(node.getDescription())
                            .nodeType(node.getNodeType() != null ? node.getNodeType().name() : "LESSON")
                            .xpReward(node.getXpReward() != null ? node.getXpReward() : 10)
                            .estimatedMinutes(node.getEstimatedMinutes() != null ? node.getEstimatedMinutes() : 15)
                            .orderIndex(node.getOrderIndex())
                            .isCompleted(isCompleted)
                            .isLocked(isLocked)
                            .completedDate(progress != null ? progress.getCompletionDate() : null)
                            .prerequisiteNodes(new ArrayList<>())
                            .build();
                })
                .collect(Collectors.toList());

        return SkillTreeDetailDTO.builder()
                .treeId(tree.getTreeId())
                .title(tree.getTitle())
                .description(tree.getDescription())
                .category(tree.getCategory())
                .difficulty(tree.getDifficulty() != null ? tree.getDifficulty().name() : "BEGINNER")
                .thumbnailUrl(tree.getThumbnailUrl())
                .totalNodes(nodes.size())
                .completedNodes(enrollment.getNodesCompleted())
                .progressPercentage(enrollment.getProgressPercentage().doubleValue())
                .totalXp(totalXp)
                .earnedXp(enrollment.getXpEarned())
                .estimatedHours(tree.getEstimatedHours())
                .nodes(nodeDTOs)
                .enrollmentId(enrollment.getEnrollmentId())
                .enrollmentDate(enrollment.getEnrollmentDate())
                .status(enrollment.getStatus().name())
                .build();
    }

    /**
     * Complete a node and award XP
     */
    @Transactional
    public CompleteNodeResponseDTO completeNode(Long treeId, Long nodeId, Long userId) {
        // Verify user exists
        UserEntity user = userRepo.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Verify tree exists
        SkillTreeEntity tree = skillTreeRepo.findById(treeId)
                .orElseThrow(() -> new RuntimeException("Tree not found"));

        // Verify node exists
        SkillNodeEntity node = skillNodeRepo.findById(nodeId)
                .orElseThrow(() -> new RuntimeException("Node not found"));

        // Verify enrollment
        UserSkillTreeEntity enrollment = userSkillTreeRepo.findByUserIdAndTreeId(userId, treeId)
                .orElseThrow(() -> new RuntimeException("User not enrolled in this tree"));

        // Check if already completed
        UserNodeProgressEntity progress = userNodeProgressRepo
                .findByUserIdAndNodeId(userId, nodeId)
                .orElse(null);

        if (progress != null && progress.getCompleted()) {
            throw new RuntimeException("Node already completed");
        }

        // Create or update progress
        if (progress == null) {
            progress = new UserNodeProgressEntity();
            progress.setUserId(userId);
            progress.setNodeId(nodeId);
            progress.setSkillNode(node);
        }

        progress.setCompleted(true);
        progress.setCompletionDate(LocalDateTime.now());
        userNodeProgressRepo.save(progress);

        // Award XP to user profile
        UserProfileEntity profile = userProfileRepo.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("User profile not found"));

        int xpEarned = node.getXpReward() != null ? node.getXpReward() : 10;
        profile.setTotalXp(profile.getTotalXp() + xpEarned);
        profile.setCurrentXp(profile.getCurrentXp() + xpEarned);

        // Check for level up
        boolean leveledUp = false;
        Integer newLevel = profile.getLevel();
        
        while (profile.getCurrentXp() >= profile.getXpToNextLevel()) {
            profile.setCurrentXp(profile.getCurrentXp() - profile.getXpToNextLevel());
            profile.setLevel(profile.getLevel() + 1);
            profile.setXpToNextLevel((int) (profile.getXpToNextLevel() * 1.5)); // 50% more XP per level
            leveledUp = true;
            newLevel = profile.getLevel();
        }

        userProfileRepo.save(profile);

        // Update enrollment progress
        enrollment.setNodesCompleted(enrollment.getNodesCompleted() + 1);
        enrollment.setXpEarned(enrollment.getXpEarned() + xpEarned);
        
        // Calculate new progress percentage
        List<SkillNodeEntity> allNodes = skillNodeRepo.findByTreeId(treeId);
        double newProgress = (enrollment.getNodesCompleted() * 100.0) / allNodes.size();
        enrollment.setProgressPercentage(BigDecimal.valueOf(newProgress));
        
        // Check if tree is completed
        if (enrollment.getNodesCompleted().equals(allNodes.size())) {
            enrollment.setStatus(UserSkillTreeEntity.EnrollmentStatus.COMPLETED);
        }
        
        userSkillTreeRepo.save(enrollment);

        return CompleteNodeResponseDTO.builder()
                .success(true)
                .xpEarned(xpEarned)
                .newLevel(newLevel)
                .leveledUp(leveledUp)
                .updatedProgress(newProgress)
                .unlockedNodes(new ArrayList<>())
                .build();
    }

    /**
     * Mark a node as started
     */
    @Transactional
    public void startNode(Long treeId, Long nodeId, Long userId) {
        // Verify enrollment
        UserSkillTreeEntity enrollment = userSkillTreeRepo.findByUserIdAndTreeId(userId, treeId)
                .orElseThrow(() -> new RuntimeException("User not enrolled in this tree"));

        // Check if progress already exists
        UserNodeProgressEntity progress = userNodeProgressRepo
                .findByUserIdAndNodeId(userId, nodeId)
                .orElse(null);

        if (progress == null) {
            // Create new progress entry
            SkillNodeEntity node = skillNodeRepo.findById(nodeId)
                    .orElseThrow(() -> new RuntimeException("Node not found"));

            progress = new UserNodeProgressEntity();
            progress.setUserId(userId);
            progress.setNodeId(nodeId);
            progress.setSkillNode(node);
            progress.setCompleted(false);
            
            userNodeProgressRepo.save(progress);
        }

        // Update last accessed time
        enrollment.setLastAccessed(LocalDateTime.now());
        userSkillTreeRepo.save(enrollment);
    }

    /**
     * Determine if a node should be locked based on prerequisites
     */
    private boolean determineIfNodeIsLocked(
            SkillNodeEntity node, 
            List<UserNodeProgressEntity> progressList,
            List<SkillNodeEntity> allNodes
    ) {
        // First node is always unlocked
        if (node.getOrderIndex() == 0) {
            return false;
        }

        // If node has isLocked flag set, respect it
        if (node.getIsLocked() != null && node.getIsLocked()) {
            return true;
        }

        // Check if previous node is completed (simple linear progression)
        for (SkillNodeEntity prevNode : allNodes) {
            if (prevNode.getOrderIndex() == node.getOrderIndex() - 1) {
                // Check if this previous node is completed
                boolean prevCompleted = progressList.stream()
                        .anyMatch(p -> p.getNodeId().equals(prevNode.getNodeId()) && p.getCompleted());
                
                return !prevCompleted; // Locked if previous not completed
            }
        }

        // Default: unlocked
        return false;
    }

    @Transactional(readOnly = true)
public List<SkillTreeSummaryDTO> getAllSkillTreesForUser(Long userId) {
    List<SkillTreeEntity> allTrees = skillTreeRepo.findAll();
    
    return allTrees.stream()
            .map(tree -> {
                // Check if user is enrolled
                boolean isEnrolled = userSkillTreeRepo.existsByUserIdAndTreeId(userId, tree.getTreeId());
                
                // Calculate total XP for this tree
                List<SkillNodeEntity> nodes = skillNodeRepo.findByTreeId(tree.getTreeId());
                int totalXp = nodes.stream()
                        .mapToInt(node -> node.getXpReward() != null ? node.getXpReward() : 0)
                        .sum();
                
                return SkillTreeSummaryDTO.builder()
                        .treeId(tree.getTreeId())
                        .title(tree.getTitle())
                        .description(tree.getDescription())
                        .category(tree.getCategory())
                        .difficulty(tree.getDifficulty() != null ? tree.getDifficulty().name() : "BEGINNER")
                        .thumbnailUrl(tree.getThumbnailUrl())
                        .totalNodes(tree.getTotalNodes() != null ? tree.getTotalNodes() : nodes.size())
                        .estimatedHours(tree.getEstimatedHours() != null ? tree.getEstimatedHours() : 10)
                        .totalXp(totalXp)
                        .isEnrolled(isEnrolled)
                        .build();
            })
            .collect(Collectors.toList());
}

/**
 * Enroll user in a skill tree
 */
@Transactional
public EnrollTreeResponseDTO enrollUserInTree(Long userId, Long treeId) {
    // Check if user exists
    UserEntity user = userRepo.findById(userId)
            .orElseThrow(() -> new RuntimeException("User not found"));
    
    // Check if tree exists
    SkillTreeEntity tree = skillTreeRepo.findById(treeId)
            .orElseThrow(() -> new RuntimeException("Skill tree not found"));
    
    // Check if already enrolled
    if (userSkillTreeRepo.existsByUserIdAndTreeId(userId, treeId)) {
        throw new RuntimeException("Already enrolled in this skill tree");
    }
    
    // Create enrollment
    UserSkillTreeEntity enrollment = new UserSkillTreeEntity();
    enrollment.setUserId(userId);
    enrollment.setTreeId(treeId);
    enrollment.setSkillTree(tree);
    enrollment.setEnrollmentDate(LocalDateTime.now());
    enrollment.setLastAccessed(LocalDateTime.now());
    enrollment.setStatus(UserSkillTreeEntity.EnrollmentStatus.ACTIVE);
    enrollment.setProgressPercentage(BigDecimal.ZERO);
    enrollment.setNodesCompleted(0);
    enrollment.setXpEarned(0);
    
    userSkillTreeRepo.save(enrollment);
    
    return EnrollTreeResponseDTO.builder()
            .enrollmentId(enrollment.getEnrollmentId())
            .treeId(enrollment.getTreeId())
            .enrollmentDate(enrollment.getEnrollmentDate())
            .status(enrollment.getStatus().name())
            .build();
}
}
