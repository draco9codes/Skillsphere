package com.skillsphere.backend.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skillsphere.backend.entity.HomeEntity;
import com.skillsphere.backend.repo.HomeRepo;

@Service
public class HomeService {

    @Autowired
    HomeRepo homeRepo;

    public String getUser(){
        Optional<HomeEntity> userDetails = homeRepo.findByUserId(1);
        String userName = userDetails.map(HomeEntity::getUserName).orElse("Guest");
                return "Hello "+userName;
    }
}
