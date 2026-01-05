package com.skillsphere.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skillsphere.backend.repo.HomeRepo;

@Service
public class HomeService {

    @Autowired
    HomeRepo homeRepo;

    public String getUser(){
        // String userName = homeRepo.get;
        return "Hello User";
    }
}
