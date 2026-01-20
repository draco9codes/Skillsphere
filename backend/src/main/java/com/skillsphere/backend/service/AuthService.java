package com.skillsphere.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skillsphere.backend.repo.AuthRepo;

@Service
public class AuthService {
    
    @Autowired
    AuthRepo authRepo;

    public boolean validateUser(String username, String password) {
        var user = authRepo.findByUsername(username);
        if (user != null && user.getUserPassword().equals(password)) {
            return true;
        }
        return false;
    }
}
