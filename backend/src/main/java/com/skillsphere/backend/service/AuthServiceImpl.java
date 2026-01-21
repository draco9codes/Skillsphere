package com.skillsphere.backend.service;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.skillsphere.backend.config.JwtUtil;
import com.skillsphere.backend.dto.LoginRequestDTO;
import com.skillsphere.backend.dto.LoginResponseDTO;
import com.skillsphere.backend.dto.UserResponseDTO;
import com.skillsphere.backend.entity.UserEntity;
import com.skillsphere.backend.mapper.UserMapper;
import com.skillsphere.backend.repo.AuthRepo;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private static final Logger logger = LogManager.getLogger(AuthService.class);

    private final AuthRepo userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    private final UserMapper userMapper;

    @Override
    public LoginResponseDTO login(LoginRequestDTO request) {

        UserEntity user = userRepository
                .findByUsername(request.getEmail())
                .orElseThrow(() ->
                        new RuntimeException("Invalid credentials"));

        System.out.println("Raw password length: {}"+ request.getPassword().length());

        logger.info("Encoded password prefix: {}", user.getUserPassword().substring(0, 4));
        logger.info("Encoded password prefix: {}", request.getPassword().substring(0, 4));

        if (!passwordEncoder.matches(
                request.getPassword(),
                user.getUserPassword())) {
            throw new RuntimeException("Invalid credentials");
        }

        String token = jwtUtil.generateToken(user.getUsername());
        UserResponseDTO userDto = userMapper.toDto(user);

        return new LoginResponseDTO(token, userDto);
    }
}

