package com.skillsphere.backend.repo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skillsphere.backend.entity.HomeEntity;

public interface HomeRepo extends JpaRepository<HomeEntity, Integer>{

  Optional<HomeEntity> findByUserId(int userId) ;   

}
