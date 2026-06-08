package com.swapingeasy.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DashboardResponse {

    private long totalSkills;
    private long totalProducts;
    private long pendingExchanges;
    private long completedExchanges;
    private long totalMessages;
    private double averageRating;
}