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
    private final ConversationService conversationService;
    public Notification create(
                Long userId,
                String message,
                String type) {

            Notification notification = new Notification();

            notification.setUserId(userId);
            notification.setMessage(message);
            notification.setType(type);

            return notificationRepository.save(notification);
        }

    public List<Notification> getUserNotifications(Long userId) {
        return notificationRepository.findByUserIdOrderByCreatedAtDesc(userId);
    }

    }
