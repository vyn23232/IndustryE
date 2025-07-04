
package com.industryE.ecommerce.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.industryE.ecommerce.entity.CartItem;

@Repository
public interface CartItemRepository extends JpaRepository<CartItem, Long> {
    Optional<CartItem> findByCartIdAndProductId(Long cartId, Long productId);
    Optional<CartItem> findByCartIdAndProductIdAndSize(Long cartId, Long productId, String size);
    void deleteByCartId(Long cartId);

    // Finds all cart items for a given cart, product, and size (for deduplication)
    List<CartItem> findAllByCartIdAndProductIdAndSize(Long cartId, Long productId, String size);
}
