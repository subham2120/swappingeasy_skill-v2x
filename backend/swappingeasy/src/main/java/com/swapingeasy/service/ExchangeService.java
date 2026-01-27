package com.swapingeasy.service;

import java.util.List;
import java.util.Optional;

import com.swapingeasy.dto.ExchangeResponse;
import com.swapingeasy.entity.Conversation;
import com.swapingeasy.entity.Exchange;
import com.swapingeasy.entity.ExchangeStatus;
import com.swapingeasy.repository.ConversationRepository;
import com.swapingeasy.repository.ExchangeRepository;
import com.swapingeasy.repository.SkillRepository;
import com.swapingeasy.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ExchangeService {

    private final ExchangeRepository exchangeRepository;
    private final UserRepository userRepository;
    private final SkillRepository skillRepository;
    private final ConversationRepository conversationRepository;

    public ExchangeService(
            ExchangeRepository exchangeRepository,
            UserRepository userRepository,
            SkillRepository skillRepository,
            ConversationRepository conversationRepository
    ) {
        this.exchangeRepository = exchangeRepository;
        this.userRepository = userRepository;
        this.skillRepository = skillRepository;
        this.conversationRepository = conversationRepository;
    }

    // ✅ CREATE
    public Exchange createExchange(Exchange exchange) {
        exchange.setStatus(ExchangeStatus.PENDING);
        return exchangeRepository.save(exchange);
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

        // 🔥 CHECK EXISTING CONVERSATION (CORRECT METHOD)
        Optional<Conversation> existing =
                conversationRepository.findBetweenUsers(requesterId, ownerId);

        if (existing.isEmpty()) {
            Conversation conversation = new Conversation();
            conversation.setUser1Id(requesterId);
            conversation.setUser2Id(ownerId);
            // ❌ user_low / user_high SET MAT KARO (DB GENERATED)
            conversationRepository.save(conversation);
        }

        return exchange;
    }

    // ✅ REJECT
    public Exchange rejectExchange(Long id) {
        Exchange exchange = exchangeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Exchange not found"));
        exchange.setStatus(ExchangeStatus.REJECTED);
        return exchangeRepository.save(exchange);
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

        res.setRequestedSkillTitle(
                skillRepository.findById(e.getRequestedSkillId())
                        .map(s -> s.getTitle())
                        .orElse("Unknown Skill")
        );

        res.setOfferedSkillTitle(
                skillRepository.findById(e.getOfferedSkillId())
                        .map(s -> s.getTitle())
                        .orElse("Unknown Skill")
        );

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
        return exchangeRepository.countByStatusAndOwnerIdOrRequesterId(
                ExchangeStatus.ACCEPTED,
                userId,
                userId
        );
    }

}
