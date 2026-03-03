package com.portfolio.backend.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EducationDTO {
    private Long id;

    @NotBlank(message = "Institution is required")
    private String institution;

    @NotBlank(message = "Degree is required")
    private String degree;

    @NotBlank(message = "Duration is required")
    private String duration;

    @NotBlank(message = "Grade is required")
    private String grade;

    private Integer displayOrder;
}