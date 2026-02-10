package com.skillsphere.backend.repo;

import com.skillsphere.backend.entity.SkillNodeEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SkillNodeRepo extends JpaRepository<SkillNodeEntity, Long> {

    // Find all nodes in a tree, ordered by order_index
    // SQL: SELECT * FROM skill_nodes WHERE tree_id = ? ORDER BY order_index ASC
    List<SkillNodeEntity> findByTreeIdOrderByOrderIndexAsc(Long treeId);

    // ✅ ADD THIS METHOD - Find all nodes in a tree (without ordering)
    List<SkillNodeEntity> findByTreeId(Long treeId);

    // Find root nodes (no parent) in a tree
    // SQL: SELECT * FROM skill_nodes WHERE tree_id = ? AND parent_node_id IS NULL
    List<SkillNodeEntity> findByTreeIdAndParentNodeIdIsNull(Long treeId);

    // Find child nodes of a parent
    // SQL: SELECT * FROM skill_nodes WHERE parent_node_id = ?
    List<SkillNodeEntity> findByParentNodeId(Long parentNodeId);

    // Find locked nodes in a tree
    List<SkillNodeEntity> findByTreeIdAndIsLocked(Long treeId, Boolean isLocked);

    // Custom query: Find nodes user can unlock (parent completed)
    @Query("SELECT n FROM SkillNodeEntity n WHERE n.treeId = :treeId " +
           "AND n.isLocked = true " +
           "AND n.parentNode.nodeId IN " +
           "(SELECT p.nodeId FROM UserNodeProgressEntity p WHERE p.userId = :userId AND p.completed = true)")
    List<SkillNodeEntity> findUnlockableNodes(@Param("userId") Long userId, @Param("treeId") Long treeId);
}
