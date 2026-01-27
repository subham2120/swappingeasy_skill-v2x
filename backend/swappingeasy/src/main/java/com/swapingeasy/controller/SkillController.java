package com.swapingeasy.controller;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.swapingeasy.dto.SkillResponse;
import com.swapingeasy.entity.Skill;
import com.swapingeasy.repository.SkillRepository;
import com.swapingeasy.service.SkillService;

@RestController
@RequestMapping("/api/skills")
@CrossOrigin("*")
public class SkillController {

    private final SkillService skillService;
    private final SkillRepository skillRepository;

    public SkillController(SkillService skillService, SkillRepository skillRepository) {
        this.skillService = skillService;
        this.skillRepository = skillRepository;
    }

    // ✅ ADD SKILL WITH IMAGE
    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public Skill addSkill(
            @RequestParam("title") String title,
            @RequestParam("description") String description,
            @RequestParam("userId") Long userId,
            @RequestParam("image") MultipartFile image
    ) throws IOException {

        String fileName = System.currentTimeMillis() + "_" + image.getOriginalFilename();
        Path path = Paths.get("uploads/skills/" + fileName);
        Files.createDirectories(path.getParent());
        Files.write(path, image.getBytes());

        Skill skill = new Skill();
        skill.setTitle(title);
        skill.setDescription(description);
        skill.setUserId(userId);
        skill.setImageUrl(fileName);

        return skillRepository.save(skill);
    }

    // ✅ GET ALL SKILLS (DTO)
    @GetMapping
    public List<SkillResponse> getAllSkills() {
        return skillService.getAllSkills();
    }

    @GetMapping("/user/{userId}")
    public List<SkillResponse> getSkillsByUser(@PathVariable Long userId) {
        return skillService.getSkillsByUser(userId);
    }


    // ✅ DELETE SKILL
    @DeleteMapping("/{id}")
    public void deleteSkill(@PathVariable Long id) {
        skillService.deleteSkill(id);
    }
}
