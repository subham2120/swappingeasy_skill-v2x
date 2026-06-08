package com.swapingeasy.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name="notification")
@Data
@AllArgsConstructor
@NoArgsConstructor public class Notification {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId;

    private String message;

    private String type;

    private boolean isRead = false;

    @CreationTimestamp
    private LocalDateTime createdAt = LocalDateTime.now();
}
