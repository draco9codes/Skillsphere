package com.skillsphere.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skillsphere.backend.service.HomeService;

@RestController
@RequestMapping("/home")
@CrossOrigin(origins = "http://localhost:5173")
public class HomeController {

    @Autowired
    HomeService homeService;

    @GetMapping("/welcome")
    public String welcomeUser() throws Exception {
        return homeService.getUser();
    }
}
