package com.industryE.ecommerce.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.industryE.ecommerce.entity.Order;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    
    // Find orders by user ID, ordered by date descending
    @Query("SELECT o FROM Order o WHERE o.user.id = :userId ORDER BY o.orderDate DESC")
    List<Order> findByUserIdOrderByOrderDateDesc(@Param("userId") Long userId);
    
    // Find specific order by ID and user ID (security check)
    @Query("SELECT o FROM Order o WHERE o.id = :orderId AND o.user.id = :userId")
    Optional<Order> findByIdAndUserId(@Param("orderId") Long orderId, @Param("userId") Long userId);
    
    // Find orders by user ID only
    List<Order> findByUserId(Long userId);
}