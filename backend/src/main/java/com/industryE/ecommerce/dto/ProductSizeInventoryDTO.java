package com.industryE.ecommerce.dto;

public class ProductSizeInventoryDTO {
    private Long id;
    private String size;
    private Integer totalQuantity;
    private Integer reservedQuantity;
    private Integer availableQuantity;
    private boolean inStock;
    
    // Constructors
    public ProductSizeInventoryDTO() {}
    
    public ProductSizeInventoryDTO(Long id, String size, Integer totalQuantity, Integer reservedQuantity) {
        this.id = id;
        this.size = size;
        this.totalQuantity = totalQuantity;
        this.reservedQuantity = reservedQuantity;
        this.availableQuantity = totalQuantity - reservedQuantity;
        this.inStock = this.availableQuantity > 0;
    }
    
    // Getters and setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public String getSize() {
        return size;
    }
    
    public void setSize(String size) {
        this.size = size;
    }
    
    public Integer getTotalQuantity() {
        return totalQuantity;
    }
    
    public void setTotalQuantity(Integer totalQuantity) {
        this.totalQuantity = totalQuantity;
        updateAvailableQuantity();
    }
    
    public Integer getReservedQuantity() {
        return reservedQuantity;
    }
    
    public void setReservedQuantity(Integer reservedQuantity) {
        this.reservedQuantity = reservedQuantity;
        updateAvailableQuantity();
    }
    
    public Integer getAvailableQuantity() {
        return availableQuantity;
    }
    
    public void setAvailableQuantity(Integer availableQuantity) {
        this.availableQuantity = availableQuantity;
        this.inStock = availableQuantity > 0;
    }
    
    public boolean isInStock() {
        return inStock;
    }
    
    public void setInStock(boolean inStock) {
        this.inStock = inStock;
    }
    
    private void updateAvailableQuantity() {
        if (totalQuantity != null && reservedQuantity != null) {
            this.availableQuantity = totalQuantity - reservedQuantity;
            this.inStock = this.availableQuantity > 0;
        }
    }
}
