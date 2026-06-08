package com.swapingeasy.service;

import java.util.List;
import java.util.Optional;

import com.swapingeasy.dto.ExchangeResponse;
import com.swapingeasy.entity.Conversation;
import com.swapingeasy.entity.Exchange;
import com.swapingeasy.entity.ExchangeStatus;
import com.swapingeasy.repository.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ExchangeService {

    private final ExchangeRepository exchangeRepository;
    private final UserRepository userRepository;
    private final SkillRepository skillRepository;
    private final ConversationRepository conversationRepository;
    private final ProductRepository productRepository;

    private final NotificationService notificationService;

    public ExchangeService(
            ExchangeRepository exchangeRepository,
            UserRepository userRepository,
            SkillRepository skillRepository,
            ConversationRepository conversationRepository,
            ProductRepository productRepository, NotificationService notificationService) {
        this.exchangeRepository = exchangeRepository;
        this.userRepository = userRepository;
        this.skillRepository = skillRepository;
        this.conversationRepository = conversationRepository;
        this.productRepository = productRepository;
        this.notificationService = notificationService;
    }

    // ✅ CREATE
    public Exchange createExchange(Exchange exchange) {
        exchange.setStatus(ExchangeStatus.PENDING);
        Exchange savedExchange = exchangeRepository.save(exchange);

        notificationService.create(
                exchange.getOwnerId(),
                "New exchange request received",
                "EXCHANGE_REQUEST"
        );
        return savedExchange;
    }

    // ✅ ACCEPT (🔥 MAIN FIX HERE)
    @Transactional
    public Exchange acceptExchange(Long id) {

        Exchange exchange = exchangeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Exchange not found"));

        exchange.setStatus(ExchangeStatus.ACCEPTED);
        exchangeRepository.save(exchange);

        Long requesterId = exchange.getRequesterId();
        Long ownerId = exchange.getOwnerId();

        Optional<Conversation> existing =
                conversationRepository.findBetweenUsers(requesterId, ownerId);

        if (existing.isEmpty()) {
            Conversation conversation = new Conversation();
            conversation.setUser1Id(requesterId);
            conversation.setUser2Id(ownerId);
            conversationRepository.save(conversation);
        }
        notificationService.create(
                requesterId,
                "Your exchange request has been accepted",
                "EXCHANGE_ACCEPTED"
        );
        return exchange;
    }

    // ✅ REJECT
    public Exchange rejectExchange(Long id) {
        Exchange exchange = exchangeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Exchange not found"));
        exchange.setStatus(ExchangeStatus.REJECTED);
        Exchange saved =exchangeRepository.save(exchange);
        notificationService.create(
                exchange.getRequesterId(),
                "Your exchange request has been rejected",
                "EXCHANGE_REJECTED"
        );
        return saved;
    }

    // ✅ DELETE
    public void deleteExchange(Long id) {
        exchangeRepository.deleteById(id);
    }

    // 🔁 ENTITY → DTO (🔥 IDs + Names both)
    private ExchangeResponse mapToResponse(Exchange e) {

        ExchangeResponse res = new ExchangeResponse();
        res.setId(e.getId());
        res.setStatus(e.getStatus());

        // 🔥 IMPORTANT FOR CHAT
        res.setRequesterId(e.getRequesterId());
        res.setOwnerId(e.getOwnerId());

        res.setRequesterName(
                userRepository.findById(e.getRequesterId())
                        .map(u -> u.getName())
                        .orElse("Unknown User")
        );

        res.setOwnerName(
                userRepository.findById(e.getOwnerId())
                        .map(u -> u.getName())
                        .orElse("Unknown User")
        );

        if (e.getRequestedSkillId() != null) {
            res.setRequestedSkillTitle(
                    skillRepository.findById(e.getRequestedSkillId())
                            .map(s -> s.getTitle())
                            .orElse("Unknown Skill")
            );
        }

        if (e.getOfferedSkillId() != null) {
            res.setOfferedSkillTitle(
                    skillRepository.findById(e.getOfferedSkillId())
                            .map(s -> s.getTitle())
                            .orElse("Unknown Skill")
            );
        }



        if (e.getRequestedProductId() != null) {
            res.setRequestedProductTitle(
                    productRepository.findById(e.getRequestedProductId())
                            .map(p -> p.getTitle())
                            .orElse("Unknown Product")
            );
        }

        if (e.getOfferedProductId() != null) {
            res.setOfferedProductTitle(
                    productRepository.findById(e.getOfferedProductId())
                            .map(p -> p.getTitle())
                            .orElse("Unknown Product")
            );
        }
        return res;
    }

    // ✅ SENT REQUESTS
    public List<ExchangeResponse> getByRequester(Long requesterId) {
        return exchangeRepository.findByRequesterId(requesterId)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    // ✅ RECEIVED REQUESTS
    public List<ExchangeResponse> getByOwner(Long ownerId) {
        return exchangeRepository.findByOwnerId(ownerId)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    public long getConnectionCount(Long userId) {
        return exchangeRepository.countByOwnerIdOrRequesterIdAndStatusIn(
                userId,
                userId,
                List.of(ExchangeStatus.PENDING, ExchangeStatus.REJECTED)
        );
    }



}
