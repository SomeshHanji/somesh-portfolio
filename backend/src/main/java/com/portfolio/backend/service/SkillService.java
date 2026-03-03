package com.portfolio.backend.service;

import com.portfolio.backend.dto.SkillDTO;
import com.portfolio.backend.entity.Skill;
import com.portfolio.backend.exception.ResourceNotFoundException;
import com.portfolio.backend.repository.SkillRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class SkillService {
    private final SkillRepository skillRepository;

    @Autowired
    public SkillService(SkillRepository skillRepository) {
        this.skillRepository = skillRepository;
    }

    public List<SkillDTO> getAllSkills() {
        return skillRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public SkillDTO getSkillById(Long id) {
        Skill skill = skillRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Skill not found with id: " + id));
        return convertToDTO(skill);
    }

    public SkillDTO createSkill(SkillDTO skillDTO) {
        Skill skill = convertToEntity(skillDTO);
        Skill savedSkill = skillRepository.save(skill);
        return convertToDTO(savedSkill);
    }

    public SkillDTO updateSkill(Long id, SkillDTO skillDTO) {
        Skill skill = skillRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Skill not found with id: " + id));
        skill.setCategory(skillDTO.getCategory());
        skill.setSkills(skillDTO.getSkills());
        Skill updatedSkill = skillRepository.save(skill);
        return convertToDTO(updatedSkill);
    }

    public void deleteSkill(Long id) {
        if (!skillRepository.existsById(id)) {
            throw new ResourceNotFoundException("Skill not found with id: " + id);
        }
        skillRepository.deleteById(id);
    }

    private SkillDTO convertToDTO(Skill skill) {
        return new SkillDTO(skill.getId(), skill.getCategory(), skill.getSkills());
    }

    private Skill convertToEntity(SkillDTO skillDTO) {
        return new Skill(skillDTO.getId(), skillDTO.getCategory(), skillDTO.getSkills());
    }
}