package com.portfolio.backend.config;

import com.portfolio.backend.entity.Education;
import com.portfolio.backend.entity.Project;
import com.portfolio.backend.entity.Skill;
import com.portfolio.backend.repository.EducationRepository;
import com.portfolio.backend.repository.ProjectRepository;
import com.portfolio.backend.repository.SkillRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataSeeder implements CommandLineRunner {

    @Autowired
    private EducationRepository educationRepository;

    @Autowired
    private SkillRepository skillRepository;

    @Autowired
    private ProjectRepository projectRepository;

    @Override
    public void run(String... args) throws Exception {
        if (educationRepository.count() == 0) {
            Education edu1 = new Education();
            edu1.setInstitution("KLS Gogte Institute of Technology - Belgaum");
            edu1.setDegree("Master's Degree in Computer Application (MCA)");
            edu1.setDuration("February 2023 - September 2024");
            edu1.setGrade("8.26 CGPA");
            edu1.setDisplayOrder(1);
            educationRepository.save(edu1);

            Education edu2 = new Education();
            edu2.setInstitution("Peopletree Education Society - Belgaum");
            edu2.setDegree("Bachelor's Degree in Computer Application (BCA)");
            edu2.setDuration("July 2018 - September 2021");
            edu2.setGrade("70.85%");
            edu2.setDisplayOrder(2);
            educationRepository.save(edu2);
        }

        if (skillRepository.count() == 0) {
            skillRepository.save(new Skill(null, "Programming", "Java, Python"));
            skillRepository.save(new Skill(null, "Backend", "Spring Boot, Servlets, JDBC"));
            skillRepository.save(new Skill(null, "Database", "MySQL, SQLite"));
            skillRepository.save(new Skill(null, "Frontend", "HTML, CSS, Bootstrap, JavaScript"));
            skillRepository.save(new Skill(null, "Tools", "Git, Maven, Postman"));
            skillRepository.save(new Skill(null, "Concepts", "OOP, Collections Framework, Exception Handling, Multithreading, REST APIs"));
        }

        if (projectRepository.count() == 0) {
            Project project1 = new Project();
            project1.setTitle("Employee Management System");
            project1.setTechnology("Spring Boot + MySQL");
            project1.setFeatures("CRUD operations, REST APIs, MVC architecture, Database integration");
            project1.setDescription("Comprehensive employee management system built with Spring Boot and MySQL, featuring full CRUD operations and RESTful API architecture.");
            projectRepository.save(project1);

            Project project2 = new Project();
            project2.setTitle("Recruiting Website for Welders");
            project2.setTechnology("Django + SQLite");
            project2.setFeatures("User authentication, Admin panel, Job posting system");
            project2.setDescription("Job portal specifically designed for welders with user authentication, comprehensive admin panel, and job management system.");
            projectRepository.save(project2);
        }
    }
}