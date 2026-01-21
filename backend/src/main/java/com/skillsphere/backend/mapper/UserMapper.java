package com.skillsphere.backend.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.skillsphere.backend.dto.UserResponseDTO;
import com.skillsphere.backend.entity.UserEntity;

@Mapper(componentModel = "spring")
public interface UserMapper {
    @Mapping(source = "username", target = "email")
    UserResponseDTO toDto(UserEntity entity);
}

