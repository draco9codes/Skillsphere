package com.skillsphere.backend.controller;

import java.util.List;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skillsphere.backend.dto.CompleteNodeResponseDTO;
import com.skillsphere.backend.dto.EnrollTreeResponseDTO;
import com.skillsphere.backend.dto.SkillTreeDetailDTO;
import com.skillsphere.backend.dto.SkillTreeSummaryDTO;
import com.skillsphere.backend.entity.UserEntity;
import com.skillsphere.backend.repo.UserRepo;
import com.skillsphere.backend.service.SkillTreeService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/trees")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
@RequiredArgsConstructor
public class TreeController {

    private static final Logger logger = LogManager.getLogger(TreeController.class);

    private final SkillTreeService skillTreeService;
    private final UserRepo userRepo;

    /**
     * Get authenticated user's ID from JWT token
     */
    private Long getAuthenticatedUserId() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        
        if (auth == null || !auth.isAuthenticated()) {
            throw new RuntimeException("User not authenticated");
        }
        
        String username = (String) auth.getPrincipal();
        
        UserEntity user = userRepo.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found: " + username));
        
        return user.getUserId();
    }

    /**
     * GET /api/trees/{treeId}/detail
     * Get detailed view of a specific skill tree with all nodes
     */
    @GetMapping("/{treeId}/detail")
    public ResponseEntity<SkillTreeDetailDTO> getTreeDetail(@PathVariable Long treeId) {
        Long userId = getAuthenticatedUserId();
        logger.info("GET /api/trees/{}/detail - User: {}", treeId, userId);
        
        SkillTreeDetailDTO tree = skillTreeService.getTreeDetail(treeId, userId);
        return ResponseEntity.ok(tree);
    }

    /**
     * POST /api/trees/{treeId}/nodes/{nodeId}/complete
     * Mark a node as completed and award XP
     */
    @PostMapping("/{treeId}/nodes/{nodeId}/complete")
    public ResponseEntity<CompleteNodeResponseDTO> completeNode(
            @PathVariable Long treeId,
            @PathVariable Long nodeId) {
        
        Long userId = getAuthenticatedUserId();
        logger.info("POST /api/trees/{}/nodes/{}/complete - User: {}", treeId, nodeId, userId);
        
        CompleteNodeResponseDTO response = skillTreeService.completeNode(treeId, nodeId, userId);
        return ResponseEntity.ok(response);
    }

    /**
     * POST /api/trees/{treeId}/nodes/{nodeId}/start
     * Mark a node as started (in progress)
     */
    @PostMapping("/{treeId}/nodes/{nodeId}/start")
    public ResponseEntity<Void> startNode(
            @PathVariable Long treeId,
            @PathVariable Long nodeId) {
        
        Long userId = getAuthenticatedUserId();
        logger.info("POST /api/trees/{}/nodes/{}/start - User: {}", treeId, nodeId, userId);
        
        skillTreeService.startNode(treeId, nodeId, userId);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/all")
    public ResponseEntity<List<SkillTreeSummaryDTO>> getAllSkillTrees() {
        Long userId = getAuthenticatedUserId();
        logger.info("GET /api/trees/all - User: {}", userId);
        
        List<SkillTreeSummaryDTO> trees = skillTreeService.getAllSkillTreesForUser(userId);
        return ResponseEntity.ok(trees);
    }

    @PostMapping("/{treeId}/enroll")
    public ResponseEntity<EnrollTreeResponseDTO> enrollInTree(@PathVariable Long treeId) {
        Long userId = getAuthenticatedUserId();
        logger.info("POST /api/trees/{}/enroll - User: {}", treeId, userId);
        
        EnrollTreeResponseDTO response = skillTreeService.enrollUserInTree(userId, treeId);
        return ResponseEntity.status(201).body(response);
    }
}
