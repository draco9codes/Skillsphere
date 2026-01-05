package com.skillsphere.backend.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skillsphere.backend.entity.HomeEntity;

public interface HomeRepo extends JpaRepository<HomeEntity, Integer>{

    

}
