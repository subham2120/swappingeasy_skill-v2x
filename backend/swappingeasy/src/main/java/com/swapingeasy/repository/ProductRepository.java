package com.swapingeasy.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.swapingeasy.entity.Product;

public interface ProductRepository extends JpaRepository<Product, Long> {
}

