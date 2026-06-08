package com.swapingeasy.controller;

import com.swapingeasy.entity.Notification;
import com.swapingeasy.service.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notifications")
@RequiredArgsConstructor
@CrossOrigin("*")
public class NotificationController {

    private final NotificationService service;

    @GetMapping("/{userId}")
    public List<Notification> getAll(
            @PathVariable Long userId) {

        return service.getUserNotifications(userId);
    }
}
