package com.swapingeasy.controller;

import com.swapingeasy.entity.ProjectPost;
import com.swapingeasy.service.ProjectPostService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/projects")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class ProjectPostController {

    private final ProjectPostService service;

    @PostMapping
    public ProjectPost create(@RequestBody ProjectPost post) {
        return service.create(post);
    }

    @GetMapping
    public List<ProjectPost> getAll() {
        return service.getAll();
    }
}