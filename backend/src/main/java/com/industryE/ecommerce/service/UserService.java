package com.industryE.ecommerce.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.industryE.ecommerce.dto.ChangePasswordRequest;
import com.industryE.ecommerce.dto.UpdateUserRequest;
import com.industryE.ecommerce.dto.UserResponse;
import com.industryE.ecommerce.entity.User;
import com.industryE.ecommerce.repository.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User findByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found with email: " + email));
    }

    public UserResponse getUserProfile(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        return convertToUserResponse(user);
    }

    public UserResponse updateUserProfile(String email, UpdateUserRequest updateRequest) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Check if email is being changed and if it's already taken
        if (updateRequest.getEmail() != null && !updateRequest.getEmail().equals(user.getEmail())) {
            if (userRepository.existsByEmail(updateRequest.getEmail())) {
                throw new RuntimeException("Email is already taken");
            }
            user.setEmail(updateRequest.getEmail());
        }

        // Update other fields
        if (updateRequest.getName() != null && !updateRequest.getName().trim().isEmpty()) {
            user.setName(updateRequest.getName().trim());
        }
        
        if (updateRequest.getPhone() != null) {
            user.setPhone(updateRequest.getPhone().trim());
        }
        
        if (updateRequest.getLocation() != null) {
            user.setLocation(updateRequest.getLocation().trim());
        }
        
        if (updateRequest.getBio() != null) {
            user.setBio(updateRequest.getBio().trim());
        }

        User savedUser = userRepository.save(user);
        return convertToUserResponse(savedUser);
    }

    public void changePassword(String email, ChangePasswordRequest changePasswordRequest) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Verify current password (plain text comparison)
        if (!changePasswordRequest.getCurrentPassword().equals(user.getPassword())) {
            throw new RuntimeException("Current password is incorrect");
        }

        // Update password (store as plain text)
        String newPassword = changePasswordRequest.getNewPassword();
        user.setPassword(newPassword);
        userRepository.save(user);
    }

    private UserResponse convertToUserResponse(User user) {
        return new UserResponse(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getCreatedAt(),
                user.getPhone(),
                user.getLocation(),
                user.getBio(),
                user.getRole().name()
        );
    }
}
