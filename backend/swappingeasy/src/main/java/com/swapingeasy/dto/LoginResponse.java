package com.swapingeasy.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LoginResponse {

    private String message;
    private String token;
    private Long userId;
    private String name;
    private String email;

    public LoginResponse(String message, Long userId, String name, String email,String token) {
        this.message = message;
        this.userId = userId;
        this.name = name;
        this.email = email;
        this.token=token;
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
