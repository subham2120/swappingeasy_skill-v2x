package com.swapingeasy.service;

import com.swapingeasy.entity.Review;
import com.swapingeasy.repository.ReviewRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ReviewService {

    private final ReviewRepository reviewRepository;

    public Review addReview(Review review) {
        return reviewRepository.save(review);
    }

    public List<Review> getReviewsByUser(Long userId) {
        return reviewRepository.findByRevieweeId(userId);
    }
}