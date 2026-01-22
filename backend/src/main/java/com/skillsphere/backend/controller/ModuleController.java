package com.skillsphere.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.skillsphere.backend.dto.SuggestionDTO;
import com.skillsphere.backend.service.ModuleService;

@RestController
@RequestMapping("/api/modules")
@CrossOrigin(origins = "http://localhost:5173")
public class ModuleController {

    @Autowired
    private ModuleService moduleService;

    @GetMapping("/autocomplete")
    public List<SuggestionDTO> autocomplete(@RequestParam("q") String query) {
        return moduleService.getSuggestions(query);
    }
}