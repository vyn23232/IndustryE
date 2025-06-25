package com.industryE.ecommerce.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
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
    private PasswordEncoder passwordEncoder;
    
    @Autowired
    private JwtTokenProvider tokenProvider;
    
    public AuthResponse login(LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getEmail(),
                        loginRequest.getPassword()
                )
        );
        
        SecurityContextHolder.getContext().setAuthentication(authentication);
        
        // Get user from repository by email
        User user = userRepository.findByEmail(loginRequest.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        String jwt = tokenProvider.generateToken(authentication);
        
        UserResponse userResponse = new UserResponse(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getCreatedAt(),
                user.getPhone(),
                user.getLocation(),
                user.getBio()
        );
        
        return new AuthResponse(jwt, userResponse, "Login successful");
    }
    
    public AuthResponse register(RegisterRequest registerRequest) {
        if (userRepository.existsByEmail(registerRequest.getEmail())) {
            throw new RuntimeException("Email is already taken!");
        }
        
        User user = new User(
                registerRequest.getName(),
                registerRequest.getEmail(),
                passwordEncoder.encode(registerRequest.getPassword())
        );
        
        User savedUser = userRepository.save(user);
        
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
                savedUser.getBio()
        );
        
        return new AuthResponse(jwt, userResponse, "User registered successfully");
    }
}
