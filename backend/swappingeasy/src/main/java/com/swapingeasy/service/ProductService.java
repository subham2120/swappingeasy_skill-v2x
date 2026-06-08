package com.swapingeasy.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.swapingeasy.dto.SkillResponse;
import com.swapingeasy.entity.Product;
import com.swapingeasy.entity.User;
import com.swapingeasy.repository.ProductRepository;
import com.swapingeasy.repository.UserRepository;

@Service
public class ProductService {

    private final ProductRepository productRepository;
    private final UserRepository userRepository;

    public ProductService(ProductRepository productRepository,
                          UserRepository userRepository) {
        this.productRepository = productRepository;
        this.userRepository = userRepository;
    }

    // ✅ ADD PRODUCT (same style as skill)
    public Product addProduct(Product product) {
        return productRepository.save(product);
    }

    // ✅ GET ALL PRODUCTS WITH USERNAME (SAME AS SKILL)
    public List<SkillResponse> getAllProducts() {

        List<Product> products = productRepository.findAll();
        List<SkillResponse> responseList = new ArrayList<>();

        for (Product product : products) {

            User user = userRepository.findById(product.getUserId()).orElse(null);

            SkillResponse sr = new SkillResponse();
            sr.setId(product.getId());
            sr.setTitle(product.getTitle());
            sr.setDescription(product.getDescription());
            sr.setUserId(product.getUserId());
            sr.setUsername(user != null ? user.getName() : "Unknown User");
            sr.setImageUrl(product.getImageUrl()); // ✅ IMPORTANT

            responseList.add(sr);
        }

        return responseList;
    }

    // ✅ GET PRODUCTS BY USER (OPTIONAL BUT USEFUL)
    public List<SkillResponse> getProductsByUser(Long userId) {

        List<Product> products = productRepository.findByUserId(userId);
        List<SkillResponse> list = new ArrayList<>();

        User user = userRepository.findById(userId).orElse(null);

        for (Product product : products) {
            SkillResponse sr = new SkillResponse();
            sr.setId(product.getId());
            sr.setTitle(product.getTitle());
            sr.setDescription(product.getDescription());
            sr.setUserId(product.getUserId());
            sr.setUsername(user != null ? user.getName() : "Unknown User");
            sr.setImageUrl(product.getImageUrl());
            list.add(sr);
        }

        return list;
    }

    public void deleteProduct(Long id) {
        productRepository.deleteById(id);
    }
}
