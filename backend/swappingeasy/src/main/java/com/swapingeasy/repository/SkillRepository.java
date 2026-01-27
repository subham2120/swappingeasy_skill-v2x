package com.swapingeasy.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.swapingeasy.entity.Skill;

import java.util.List;

public interface SkillRepository extends JpaRepository<Skill, Long> {
    List<Skill> findByUserId(Long userId);

}
