package com.industryE.ecommerce.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Size;

public class UpdateUserRequest {
    
    @Size(min = 2, max = 50, message = "Name must be between 2 and 50 characters")
    private String name;
    
    @Email(message = "Please provide a valid email")
    private String email;
    
    private String phone;
    private String location;
    private String bio;
    
    // Constructors
    public UpdateUserRequest() {}
    
    public UpdateUserRequest(String name, String email, String phone, String location, String bio) {
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.location = location;
        this.bio = bio;
    }
    
    // Getters and Setters
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
}
