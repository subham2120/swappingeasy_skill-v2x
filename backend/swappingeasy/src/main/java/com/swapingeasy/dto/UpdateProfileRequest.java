package com.swapingeasy.dto;

public class UpdateProfileRequest {

    private String username;
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


    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getBio() {
        return bio;
    }

    public void setBio(String bio) {
        this.bio = bio;
    }
}
