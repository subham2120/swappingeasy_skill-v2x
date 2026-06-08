package com.swapingeasy.repository;

import com.swapingeasy.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReviewRepository extends JpaRepository<Review, Long> {

    List<Review> findByRevieweeId(Long revieweeId);

}