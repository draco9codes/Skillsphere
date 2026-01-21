package com.skillsphere.backend.service;

import com.skillsphere.backend.dto.LoginRequestDTO;
import com.skillsphere.backend.dto.LoginResponseDTO;

public interface AuthService {
    LoginResponseDTO login(LoginRequestDTO request);
}