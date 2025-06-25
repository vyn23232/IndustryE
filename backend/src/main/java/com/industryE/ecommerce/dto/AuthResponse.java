package com.industryE.ecommerce.dto;

public class AuthResponse {
    
    private String token;
    private UserResponse user;
    private String message;
    
    // Constructors
    public AuthResponse() {}
    
    public AuthResponse(String token, UserResponse user, String message) {
        this.token = token;
        this.user = user;
        this.message = message;
    }
    
    // Getters and Setters
    public String getToken() {
        return token;
    }
    
    public void setToken(String token) {
        this.token = token;
    }
    
    public UserResponse getUser() {
        return user;
    }
    
    public void setUser(UserResponse user) {
        this.user = user;
    }
    
    public String getMessage() {
        return message;
    }
    
    public void setMessage(String message) {
        this.message = message;
    }
}
