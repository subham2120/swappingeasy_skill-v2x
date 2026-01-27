package com.swapingeasy.dto;

import java.util.List;

public class PublicProfileResponse {
    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getProfileImage() {
        return profileImage;
    }

    public void setProfileImage(String profileImage) {
        this.profileImage = profileImage;
    }

    public List<PublicSkillResponse> getSkills() {
        return skills;
    }

    public void setSkills(List<PublicSkillResponse> skills) {
        this.skills = skills;
    }

    private Long userId;
    private String username;
    private String profileImage;
    private List<PublicSkillResponse> skills;

    // getters & setters
}
