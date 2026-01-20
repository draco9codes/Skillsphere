package com.skillsphere.backend.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skillsphere.backend.entity.UserEntity;

public interface AuthRepo extends JpaRepository<UserEntity, Long> {
    
    UserEntity findByUsername(String username);
}
