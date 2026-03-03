package com.portfolio.backend.service;

import com.portfolio.backend.dto.EducationDTO;
import com.portfolio.backend.entity.Education;
import com.portfolio.backend.exception.ResourceNotFoundException;
import com.portfolio.backend.repository.EducationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class EducationService {
    private final EducationRepository educationRepository;

    @Autowired
    public EducationService(EducationRepository educationRepository) {
        this.educationRepository = educationRepository;
    }

    public List<EducationDTO> getAllEducation() {
        return educationRepository.findAllByOrderByDisplayOrderAsc().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public EducationDTO getEducationById(Long id) {
        Education education = educationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Education not found with id: " + id));
        return convertToDTO(education);
    }

    public EducationDTO createEducation(EducationDTO educationDTO) {
        Education education = convertToEntity(educationDTO);
        Education savedEducation = educationRepository.save(education);
        return convertToDTO(savedEducation);
    }

    public EducationDTO updateEducation(Long id, EducationDTO educationDTO) {
        Education education = educationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Education not found with id: " + id));
        education.setInstitution(educationDTO.getInstitution());
        education.setDegree(educationDTO.getDegree());
        education.setDuration(educationDTO.getDuration());
        education.setGrade(educationDTO.getGrade());
        education.setDisplayOrder(educationDTO.getDisplayOrder());
        Education updatedEducation = educationRepository.save(education);
        return convertToDTO(updatedEducation);
    }

    public void deleteEducation(Long id) {
        if (!educationRepository.existsById(id)) {
            throw new ResourceNotFoundException("Education not found with id: " + id);
        }
        educationRepository.deleteById(id);
    }

    private EducationDTO convertToDTO(Education education) {
        return new EducationDTO(education.getId(), education.getInstitution(),
                education.getDegree(), education.getDuration(), education.getGrade(),
                education.getDisplayOrder());
    }

    private Education convertToEntity(EducationDTO educationDTO) {
        return new Education(educationDTO.getId(), educationDTO.getInstitution(),
                educationDTO.getDegree(), educationDTO.getDuration(), educationDTO.getGrade(),
                educationDTO.getDisplayOrder());
    }
}