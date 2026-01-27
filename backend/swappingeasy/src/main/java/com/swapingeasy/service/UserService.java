package com.swapingeasy.service;

import com.swapingeasy.dto.*;
import com.swapingeasy.entity.ExchangeStatus;
import com.swapingeasy.entity.Skill;
import com.swapingeasy.repository.ExchangeRepository;
import com.swapingeasy.repository.SkillRepository;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.swapingeasy.entity.User;
import com.swapingeasy.repository.UserRepository;

import java.util.List;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final SkillRepository skillRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository,
                       SkillRepository skillRepository,
                       PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.skillRepository = skillRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public User register(RegisterRequest request) {
        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole("USER");
        return userRepository.save(user);
    }

    public LoginResponse login(LoginRequest request) {

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid password");
        }

        return new LoginResponse(
                "Login successful",
                user.getId(),
                user.getName(),
                user.getEmail()
        );
    }

    public PublicProfileResponse getPublicProfile(Long userId) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        List<Skill> skills = skillRepository.findByUserId(userId);

        List<PublicSkillResponse> skillResponses = skills.stream().map(skill -> {
            PublicSkillResponse dto = new PublicSkillResponse();
            dto.setId(skill.getId());
            dto.setTitle(skill.getTitle());
            dto.setDescription(skill.getDescription());
            dto.setImageUrl(skill.getImageUrl());
            return dto;
        }).toList();

        PublicProfileResponse response = new PublicProfileResponse();
        response.setUserId(user.getId());
        response.setUsername(user.getName());
        response.setProfileImage(null);
        response.setSkills(skillResponses);

        return response;
    }

    public void updateProfile(Long userId, UpdateProfileRequest request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setName(request.getUsername());
        user.setBio(request.getBio());

        userRepository.save(user);
    }
    public long getExchangeCount(Long userId) {
        ExchangeRepository exchangeRepository = null;
        long asRequester =
                exchangeRepository.countByRequesterIdAndStatus(
                        userId,
                        ExchangeStatus.ACCEPTED
                );

        long asOwner =
                exchangeRepository.countByOwnerIdAndStatus(
                        userId,
                        ExchangeStatus.ACCEPTED
                );

        return asRequester + asOwner;
    }


}
