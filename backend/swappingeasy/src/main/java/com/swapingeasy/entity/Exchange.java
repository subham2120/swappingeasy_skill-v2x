package com.swapingeasy.entity;

import jakarta.persistence.*;

@Entity
public class Exchange {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long requesterId;       // request bhejne wala
    private Long ownerId;           // skill owner

    private Long requestedSkillId;  // jo chahiye
    private Long offeredSkillId;    // jo de raha hai

    public Long getRequestedProductId() {
        return requestedProductId;
    }

    public void setRequestedProductId(Long requestedProductId) {
        this.requestedProductId = requestedProductId;
    }

    public Long getOfferedProductId() {
        return offeredProductId;
    }

    public void setOfferedProductId(Long offeredProductId) {
        this.offeredProductId = offeredProductId;
    }

    private Long requestedProductId;
    private Long offeredProductId;

    public ExchangeStatus getStatus() {
        return status;
    }

    public void setStatus(ExchangeStatus status) {
        this.status = status;
    }

    @Enumerated(EnumType.STRING)
    private ExchangeStatus status;
    // PENDING / ACCEPTED / REJECTED

    // ===== GETTERS & SETTERS =====

    public Long getId() {
        return id;
    }

    public Long getRequesterId() {
        return requesterId;
    }

    public void setRequesterId(Long requesterId) {
        this.requesterId = requesterId;
    }

    public Long getOwnerId() {
        return ownerId;
    }

    public void setOwnerId(Long ownerId) {
        this.ownerId = ownerId;
    }

    public Long getRequestedSkillId() {
        return requestedSkillId;
    }

    public void setRequestedSkillId(Long requestedSkillId) {
        this.requestedSkillId = requestedSkillId;
    }

    public Long getOfferedSkillId() {
        return offeredSkillId;
    }

    public void setOfferedSkillId(Long offeredSkillId) {
        this.offeredSkillId = offeredSkillId;
    }



}
