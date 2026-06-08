package com.swapingeasy.repository;

import com.swapingeasy.entity.Exchange;
import com.swapingeasy.entity.ExchangeStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

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

    long countByOwnerIdOrRequesterIdAndStatusIn(
            Long ownerId,
            Long requesterId,
            List<ExchangeStatus> statuses
    );

    @Query("""
SELECT COUNT(e) > 0
FROM Exchange e
WHERE e.status = 'ACCEPTED'
AND (
     (e.ownerId = :user1 AND e.requesterId = :user2)
  OR (e.ownerId = :user2 AND e.requesterId = :user1)
)
""")
    boolean canChat(
            @Param("user1") Long user1,
            @Param("user2") Long user2
    );



}
