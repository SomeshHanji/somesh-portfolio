package com.portfolio.backend.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SkillDTO {
    private Long id;

    @NotBlank(message = "Category is required")
    private String category;

    @NotBlank(message = "Skills are required")
    private String skills;
}