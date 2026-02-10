package com.skillsphere.backend.repo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.skillsphere.backend.entity.HomeEntity;

@Repository
public interface HomeRepo extends JpaRepository<HomeEntity, Integer>{

  Optional<HomeEntity> findByUserId(int userId) ;   

}
