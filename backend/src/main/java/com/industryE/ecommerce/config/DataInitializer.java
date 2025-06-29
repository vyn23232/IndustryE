package com.industryE.ecommerce.config;

import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.industryE.ecommerce.entity.Product;
import com.industryE.ecommerce.entity.User;
import com.industryE.ecommerce.repository.ProductRepository;
import com.industryE.ecommerce.repository.UserRepository;
import com.industryE.ecommerce.service.ProductSizeInventoryService;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private ProductRepository productRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private ProductSizeInventoryService sizeInventoryService;

    @Override
    public void run(String... args) throws Exception {
        // Initialize test users with plain text passwords
        if (userRepository.count() == 0) {
            User testUser = new User("Test User", "test@example.com", "password123");
            User adminUser = new User("Admin User", "admin@example.com", "admin123");
            
            userRepository.saveAll(Arrays.asList(testUser, adminUser));
            System.out.println("Test users created with plain text passwords");
        }
        
        // Only populate products if the database is empty
        if (productRepository.count() == 0) {
            List<Product> sampleProducts = Arrays.asList(
                new Product(
                    "Air Jordan 1 Low",
                    "The Air Jordan 1 Low offers all the appeal of the original AJ1 with a more versatile, everyday wearable aesthetic.",
                    4995.0,
                    "[\"7\", \"7.5\", \"8\", \"8.5\", \"9\", \"9.5\", \"10\", \"10.5\", \"11\", \"11.5\", \"12\"]",
                    "casual",
                    "AIRJORDAN1LOW.jpg",
                    "White/Black",
                    "Jordan",
                    4.8
                ),
                new Product(
                    "Air Zoom Pegasus 41",
                    "Responsive cushioning in the Pegasus provides an energized ride for everyday road running.",
                    6895.0,
                    "[\"7\", \"7.5\", \"8\", \"8.5\", \"9\", \"9.5\", \"10\", \"10.5\", \"11\", \"11.5\", \"12\"]",
                    "running",
                    "AIRZOOMPEGASUS41.jpg",
                    "Black/White", 
                    "Nike",
                    4.9
                ),
                new Product(
                    "G.T. Jump Academy EP",
                    "Designed for explosive jumps and quick cuts on the basketball court.",
                    5495.0,
                    "[\"7\", \"7.5\", \"8\", \"8.5\", \"9\", \"9.5\", \"10\", \"10.5\", \"11\", \"11.5\", \"12\"]",
                    "sports",
                    "G.T.JUMPACADEMYEP.jpg",
                    "Blue/White",
                    "Nike",
                    4.7
                ),
                new Product(
                    "Jordan Air Rev",
                    "A classic Jordan silhouette with modern performance features.",
                    7295.0,
                    "[\"7\", \"7.5\", \"8\", \"8.5\", \"9\", \"9.5\", \"10\", \"10.5\", \"11\", \"11.5\", \"12\"]",
                    "sports",
                    "JORDAN+AIR+REV.jpg",
                    "Red/Black",
                    "Jordan",
                    4.8
                ),
                new Product(
                    "Legend 10 Elite FG",
                    "Professional-grade football boots designed for elite performance on firm ground.",
                    12995.0,
                    "[\"7\", \"7.5\", \"8\", \"8.5\", \"9\", \"9.5\", \"10\", \"10.5\", \"11\", \"11.5\", \"12\"]",
                    "sports",
                    "LEGEND10ELITEFG.jpg",
                    "Green/Black",
                    "Nike",
                    4.9
                ),
                new Product(
                    "Nike Dunk Low Retro",
                    "The iconic basketball shoe returns with premium materials and classic colorways.",
                    5995.0,
                    "[\"7\", \"7.5\", \"8\", \"8.5\", \"9\", \"9.5\", \"10\", \"10.5\", \"11\", \"11.5\", \"12\"]",
                    "casual",
                    "NIKEDUNKLOWRETRO.jpg",
                    "White/Green",
                    "Nike",
                    4.6
                ),
                new Product(
                    "Nike P-6000 Premium",
                    "Retro-inspired running shoe with modern comfort and style.",
                    4495.0,
                    "[\"7\", \"7.5\", \"8\", \"8.5\", \"9\", \"9.5\", \"10\", \"10.5\", \"11\", \"11.5\", \"12\"]",
                    "casual",
                    "NIKEP-6000PRM.jpg",
                    "Grey/Silver",
                    "Nike",
                    4.5
                ),
                new Product(
                    "Phantom 6 High Elite LE FG",
                    "Limited edition elite football boots with cutting-edge technology.",
                    15995.0,
                    "[\"7\", \"7.5\", \"8\", \"8.5\", \"9\", \"9.5\", \"10\", \"10.5\", \"11\", \"11.5\", \"12\"]",
                    "limited",
                    "PHANTOM6HIGHELITELEFG.jpg",
                    "Black/Gold",
                    "Nike",
                    5.0
                )
            );
            
            productRepository.saveAll(sampleProducts);
            
            // Initialize size inventories for all products with limited stock (3 per size)
            List<String> standardSizes = Arrays.asList("7", "7.5", "8", "8.5", "9", "9.5", "10", "10.5", "11", "11.5", "12");
            int defaultQuantityPerSize = 5; // Limited inventory - 3 stocks per size
            
            for (Product product : sampleProducts) {
                sizeInventoryService.initializeInventoryForProduct(product.getId(), standardSizes, defaultQuantityPerSize);
            }
            
            System.out.println("Sample products and size inventories created successfully");
        }
    }
}
