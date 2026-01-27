package com.swapingeasy.controller;

import com.swapingeasy.dto.PublicProfileResponse;
import com.swapingeasy.dto.UpdateProfileRequest;
import com.swapingeasy.entity.User;
import com.swapingeasy.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/{userId}/public-profile")
    public ResponseEntity<PublicProfileResponse> getPublicProfile(
            @PathVariable Long userId) {

        return ResponseEntity.ok(userService.getPublicProfile(userId));
    }

    @PutMapping("/{id}/profile")
    public ResponseEntity<?> updateProfile(
            @PathVariable Long id,
            @RequestBody UpdateProfileRequest request
    ) {
        userService.updateProfile(id, request);
        return ResponseEntity.ok().build();
    }

}
