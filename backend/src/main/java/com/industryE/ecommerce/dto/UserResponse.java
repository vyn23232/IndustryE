package com.industryE.ecommerce.dto;

import java.time.LocalDateTime;

public class UserResponse {
    
    private Long id;
    private String name;
    private String email;
    private LocalDateTime createdAt;
    private String phone;
    private String location;
    private String bio;
    private String role;
    
    // Constructors
    public UserResponse() {}
    
    public UserResponse(Long id, String name, String email, LocalDateTime createdAt, String phone, String location, String bio, String role) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.createdAt = createdAt;
        this.phone = phone;
        this.location = location;
        this.bio = bio;
        this.role = role;
    }
    
    // Getters and Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public String getName() {
        return name;
    }
    
    public void setName(String name) {
        this.name = name;
    }
    
    public String getEmail() {
        return email;
    }
    
    public void setEmail(String email) {
        this.email = email;
    }
    
    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
    
    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
    
    public String getPhone() {
        return phone;
    }
    
    public void setPhone(String phone) {
        this.phone = phone;
    }
    
    public String getLocation() {
        return location;
    }
    
    public void setLocation(String location) {
        this.location = location;
    }
    
    public String getBio() {
        return bio;
    }
    
    public void setBio(String bio) {
        this.bio = bio;
    }
    
    public String getRole() {
        return role;
    }
    
    public void setRole(String role) {
        this.role = role;
    }
}
