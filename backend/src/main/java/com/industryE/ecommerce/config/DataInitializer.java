package com.industryE.ecommerce.config;

import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.industryE.ecommerce.entity.Product;
import com.industryE.ecommerce.repository.ProductRepository;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private ProductRepository productRepository;

    @Override
    public void run(String... args) throws Exception {
        // Only populate products if the database is empty
        if (productRepository.count() == 0) {
            List<Product> sampleProducts = Arrays.asList(
                new Product(
                    "Air Max 90",
                    "Iconic cushioned running shoes with visible air unit for comfort and style.",
                    129.99,
                    "https://images.unsplash.com/photo-1605348532760-6753d2c43329",
                    "running"
                ),
                new Product(
                    "Ultra Boost",
                    "Responsive running shoes with energy-returning boost technology.",
                    179.99,
                    "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2",
                    "running"
                ),
                new Product(
                    "Classic Leather",
                    "Timeless casual shoes with soft leather upper and cushioned midsole.",
                    89.99,
                    "https://images.unsplash.com/photo-1595341888016-a392ef81b7de",
                    "casual"
                ),
                new Product(
                    "Chuck Taylor All Star",
                    "Iconic canvas sneakers with timeless design.",
                    59.99,
                    "https://images.unsplash.com/photo-1607522370275-f14206abe5d3",
                    "casual"
                ),
                new Product(
                    "Pro Basketball Shoes",
                    "High-performance basketball shoes with ankle support and responsive cushioning.",
                    149.99,
                    "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
                    "sports"
                ),
                new Product(
                    "Limited Edition Collab",
                    "Designer collaboration sneakers with unique patterns and premium materials.",
                    249.99,
                    "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77",
                    "limited"
                ),
                new Product(
                    "Flex Runner",
                    "Lightweight and flexible running shoes for everyday training.",
                    79.99,
                    "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa",
                    "running"
                ),
                new Product(
                    "Sport Soccer Cleats",
                    "Professional soccer cleats with superior grip and ball control.",
                    119.99,
                    "https://images.unsplash.com/photo-1511886929837-354d827aae26",
                    "sports"
                )
            );
            
            productRepository.saveAll(sampleProducts);
        }
    }
}
