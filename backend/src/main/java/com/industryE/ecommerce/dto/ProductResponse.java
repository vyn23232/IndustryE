package com.industryE.ecommerce.dto;

import java.math.BigDecimal;

public class ProductResponse {
    private Long id;
    private String name;
    private String description;
    private BigDecimal price;
    private String category;
    private String availableSizes;
    private Boolean inStock;
    
    // Constructors
    public ProductResponse() {}
    
    public ProductResponse(Long id, String name, String description, BigDecimal price, 
                          String category, String availableSizes, Boolean inStock) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.category = category;
        this.availableSizes = availableSizes;
        this.inStock = inStock;
    }
    
    // Getters and setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    
    public BigDecimal getPrice() { return price; }
    public void setPrice(BigDecimal price) { this.price = price; }
    
    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }
    
    public String getAvailableSizes() { return availableSizes; }
    public void setAvailableSizes(String availableSizes) { this.availableSizes = availableSizes; }
    
    public Boolean getInStock() { return inStock; }
    public void setInStock(Boolean inStock) { this.inStock = inStock; }
}
