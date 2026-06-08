package com.swapingeasy.dto;

public class ExchangeRequest {

    private Long requesterId;
    private Long ownerId;

    private Long requestedSkillId;
    private Long offeredSkillId;

    private Long requestedProductId;
    private Long offeredProductId;


// ===== GETTERS & SETTERS =====

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


}
