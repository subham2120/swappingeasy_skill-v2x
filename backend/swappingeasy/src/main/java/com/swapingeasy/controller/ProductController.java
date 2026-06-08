package com.swapingeasy.controller;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

import com.swapingeasy.dto.SkillResponse;
import com.swapingeasy.entity.Skill;
import com.swapingeasy.repository.ProductRepository;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import com.swapingeasy.entity.Product;
import com.swapingeasy.service.ProductService;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/products")
@CrossOrigin("*")
public class ProductController {

    private final ProductService productService;
    private final ProductRepository productRepository;

    public ProductController(ProductService productService, ProductRepository productRepository) {
        this.productService = productService;
        this.productRepository = productRepository;
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public Product addProduct(
            @RequestParam("title") String title,
            @RequestParam("description") String description,
            @RequestParam("userId") Long userId,
            @RequestParam("image") MultipartFile image
    ) throws IOException {

        String fileName = System.currentTimeMillis() + "_" + image.getOriginalFilename();
        Path path = Paths.get("uploads/products/" + fileName);
        Files.createDirectories(path.getParent());
        Files.write(path, image.getBytes());

        Product product = new Product();
        product.setTitle(title);
        product.setDescription(description);
        product.setUserId(userId);
        product.setImageUrl(fileName);

        return productRepository.save(product);
    }

    @GetMapping
    public List<SkillResponse> getAllProducts() {
        return productService.getAllProducts();
    }

    @GetMapping("/user/{userId}")
    public List<SkillResponse> getProductsByUser(@PathVariable Long userId) {
        return productService.getProductsByUser(userId);
    }




    @DeleteMapping("/{id}")
    public void deleteProduct(@PathVariable Long id) {
        productService.deleteProduct(id);
    }
}

