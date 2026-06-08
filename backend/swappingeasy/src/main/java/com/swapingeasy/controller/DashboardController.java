package com.swapingeasy.controller;

import com.swapingeasy.dto.DashboardResponse;
import com.swapingeasy.service.DashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/dashboard")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class DashboardController {

    private final DashboardService dashboardService;

    @GetMapping("/{userId}")
    public DashboardResponse getDashboard(
            @PathVariable Long userId
    ) {
        return dashboardService.getDashboardStats(userId);
    }
}