package com.swapingeasy.service;

import com.swapingeasy.entity.Conversation;
import com.swapingeasy.entity.Message;
import com.swapingeasy.repository.ConversationRepository;
import com.swapingeasy.repository.MessageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ConversationService {

    private final ConversationRepository conversationRepository;
    private final MessageRepository messageRepository;
    public Conversation getOrCreate(Long userA, Long userB) {

        return conversationRepository
                .findBetweenUsers(userA, userB)
                .orElseGet(() -> {
                    Conversation c = new Conversation();
                    c.setUser1Id(userA);
                    c.setUser2Id(userB);
                    c.setUpdatedAt(LocalDateTime.now());
                    return conversationRepository.save(c);
                });
    }

    public List<Message> getMessages(Long conversationId) {
        return messageRepository.findByConversationIdOrderByCreatedAtAsc(conversationId);
    }
    public Conversation save(Conversation conversation) {
        return conversationRepository.save(conversation);
    }


}

