package com.swapingeasy.dto;

import java.util.List;

public class PublicProfileResponse {

    private Long userId;
    private String username;
    private String profileImage;
    private List<PublicSkillResponse> skills;
    private String bio;

    public long getExchangeCount() {
        return exchangeCount;
    }

    public void setExchangeCount(long exchangeCount) {
        this.exchangeCount = exchangeCount;
    }

    public long getConnectionCount() {
        return connectionCount;
    }

    public void setConnectionCount(long connectionCount) {
        this.connectionCount = connectionCount;
    }

    private long exchangeCount;
    private long connectionCount;


    public String getBio() {
        return bio;
    }

    public void setBio(String bio) {
        this.bio = bio;
    }


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



    // getters & setters
}
