package com.skillsphere.backend.repo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skillsphere.backend.entity.UserEntity;

public interface AuthRepo extends JpaRepository<UserEntity, Long> {
    
    Optional<UserEntity> findByUsername(String email);
}
