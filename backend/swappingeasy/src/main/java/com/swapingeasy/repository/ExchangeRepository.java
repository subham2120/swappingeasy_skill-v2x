package com.swapingeasy.repository;

import com.swapingeasy.entity.Exchange;
import com.swapingeasy.entity.ExchangeStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ExchangeRepository extends JpaRepository<Exchange, Long> {

    // owner ke paas aayi hui requests
    List<Exchange> findByOwnerId(Long ownerId);

    // requester ne bheji hui requests
    List<Exchange> findByRequesterId(Long requesterId);

    // chat unlock check (ACCEPTED hai ya nahi)

    long countByRequesterIdAndStatus(Long requesterId, ExchangeStatus status);

    long countByOwnerIdAndStatus(Long ownerId, ExchangeStatus status);

    boolean existsByOwnerIdAndRequesterIdAndStatus(
            Long ownerId,
            Long requesterId,
            ExchangeStatus status
    );

    boolean existsByRequesterIdAndOwnerIdAndStatus(
            Long requesterId,
            Long ownerId,
            ExchangeStatus status
    );

    long countByStatusAndOwnerIdOrRequesterId(
            ExchangeStatus status,
            Long ownerId,
            Long requesterId
    );

}
