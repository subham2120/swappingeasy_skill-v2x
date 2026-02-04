package com.swapingeasy.repository;

import com.swapingeasy.entity.Skill;
import org.springframework.data.jpa.repository.JpaRepository;
import com.swapingeasy.entity.Product;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findByUserId(Long userId);
}

