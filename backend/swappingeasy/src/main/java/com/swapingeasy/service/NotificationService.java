package com.swapingeasy.service;

import com.swapingeasy.entity.Notification;
import com.swapingeasy.repository.NotificationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class NotificationService {
    private final NotificationRepository notificationRepository;
    public Notification create(
                Long userId,
                String message,
                String type) {

            Notification n = new Notification();

            n.setUserId(userId);
            n.setMessage(message);
            n.setType(type);

            return notificationRepository.save(n);
        }

    public List<Notification> getUserNotifications(Long userId) {
        return notificationRepository.findByUserIdOrderByCreatedAtDesc(userId);
    }

    }
