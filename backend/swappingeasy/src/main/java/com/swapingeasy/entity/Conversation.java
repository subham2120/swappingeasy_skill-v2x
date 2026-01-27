package com.swapingeasy.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "conversation")
public class Conversation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user1_id", nullable = false)
    private Long user1Id;

    @Column(name = "user2_id", nullable = false)
    private Long user2Id;

    @Column(name = "last_message", length = 500)
    private String lastMessage;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    // getters setters
    public Long getId() { return id; }
    public Long getUser1Id() { return user1Id; }
    public Long getUser2Id() { return user2Id; }
    public String getLastMessage() { return lastMessage; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }

    public void setId(Long id) { this.id = id; }
    public void setUser1Id(Long user1Id) { this.user1Id = user1Id; }
    public void setUser2Id(Long user2Id) { this.user2Id = user2Id; }
    public void setLastMessage(String lastMessage) { this.lastMessage = lastMessage; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
}
