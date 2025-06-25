package com.industryE.ecommerce.controller;

import com.industryE.ecommerce.dto.CreateOrderRequest;
import com.industryE.ecommerce.dto.OrderResponse;
import com.industryE.ecommerce.entity.Order;
import com.industryE.ecommerce.entity.User;
import com.industryE.ecommerce.service.OrderService;
import com.industryE.ecommerce.service.UserService;
import com.industryE.ecommerce.security.JwtTokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "*")
public class OrderController {
    
    @Autowired
    private OrderService orderService;
    
    @Autowired
    private UserService userService;
    
    @Autowired
    private JwtTokenProvider jwtTokenProvider;
    
    @PostMapping("/create")
    public ResponseEntity<?> createOrder(@RequestBody CreateOrderRequest request, 
                                       HttpServletRequest httpRequest) {
        try {
            // Extract user from JWT token
            String token = extractTokenFromRequest(httpRequest);
            String email = jwtTokenProvider.getUsernameFromToken(token);
            User user = userService.findByEmail(email);
            
            // Create order
            OrderResponse order = orderService.createOrder(request, user);
            return ResponseEntity.status(HttpStatus.CREATED).body(order);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ErrorResponse("Failed to create order: " + e.getMessage()));
        }
    }
    
    @GetMapping("/user")
    public ResponseEntity<?> getUserOrders(HttpServletRequest httpRequest) {
        try {
            String token = extractTokenFromRequest(httpRequest);
            String email = jwtTokenProvider.getUsernameFromToken(token);
            User user = userService.findByEmail(email);
            
            List<OrderResponse> orders = orderService.getUserOrders(user.getId());
            return ResponseEntity.ok(orders);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ErrorResponse("Failed to fetch orders: " + e.getMessage()));
        }
    }
    
    @GetMapping("/{orderId}")
    public ResponseEntity<?> getOrderDetails(@PathVariable Long orderId, HttpServletRequest httpRequest) {
        try {
            String token = extractTokenFromRequest(httpRequest);
            String email = jwtTokenProvider.getUsernameFromToken(token);
            User user = userService.findByEmail(email);
            
            OrderResponse order = orderService.getOrderById(orderId, user.getId());
            return ResponseEntity.ok(order);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ErrorResponse("Order not found"));
        }
    }
    
    private String extractTokenFromRequest(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        if (bearerToken != null && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }
        throw new RuntimeException("No valid token found");
    }
    
    public static class ErrorResponse {
        private String message;
        
        public ErrorResponse(String message) {
            this.message = message;
        }
        
        public String getMessage() {
            return message;
        }
    }
}