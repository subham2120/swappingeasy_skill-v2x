package com.swapingeasy.repository;

import com.swapingeasy.entity.Conversation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ConversationRepository extends JpaRepository<Conversation, Long> {

    @Query("""
        SELECT c FROM Conversation c
        WHERE (c.user1Id = :u1 AND c.user2Id = :u2)
           OR (c.user1Id = :u2 AND c.user2Id = :u1)
    """)
    Optional<Conversation> findBetweenUsers(
            @Param("u1") Long u1,
            @Param("u2") Long u2
    );

    @Query("""
        SELECT c FROM Conversation c
        WHERE c.user1Id = :userId OR c.user2Id = :userId
        ORDER BY c.updatedAt DESC
    """)
    List<Conversation> findByUser(@Param("userId") Long userId);
}
