package com.swapingeasy.controller;

import com.swapingeasy.entity.Review;
import com.swapingeasy.service.ReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reviews")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class ReviewController {

    private final ReviewService reviewService;

    @PostMapping
    public Review addReview(@RequestBody Review review) {
        return reviewService.addReview(review);
    }

    @GetMapping("/{userId}")
    public List<Review> getReviews(@PathVariable Long userId) {
        return reviewService.getReviewsByUser(userId);
    }
}