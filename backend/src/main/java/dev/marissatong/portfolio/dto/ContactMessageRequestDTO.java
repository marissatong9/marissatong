package dev.marissatong.portfolio.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record ContactMessageRequestDTO(
    @NotBlank(message = "Name is required.") String name,
    @NotBlank(message = "Email is required.")
        @Email(
            regexp = "^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$",
            message = "Enter a valid email address.")
        String email,
    @NotBlank(message = "Message is required")
        @Size(min = 10, message = "Message must be at least 10 characters long")
        String message) {}
