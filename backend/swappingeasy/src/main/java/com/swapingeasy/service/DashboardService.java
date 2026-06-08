package com.swapingeasy.service;

import com.swapingeasy.dto.DashboardResponse;
import com.swapingeasy.entity.ExchangeStatus;
import com.swapingeasy.repository.ExchangeRepository;
import com.swapingeasy.repository.MessageRepository;
import com.swapingeasy.repository.ProductRepository;
import com.swapingeasy.repository.SkillRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DashboardService {

    private final SkillRepository skillRepository;
    private final ProductRepository productRepository;
    private final ExchangeRepository exchangeRepository;
    private final MessageRepository messageRepository;

    public DashboardResponse getDashboardStats(Long userId) {

        long totalSkills =
                skillRepository.findByUserId(userId).size();

        long totalProducts =
                productRepository.findByUserId(userId).size();

        long pendingExchanges =
                exchangeRepository.countByOwnerIdOrRequesterIdAndStatusIn(
                        userId,
                        userId,
                        List.of(ExchangeStatus.PENDING)
                );

        long completedExchanges =
                exchangeRepository.countByOwnerIdOrRequesterIdAndStatusIn(
                        userId,
                        userId,
                        List.of(ExchangeStatus.ACCEPTED)
                );

        long totalMessages =
                messageRepository.count();

        double averageRating = 0.0;

        return new DashboardResponse(
                totalSkills,
                totalProducts,
                pendingExchanges,
                completedExchanges,
                totalMessages,
                averageRating
        );
    }
}
