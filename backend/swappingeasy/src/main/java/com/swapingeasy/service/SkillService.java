package com.swapingeasy.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.swapingeasy.dto.SkillResponse;
import com.swapingeasy.entity.Skill;
import com.swapingeasy.entity.User;
import com.swapingeasy.repository.SkillRepository;
import com.swapingeasy.repository.UserRepository;

@Service
public class SkillService {

    private final SkillRepository skillRepository;
    private final UserRepository userRepository;

    public SkillService(SkillRepository skillRepository, UserRepository userRepository) {
        this.skillRepository = skillRepository;
        this.userRepository = userRepository;
    }

    // ADD SKILL (same as before)
    public Skill addSkill(Skill skill) {
        return skillRepository.save(skill);
    }

    // GET ALL SKILLS WITH USERNAME (MAIN FIX)
    public List<SkillResponse> getAllSkills() {

        List<Skill> skills = skillRepository.findAll();
        List<SkillResponse> responseList = new ArrayList<>();

        for (Skill skill : skills) {

            User user = userRepository.findById(skill.getUserId()).orElse(null);

            SkillResponse sr = new SkillResponse();
            sr.setId(skill.getId());
            sr.setTitle(skill.getTitle());
            sr.setDescription(skill.getDescription());
            sr.setUserId(skill.getUserId());
            sr.setUsername(user != null ? user.getName() : "Unknown User");
            sr.setImageUrl(skill.getImageUrl()); // ✅ IMPORTANT

            responseList.add(sr);
        }

        return responseList;
    }

    public List<SkillResponse> getSkillsByUser(Long userId) {
        List<Skill> skills = skillRepository.findByUserId(userId);
        List<SkillResponse> list = new ArrayList<>();

        User user = userRepository.findById(userId).orElse(null);

        for (Skill skill : skills) {
            SkillResponse sr = new SkillResponse();
            sr.setId(skill.getId());
            sr.setTitle(skill.getTitle());
            sr.setDescription(skill.getDescription());
            sr.setUserId(skill.getUserId());
            sr.setUsername(user != null ? user.getName() : "Unknown User");
            sr.setImageUrl(skill.getImageUrl());
            list.add(sr);
        }
        return list;
    }


    public void deleteSkill(Long id) {
        skillRepository.deleteById(id);
    }
}
