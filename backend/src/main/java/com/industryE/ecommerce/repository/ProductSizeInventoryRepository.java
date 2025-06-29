package com.industryE.ecommerce.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.industryE.ecommerce.entity.ProductSizeInventory;

@Repository
public interface ProductSizeInventoryRepository extends JpaRepository<ProductSizeInventory, Long> {
    
    List<ProductSizeInventory> findByProductId(Long productId);
    
    Optional<ProductSizeInventory> findByProductIdAndSize(Long productId, String size);
    
    @Query("SELECT psi FROM ProductSizeInventory psi WHERE psi.product.id = :productId AND psi.quantity > 0")
    List<ProductSizeInventory> findAvailableSizesByProductId(@Param("productId") Long productId);
    
    @Query("SELECT psi FROM ProductSizeInventory psi WHERE psi.product.id = :productId AND psi.size = :size AND (psi.quantity - psi.reservedQuantity) >= :requiredQuantity")
    Optional<ProductSizeInventory> findAvailableSize(@Param("productId") Long productId, @Param("size") String size, @Param("requiredQuantity") Integer requiredQuantity);
    
    @Query("SELECT SUM(psi.quantity - psi.reservedQuantity) FROM ProductSizeInventory psi WHERE psi.product.id = :productId")
    Long getTotalAvailableQuantityForProduct(@Param("productId") Long productId);
    
    @Query("SELECT COUNT(psi) > 0 FROM ProductSizeInventory psi WHERE psi.product.id = :productId AND (psi.quantity - psi.reservedQuantity) > 0")
    boolean hasAvailableInventory(@Param("productId") Long productId);
    
    void deleteByProductId(Long productId);
}
