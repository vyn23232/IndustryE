package com.industryE.ecommerce.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.industryE.ecommerce.dto.ProductSizeInventoryDTO;
import com.industryE.ecommerce.entity.Product;
import com.industryE.ecommerce.entity.ProductSizeInventory;
import com.industryE.ecommerce.repository.ProductRepository;
import com.industryE.ecommerce.repository.ProductSizeInventoryRepository;

@Service
@Transactional
public class ProductSizeInventoryService {
    
    @Autowired
    private ProductSizeInventoryRepository inventoryRepository;
    
    @Autowired
    private ProductRepository productRepository;
    
    public List<ProductSizeInventoryDTO> getSizeInventoryByProductId(Long productId) {
        return inventoryRepository.findByProductId(productId).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    public ProductSizeInventoryDTO getSizeInventory(Long productId, String size) {
        Optional<ProductSizeInventory> inventory = inventoryRepository.findByProductIdAndSize(productId, size);
        return inventory.map(this::convertToDTO).orElse(null);
    }
    
    public boolean checkAvailability(Long productId, String size, Integer requestedQuantity) {
        Optional<ProductSizeInventory> inventory = inventoryRepository.findByProductIdAndSize(productId, size);
        return inventory.map(inv -> inv.isAvailable(requestedQuantity)).orElse(false);
    }
    
    public void reserveInventory(Long productId, String size, Integer quantity) {
        ProductSizeInventory inventory = inventoryRepository.findByProductIdAndSize(productId, size)
                .orElseThrow(() -> new RuntimeException("Size " + size + " not found for product"));
        
        inventory.reserveQuantity(quantity);
        inventoryRepository.save(inventory);
    }
    
    public void releaseReservedInventory(Long productId, String size, Integer quantity) {
        Optional<ProductSizeInventory> inventoryOpt = inventoryRepository.findByProductIdAndSize(productId, size);
        if (inventoryOpt.isPresent()) {
            ProductSizeInventory inventory = inventoryOpt.get();
            inventory.releaseReservedQuantity(quantity);
            inventoryRepository.save(inventory);
        }
    }
    
    public void confirmSale(Long productId, String size, Integer quantity) {
        ProductSizeInventory inventory = inventoryRepository.findByProductIdAndSize(productId, size)
                .orElseThrow(() -> new RuntimeException("Size " + size + " not found for product"));
        
        inventory.confirmSale(quantity);
        inventoryRepository.save(inventory);
    }
    
    public void initializeInventoryForProduct(Long productId, List<String> sizes, Integer quantityPerSize) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));
        
        for (String size : sizes) {
            Optional<ProductSizeInventory> existingInventory = inventoryRepository.findByProductIdAndSize(productId, size);
            if (existingInventory.isEmpty()) {
                ProductSizeInventory inventory = new ProductSizeInventory(product, size, quantityPerSize);
                inventoryRepository.save(inventory);
            }
        }
    }
    
    public void updateInventory(Long productId, String size, Integer newQuantity) {
        Optional<ProductSizeInventory> inventoryOpt = inventoryRepository.findByProductIdAndSize(productId, size);
        if (inventoryOpt.isPresent()) {
            ProductSizeInventory inventory = inventoryOpt.get();
            inventory.setQuantity(newQuantity);
            inventoryRepository.save(inventory);
        } else {
            Product product = productRepository.findById(productId)
                    .orElseThrow(() -> new RuntimeException("Product not found"));
            ProductSizeInventory inventory = new ProductSizeInventory(product, size, newQuantity);
            inventoryRepository.save(inventory);
        }
    }
    
    public boolean hasAvailableInventory(Long productId) {
        return inventoryRepository.hasAvailableInventory(productId);
    }
    
    private ProductSizeInventoryDTO convertToDTO(ProductSizeInventory inventory) {
        return new ProductSizeInventoryDTO(
                inventory.getId(),
                inventory.getSize(),
                inventory.getQuantity(),
                inventory.getReservedQuantity()
        );
    }
}
