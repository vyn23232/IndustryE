package com.industryE.ecommerce.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public class AddToCartRequest {
    @NotNull(message = "Product ID is required")
    private Long productId;
    
    @NotNull(message = "Quantity is required")
    @Min(value = 1, message = "Quantity must be at least 1")
    private Integer quantity;
    
    @NotNull(message = "Size is required")
    private String size;
    
    // Constructors
    public AddToCartRequest() {}
    
    public AddToCartRequest(Long productId, Integer quantity, String size) {
        this.productId = productId;
        this.quantity = quantity;
        this.size = size;
    }
    
    // Getters and setters
    public Long getProductId() { return productId; }
    public void setProductId(Long productId) { this.productId = productId; }
    
    public Integer getQuantity() { return quantity; }
    public void setQuantity(Integer quantity) { this.quantity = quantity; }
    
    public String getSize() { return size; }
    public void setSize(String size) { this.size = size; }
}
