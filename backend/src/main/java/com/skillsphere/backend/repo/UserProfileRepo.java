package com.skillsphere.backend.repo;

import com.skillsphere.backend.entity.UserProfileEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface UserProfileRepo extends JpaRepository<UserProfileEntity, Long> {
    
    // Spring generates this query automatically!
    // SQL: SELECT * FROM user_profile WHERE user_id = ?
    Optional<UserProfileEntity> findByUserId(Long userId);
    
    // Check if profile exists for a user
    // SQL: SELECT EXISTS(SELECT 1 FROM user_profile WHERE user_id = ?)
    boolean existsByUserId(Long userId);
}
