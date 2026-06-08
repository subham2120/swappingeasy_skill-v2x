package com.swapingeasy.service;

import com.swapingeasy.entity.ProjectPost;
import com.swapingeasy.repository.ProjectPostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProjectPostService {

    private final ProjectPostRepository repository;

    public ProjectPost create(ProjectPost post) {
        return repository.save(post);
    }

    public List<ProjectPost> getAll() {
        return repository.findAll();
    }
}