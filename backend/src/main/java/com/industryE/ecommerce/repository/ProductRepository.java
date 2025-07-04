package com.industryE.ecommerce.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.industryE.ecommerce.entity.Product;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findByCategory(String category);
    List<Product> findByNameContainingIgnoreCase(String keyword);
    
    // Admin dashboard methods
    long countByInStock(Boolean inStock);
    List<Product> findByInStock(Boolean inStock);
    long countByCategory(String category);
    List<Product> findTop5ByOrderByCreatedAtDesc();
    
    @Query("SELECT DISTINCT p.category FROM Product p")
    List<String> findDistinctCategories();
}
