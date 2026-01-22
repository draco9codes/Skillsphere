package com.skillsphere.backend.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skillsphere.backend.dto.SuggestionDTO;
import com.skillsphere.backend.entity.ModuleEntity;
import com.skillsphere.backend.repo.ModuleRepo;

@Service
public class ModuleService {

    @Autowired
    private ModuleRepo moduleRepo;

    public List<SuggestionDTO> getSuggestions(String query) {
        List<ModuleEntity> modules = moduleRepo.findByTitleContainingIgnoreCase(query);
        return modules.stream()
                      .map(m -> new SuggestionDTO(m.getTitle()))
                      .collect(Collectors.toList());
    }
}