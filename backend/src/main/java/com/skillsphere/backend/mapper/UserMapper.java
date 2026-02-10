package com.skillsphere.backend.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.skillsphere.backend.dto.UserResponseDTO;
import com.skillsphere.backend.entity.UserEntity;

@Mapper(componentModel = "spring")
public interface UserMapper {
    
    @Mapping(source = "userId", target = "id")
    @Mapping(source = "username", target = "email")
    @Mapping(source = "username", target = "name")
    UserResponseDTO toDto(UserEntity entity);
}
