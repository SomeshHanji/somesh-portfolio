package com.portfolio.backend.controller;

import com.portfolio.backend.dto.EducationDTO;
import com.portfolio.backend.service.EducationService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/education")
@CrossOrigin(origins = "*")
public class EducationController {
    private final EducationService educationService;

    @Autowired
    public EducationController(EducationService educationService) {
        this.educationService = educationService;
    }

    @GetMapping
    public ResponseEntity<List<EducationDTO>> getAllEducation() {
        return ResponseEntity.ok(educationService.getAllEducation());
    }

    @GetMapping("/{id}")
    public ResponseEntity<EducationDTO> getEducationById(@PathVariable Long id) {
        return ResponseEntity.ok(educationService.getEducationById(id));
    }

    @PostMapping
    public ResponseEntity<EducationDTO> createEducation(@Valid @RequestBody EducationDTO educationDTO) {
        return ResponseEntity.status(HttpStatus.CREATED).body(educationService.createEducation(educationDTO));
    }

    @PutMapping("/{id}")
    public ResponseEntity<EducationDTO> updateEducation(@PathVariable Long id, @Valid @RequestBody EducationDTO educationDTO) {
        return ResponseEntity.ok(educationService.updateEducation(id, educationDTO));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEducation(@PathVariable Long id) {
        educationService.deleteEducation(id);
        return ResponseEntity.noContent().build();
    }
}