package com.boot.flender_backend.controller;

import java.util.Optional;

import com.boot.flender_backend.model.User;
import com.boot.flender_backend.repository.UserRepository;
import com.boot.flender_backend.dto.ApiResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/register")
    public ApiResponse register(@RequestBody User user) {
        Optional<User> existingUser = userRepository.findByUsername(user.getUsername());

        if (existingUser.isPresent()) {
            return new ApiResponse("failure", "Username already exists!");
        }

        userRepository.save(user);
        return new ApiResponse("success", "User registered successfully!");
    }

    // Login API
    @PostMapping("/login")
    public ApiResponse login(@RequestBody User loginRequest) {
        Optional<User> user = userRepository.findByUsername(loginRequest.getUsername());

        if (user.isPresent() && user.get().getPassword().equals(loginRequest.getPassword())) {
            return new ApiResponse("success", "User logged in successfully!");
        }
        return new ApiResponse("failure", "Invalid user credentials");
    }
}