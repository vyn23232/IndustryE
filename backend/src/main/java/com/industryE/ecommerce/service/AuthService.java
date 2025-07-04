package com.industryE.ecommerce.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.industryE.ecommerce.dto.AuthResponse;
import com.industryE.ecommerce.dto.LoginRequest;
import com.industryE.ecommerce.dto.RegisterRequest;
import com.industryE.ecommerce.dto.UserResponse;
import com.industryE.ecommerce.entity.User;
import com.industryE.ecommerce.repository.UserRepository;
import com.industryE.ecommerce.security.JwtTokenProvider;

@Service
public class AuthService {
    
    @Autowired
    private AuthenticationManager authenticationManager;
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private JwtTokenProvider tokenProvider;
    
    public AuthResponse login(LoginRequest loginRequest) {
        System.out.println("=== LOGIN ATTEMPT ===");
        System.out.println("Email: " + loginRequest.getEmail());
        System.out.println("Password provided: " + (loginRequest.getPassword() != null ? "[PRESENT]" : "[MISSING]"));
        
        try {
            // Check if user exists
            User existingUser = userRepository.findByEmail(loginRequest.getEmail()).orElse(null);
            if (existingUser == null) {
                System.err.println("User not found with email: " + loginRequest.getEmail());
                throw new RuntimeException("Invalid email or password");
            }
            
            System.out.println("User found: " + existingUser.getName());
            System.out.println("Stored password: " + existingUser.getPassword());
            
            // Direct password comparison (no hashing)
            boolean passwordMatches = loginRequest.getPassword().equals(existingUser.getPassword());
            System.out.println("Password matches: " + passwordMatches);
            
            if (!passwordMatches) {
                System.err.println("Password does not match for user: " + loginRequest.getEmail());
                throw new RuntimeException("Invalid email or password");
            }
            
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginRequest.getEmail(),
                            loginRequest.getPassword()
                    )
            );
            
            SecurityContextHolder.getContext().setAuthentication(authentication);
            
            String jwt = tokenProvider.generateToken(authentication);
            
            UserResponse userResponse = new UserResponse(
                    existingUser.getId(),
                    existingUser.getName(),
                    existingUser.getEmail(),
                    existingUser.getCreatedAt(),
                    existingUser.getPhone(),
                    existingUser.getLocation(),
                    existingUser.getBio(),
                    existingUser.getRole().name()
            );
            
            System.out.println("Login successful for: " + loginRequest.getEmail());
            return new AuthResponse(jwt, userResponse, "Login successful");
        } catch (Exception ex) {
            System.err.println("Login failed: " + ex.getMessage());
            ex.printStackTrace();
            throw new RuntimeException("Invalid email or password");
        }
    }
    
    public AuthResponse register(RegisterRequest registerRequest) {
        System.out.println("=== REGISTRATION ATTEMPT ===");
        System.out.println("Name: " + registerRequest.getName());
        System.out.println("Email: " + registerRequest.getEmail());
        System.out.println("Password provided: " + (registerRequest.getPassword() != null ? "[PRESENT]" : "[MISSING]"));
        
        if (userRepository.existsByEmail(registerRequest.getEmail())) {
            throw new RuntimeException("Email is already taken!");
        }
        
        // Store password as plain text (no encoding)
        String plainPassword = registerRequest.getPassword();
        System.out.println("Storing password as plain text: " + plainPassword);
        
        User user = new User(
                registerRequest.getName(),
                registerRequest.getEmail(),
                plainPassword
        );
        
        User savedUser = userRepository.save(user);
        System.out.println("User saved with ID: " + savedUser.getId());
        
        // Create authentication for new user
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        registerRequest.getEmail(),
                        registerRequest.getPassword()
                )
        );
        
        String jwt = tokenProvider.generateToken(authentication);
        
        UserResponse userResponse = new UserResponse(
                savedUser.getId(),
                savedUser.getName(),
                savedUser.getEmail(),
                savedUser.getCreatedAt(),
                savedUser.getPhone(),
                savedUser.getLocation(),
                savedUser.getBio(),
                savedUser.getRole().name()
        );
        
        System.out.println("Registration successful for: " + registerRequest.getEmail());
        return new AuthResponse(jwt, userResponse, "User registered successfully");
    }
}
