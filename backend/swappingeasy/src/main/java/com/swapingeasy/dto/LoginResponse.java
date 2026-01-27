package com.swapingeasy.dto;

public class LoginResponse {

    private String message;
    private Long userId;
    private String name;
    private String email;

    public LoginResponse(String message, Long userId, String name, String email) {
        this.message = message;
        this.userId = userId;
        this.name = name;
        this.email = email;
    }

    public String getMessage() {
        return message;
    }

    public Long getUserId() {
        return userId;
    }

    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }
}
