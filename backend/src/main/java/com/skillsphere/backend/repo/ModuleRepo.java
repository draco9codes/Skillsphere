package com.skillsphere.backend.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.skillsphere.backend.entity.ModuleEntity;

@Repository
public interface ModuleRepo extends JpaRepository<ModuleEntity, Long> {
    List<ModuleEntity> findByTitleContainingIgnoreCase(String query);
}