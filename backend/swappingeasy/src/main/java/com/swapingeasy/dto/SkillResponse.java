package com.swapingeasy.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SkillResponse {

    private Long id;
    private String title;
    private String description;
    private Long userId;
    private String username;
    private String imageUrl;



}
