package com.swapingeasy.service;

import com.swapingeasy.dto.MessageRequest;
import com.swapingeasy.entity.Conversation;
import com.swapingeasy.entity.ExchangeStatus;
import com.swapingeasy.entity.Message;
import com.swapingeasy.repository.ExchangeRepository;
import com.swapingeasy.repository.MessageRepository;
import com.swapingeasy.repository.ConversationRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MessageService {

    private final ConversationService conversationService;
    private final MessageRepository messageRepository;
    private final ExchangeRepository exchangeRepository;
    private final ConversationRepository conversationRepository;

    public MessageService(
            ConversationService conversationService,
            MessageRepository messageRepository,
            ExchangeRepository exchangeRepository,
            ConversationRepository conversationRepository
    ) {
        this.conversationService = conversationService;
        this.messageRepository = messageRepository;
        this.exchangeRepository = exchangeRepository;
        this.conversationRepository = conversationRepository;
    }

    public List<Message> getMessages(Long conversationId) {
        return messageRepository
                .findByConversationIdOrderByCreatedAtAsc(conversationId);
    }

    @Transactional
    public void sendMessage(MessageRequest request) {

        Long senderId = request.getSenderId();
        Long receiverId = request.getReceiverId();

        // ✅ STEP 1: ACCEPTED exchange check (BOTH DIRECTIONS)
        boolean allowed =
                exchangeRepository.existsByOwnerIdAndRequesterIdAndStatus(
                        senderId,
                        receiverId,
                        ExchangeStatus.ACCEPTED
                )
                        ||
                        exchangeRepository.existsByOwnerIdAndRequesterIdAndStatus(
                                receiverId,
                                senderId,
                                ExchangeStatus.ACCEPTED
                        );

        if (!allowed) {
            throw new RuntimeException(
                    "Message allowed only after exchange is ACCEPTED"
            );
        }

        // ✅ STEP 2: Get or create conversation
        Conversation conversation =
                conversationService.getOrCreate(senderId, receiverId);

        // ✅ STEP 3: Save message
        Message message = new Message();
        message.setConversation(conversation);
        message.setSenderId(senderId);
        message.setReceiverId(receiverId);
        message.setContent(request.getContent());

        messageRepository.save(message);

        // ✅ STEP 4: Update last_message only
        conversation.setLastMessage(request.getContent());
        conversationRepository.save(conversation);
        // ❌ updatedAt ko mat chhedo (DB auto handle karega)
    }
}
