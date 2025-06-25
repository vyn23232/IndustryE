package com.industryE.ecommerce.service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.industryE.ecommerce.dto.CreateOrderRequest;
import com.industryE.ecommerce.dto.OrderResponse;
import com.industryE.ecommerce.entity.Order;
import com.industryE.ecommerce.entity.OrderItem;
import com.industryE.ecommerce.entity.User;
import com.industryE.ecommerce.repository.OrderRepository;

@Service
@Transactional
public class OrderService {
    
    @Autowired
    private OrderRepository orderRepository;
    
    public OrderResponse createOrder(CreateOrderRequest request, User user) {
        // Ensure the order is properly associated with the authenticated user
        Order order = new Order();
        order.setUser(user); // Critical: Set the user who owns this order
        order.setOrderNumber(generateOrderNumber());
        order.setTotalAmount(request.getTotalAmount());
        order.setStatus("PENDING");
        
        // Set shipping information
        if (request.getShippingInfo() != null) {
            order.setShippingFirstName(request.getShippingInfo().getFirstName());
            order.setShippingLastName(request.getShippingInfo().getLastName());
            order.setShippingAddress(request.getShippingInfo().getAddress());
            order.setShippingCity(request.getShippingInfo().getCity());
            order.setShippingProvince(request.getShippingInfo().getProvince());
            order.setShippingPostalCode(request.getShippingInfo().getPostalCode());
            order.setShippingPhone(request.getShippingInfo().getPhone());
        }
        
        order.setPaymentMethod(request.getPaymentMethod());
        
        Order savedOrder = orderRepository.save(order);
        return convertToResponse(savedOrder);
    }
    
    public List<OrderResponse> getUserOrders(Long userId) {
        // Critical fix: Only return orders that belong to the specific user
        return orderRepository.findByUserIdOrderByOrderDateDesc(userId)
                .stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }
    
    public OrderResponse getOrderById(Long orderId, Long userId) {
        // Critical fix: Ensure order belongs to the requesting user
        Order order = orderRepository.findByIdAndUserId(orderId, userId)
                .orElseThrow(() -> new RuntimeException("Order not found or access denied"));
        return convertToResponse(order);
    }
    
    private String generateOrderNumber() {
        return "ORD-" + System.currentTimeMillis();
    }
    
    private OrderResponse convertToResponse(Order order) {
        OrderResponse response = new OrderResponse();
        response.setId(order.getId());
        response.setOrderNumber(order.getOrderNumber());
        response.setTotalAmount(order.getTotalAmount());
        response.setStatus(order.getStatus());
        response.setOrderDate(order.getOrderDate());
        
        // Set shipping info
        OrderResponse.ShippingInfo shippingInfo = new OrderResponse.ShippingInfo();
        shippingInfo.setFirstName(order.getShippingFirstName());
        shippingInfo.setLastName(order.getShippingLastName());
        shippingInfo.setAddress(order.getShippingAddress());
        shippingInfo.setCity(order.getShippingCity());
        shippingInfo.setProvince(order.getShippingProvince());
        shippingInfo.setPostalCode(order.getShippingPostalCode());
        shippingInfo.setPhone(order.getShippingPhone());
        response.setShippingInfo(shippingInfo);
        
        return response;
    }
}