package com.swapingeasy.controller;

import com.swapingeasy.dto.PublicProfileResponse;
import com.swapingeasy.dto.UpdateProfileRequest;
import com.swapingeasy.entity.User;
import com.swapingeasy.repository.UserRepository;
import com.swapingeasy.service.ExchangeService;
import com.swapingeasy.service.UserService;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.io.File;
import java.io.IOException;


@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    private final UserService userService;
    private final ExchangeService exchangeService;

    private final UserRepository userRepository;

    public UserController(UserService userService, ExchangeService exchangeService, UserRepository userRepository) {
        this.userService = userService;
        this.exchangeService = exchangeService;
        this.userRepository = userRepository;
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

    @PostMapping(
            value = "/{userId}/profile-image",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE
    )
    public ResponseEntity<String> uploadProfileImage(
            @PathVariable Long userId,
            @RequestParam("file") MultipartFile file
    ) {
        if (file.isEmpty()) {
            throw new RuntimeException("File is empty");
        }

        String baseDir = System.getProperty("user.dir");

        String uploadDir = baseDir + File.separator + "uploads"
                + File.separator + "profile";

        File dir = new File(uploadDir);

        // 🔥 directory create
        if (!dir.exists()) {
            dir.mkdirs();
        }

        String fileName =
                "user_" + userId + "_" + System.currentTimeMillis() + "_" +
                        file.getOriginalFilename();

        File dest = new File(dir, fileName);

        try {
            file.transferTo(dest);
        } catch (IOException e) {
            throw new RuntimeException("File upload failed", e);
        }

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setProfileImage("/images/profile/" + fileName);
        userRepository.save(user);

        return ResponseEntity.ok(user.getProfileImage());
    }







}
