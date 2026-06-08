package com.swapingeasy.dto;

import com.swapingeasy.entity.ExchangeStatus;

public class ExchangeResponse {

    private Long id;

    // 🔥 ADD THESE (VERY IMPORTANT)
    private Long requesterId;
    private Long ownerId;

    private ExchangeStatus status;

    private String requesterName;
    private String ownerName;

    private String requestedSkillTitle;
    private String offeredSkillTitle;



    private String requestedProductTitle;
    private String offeredProductTitle;

    // ===== GETTERS & SETTERS =====

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public ExchangeStatus getStatus() {
        return status;
    }

    public void setStatus(ExchangeStatus status) {
        this.status = status;
    }

    public String getRequesterName() {
        return requesterName;
    }

    public void setRequesterName(String requesterName) {
        this.requesterName = requesterName;
    }

    public String getOwnerName() {
        return ownerName;
    }

    public void setOwnerName(String ownerName) {
        this.ownerName = ownerName;
    }

    public String getRequestedSkillTitle() {
        return requestedSkillTitle;
    }

    public void setRequestedSkillTitle(String requestedSkillTitle) {
        this.requestedSkillTitle = requestedSkillTitle;
    }

    public String getOfferedSkillTitle() {
        return offeredSkillTitle;
    }

    public void setOfferedSkillTitle(String offeredSkillTitle) {
        this.offeredSkillTitle = offeredSkillTitle;
    }

    public String getRequestedProductTitle() {
        return requestedProductTitle;
    }

    public void setRequestedProductTitle(String requestedProductTitle) {
        this.requestedProductTitle = requestedProductTitle;
    }

    public String getOfferedProductTitle() {
        return offeredProductTitle;
    }

    public void setOfferedProductTitle(String offeredProductTitle) {
        this.offeredProductTitle = offeredProductTitle;
    }
}
