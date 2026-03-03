import React, { useState, useEffect, useRef, useCallback } from 'react';
import './App.css';
import axios from 'axios';

const API_URL = "http://localhost:8001";

// Social Links
const SOCIAL_LINKS = {
  email: 'someshhanji26@gmail.com',
  phone: '+91-8088611591',
  linkedin: 'https://linkedin.com/in/somesh-hanji-a2203317a',
  github: 'https://github.com/SomeshHanji'
};

// SVG Icons
const GmailIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="social-icon">
    <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z"/>
  </svg>
);

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="social-icon">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const GitHubIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="social-icon">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>
);

const PhoneIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="social-icon">
    <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 0 0-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z"/>
  </svg>
);

const SunIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5"/>
    <line x1="12" y1="1" x2="12" y2="3"/>
    <line x1="12" y1="21" x2="12" y2="23"/>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
    <line x1="1" y1="12" x2="3" y2="12"/>
    <line x1="21" y1="12" x2="23" y2="12"/>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
  </svg>
);

const MoonIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
  </svg>
);

const ArrowRightIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="arrow-icon">
    <line x1="5" y1="12" x2="19" y2="12"/>
    <polyline points="12 5 19 12 12 19"/>
  </svg>
);

// Custom hook for scroll animations
const useScrollAnimation = (threshold = 0.1) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const currentRef = ref.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold, rootMargin: '0px 0px -80px 0px' }
    );

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold]);

  return [ref, isVisible];
};

// Animated Component
const FadeIn = ({ children, delay = 0, direction = 'up', className = '' }) => {
  const [ref, isVisible] = useScrollAnimation();
  
  return (
    <div 
      ref={ref} 
      className={`fade-in ${direction} ${isVisible ? 'visible' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

// Animated Code Block for About Section
const AnimatedCodeBlock = () => {
  const [currentLine, setCurrentLine] = useState(0);
  const codeLines = [
    { text: 'const developer = {', color: 'keyword' },
    { text: '  name: "Somesh Hanji",', color: 'string' },
    { text: '  role: "Full Stack Developer",', color: 'string' },
    { text: '  skills: ["Java","Django","Spring Boot"],', color: 'array' },
    { text: '  passion: "Building Solutions",', color: 'string' },
    { text: '  available: true', color: 'boolean' },
    { text: '};', color: 'keyword' },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentLine((prev) => (prev + 1) % (codeLines.length + 1));
    }, 800);
    return () => clearInterval(interval);
  }, [codeLines.length]);

  return (
    <div className="code-block">
      <div className="code-header">
        <span className="dot red"></span>
        <span className="dot yellow"></span>
        <span className="dot green"></span>
        <span className="file-name">developer.js</span>
      </div>
      <div className="code-content">
        {codeLines.map((line, index) => (
          <div 
            key={index} 
            className={`code-line ${index <= currentLine ? 'visible' : ''} ${line.color}`}
            style={{ transitionDelay: `${index * 100}ms` }}
          >
            <span className="line-number">{index + 1}</span>
            <span className="line-text">{line.text}</span>
          </div>
        ))}
        <div className={`cursor ${currentLine >= codeLines.length ? 'blink' : ''}`}>|</div>
      </div>
    </div>
  );
};

function App() {
  const [skills, setSkills] = useState([]);
  const [projects, setProjects] = useState([]);
  const [education, setEducation] = useState([]);
  const [activeSection, setActiveSection] = useState('home');
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : true;
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  useEffect(() => {
    fetchData();
  }, []);

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 50);
    
    const sections = ['home', 'about', 'skills', 'projects', 'education', 'experience', 'contact'];
    const scrollPosition = window.scrollY + 150;

    for (const section of sections) {
      const element = document.getElementById(section);
      if (element) {
        const offsetTop = element.offsetTop;
        const offsetHeight = element.offsetHeight;
        
        if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
          setActiveSection(section);
          break;
        }
      }
    }
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const fetchData = async () => {
    try {
      const [skillsRes, projectsRes, educationRes] = await Promise.all([
        axios.get(`${API_URL}/api/skills`),
        axios.get(`${API_URL}/api/projects`),
        axios.get(`${API_URL}/api/education`)
      ]);
      setSkills(skillsRes.data);
      setProjects(projectsRes.data);
      setEducation(educationRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const scrollToSection = (section) => {
    const element = document.getElementById(section);
    if (element) {
      const navHeight = 80;
      const elementPosition = element.offsetTop - navHeight;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
    setActiveSection(section);
    setMenuOpen(false);
  };

  const toggleTheme = () => {
    setDarkMode(prev => !prev);
  };

  return (
    <div className="App">
      {/* Animated Background */}
      <div className="bg-gradient">
        <div className="bg-gradient-1"></div>
        <div className="bg-gradient-2"></div>
        <div className="bg-gradient-3"></div>
      </div>

      {/* Navigation */}
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">
          <a href="#home" className="logo" onClick={(e) => { e.preventDefault(); scrollToSection('home'); }}>
            <span className="logo-icon">S</span>
            <span className="logo-text">Somesh</span>
          </a>
          
          <button 
            className={`hamburger ${menuOpen ? 'active' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          <div className={`nav-menu ${menuOpen ? 'open' : ''}`}>
            <div className="nav-links">
              {['home', 'about', 'skills', 'projects', 'education', 'experience', 'contact'].map(section => (
                <button
                  key={section}
                  className={`nav-link ${activeSection === section ? 'active' : ''}`}
                  onClick={() => scrollToSection(section)}
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                  {activeSection === section && <span className="nav-indicator"></span>}
                </button>
              ))}
            </div>
          </div>

          <div className="nav-actions">
            <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
              <span className={`theme-icon ${darkMode ? 'hidden' : ''}`}><MoonIcon /></span>
              <span className={`theme-icon ${!darkMode ? 'hidden' : ''}`}><SunIcon /></span>
            </button>
            <div className="nav-social">
              <a href={SOCIAL_LINKS.github} target="_blank" rel="noopener noreferrer" className="nav-social-link" title="GitHub">
                <GitHubIcon />
              </a>
              <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer" className="nav-social-link" title="LinkedIn">
                <LinkedInIcon />
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="hero">
        <div className="hero-content">
          <FadeIn delay={0}>
            <span className="hero-badge">Available for opportunities</span>
          </FadeIn>
          <FadeIn delay={100}>
            <h1 className="hero-title">
              Hi, I'm <span className="highlight">Somesh Hanji</span>
              <br />
              <span className="title-role">Full Stack Developer</span>
            </h1>
          </FadeIn>
          <FadeIn delay={200}>
            <p className="hero-description">
              Technical professional with expertise in Java, Python, and backend frameworks 
              (Django, Spring). Skilled in building RESTful APIs, database-driven applications, 
              and system integrations.
            </p>
          </FadeIn>
          <FadeIn delay={300}>
            <div className="hero-buttons">
              <button className="btn btn-primary" onClick={() => scrollToSection('contact')}>
                <span>Get in touch</span>
                <ArrowRightIcon />
              </button>
              <button className="btn btn-secondary" onClick={() => scrollToSection('projects')}>
                <span>View work</span>
              </button>
            </div>
          </FadeIn>
          <FadeIn delay={400}>
            <div className="hero-stats">
              <div className="stat">
                <span className="stat-value">2+</span>
                <span className="stat-label">Projects</span>
              </div>
              <div className="stat-divider"></div>
              <div className="stat">
                <span className="stat-value">5+</span>
                <span className="stat-label">Technologies</span>
              </div>
              <div className="stat-divider"></div>
              <div className="stat">
                <span className="stat-value">1+</span>
                <span className="stat-label">Years Exp.</span>
              </div>
            </div>
          </FadeIn>
        </div>
        <div className="scroll-hint">
          <div className="scroll-mouse">
            <div className="scroll-wheel"></div>
          </div>
          <span>Scroll to explore</span>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section">
        <div className="container">
          <FadeIn>
            <span className="section-label">About Me</span>
            <h2 className="section-title">Turning ideas into<br/><span className="highlight">digital reality</span></h2>
          </FadeIn>
          <div className="about-content">
            <FadeIn delay={100} className="about-text">
              <p>
                I'm a passionate Full Stack Developer based in India, with a strong foundation 
                in data structures, algorithms, and Agile methodologies. I specialize in building 
                RESTful APIs, database-driven applications, and system integrations.
              </p>
              <p>
                Passionate about exploring new technologies and contributing to engineering-driven 
                teams. I actively participate in hackathons and have organized multiple events as 
                a core organizer, collaborating with cross-functional teams to drive innovation.
              </p>
              <div className="about-highlights">
                <div className="highlight-item">
                  <span className="highlight-icon">🏆</span>
                  <span>Hackathon Participant & Organizer</span>
                </div>
                
                <div className="highlight-item">
                  <span className="highlight-icon">📍</span>
                  <span>Based in Belgaum, India</span>
                </div>
              </div>
            </FadeIn>
            <FadeIn delay={200} className="about-visual">
              <AnimatedCodeBlock />
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="section section-alt">
        <div className="container">
          <FadeIn>
            <span className="section-label">Technical Skills</span>
            <h2 className="section-title">Technologies I<br/><span className="highlight">work with</span></h2>
          </FadeIn>
          <div className="skills-grid">
            {skills.map((skill, index) => (
              <FadeIn key={skill.id} delay={index * 100}>
                <div className="skill-card">
                  <div className="skill-header">
                    <div className="skill-icon">
                      {skill.category.charAt(0)}
                    </div>
                    <h3>{skill.category}</h3>
                  </div>
                  <div className="skill-tags">
                    {skill.skills.split(', ').map((s, i) => (
                      <span key={i} className="skill-tag">{s}</span>
                    ))}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="section">
        <div className="container">
          <FadeIn>
            <span className="section-label">My Work</span>
            <h2 className="section-title">Featured<br/><span className="highlight">Projects</span></h2>
          </FadeIn>
          <div className="projects-grid">
            {projects.map((project, index) => (
              <FadeIn key={project.id} delay={index * 150}>
                <div className="project-card">
                  <div className="project-image">
                    <span className="project-number">0{index + 1}</span>
                  </div>
                  <div className="project-info">
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                    <div className="project-tech">
                      {project.technology.split(', ').map((tech, i) => (
                        <span key={i} className="tech-badge">{tech}</span>
                      ))}
                    </div>
                    <div className="project-features">
                      <h4>Key Features:</h4>
                      <ul>
                        {project.features.split(', ').map((feature, i) => (
                          <li key={i}>{feature}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="section section-alt">
        <div className="container">
          <FadeIn>
            <span className="section-label">Education</span>
            <h2 className="section-title">Academic<br/><span className="highlight">Background</span></h2>
          </FadeIn>
          <div className="education-timeline">
            {education.map((edu, index) => (
              <FadeIn key={edu.id} delay={index * 150}>
                <div className="education-card">
                  <div className="edu-timeline-dot"></div>
                  <div className="edu-content">
                    <span className="edu-duration">{edu.duration}</span>
                    <h3>{edu.degree}</h3>
                    <p className="edu-institution">{edu.institution}</p>
                    <span className="edu-grade">{edu.grade}</span>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="section">
        <div className="container">
          <FadeIn>
            <span className="section-label">Experience</span>
            <h2 className="section-title">Professional<br/><span className="highlight">Journey</span></h2>
          </FadeIn>
          <div className="experience-list">
            <FadeIn delay={100}>
              <div className="experience-card">
                <div className="exp-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
                    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
                  </svg>
                </div>
                <div className="exp-content">
                  <div className="exp-header">
                    <div>
                      <h3>Web Development Intern</h3>
                      <p className="exp-company">Creintors Automation Solutions Pvt Ltd</p>
                    </div>
                    <span className="exp-date">Apr 2024 – Jun 2024</span>
                  </div>
                  <ul className="exp-points">
                    <li>Built and integrated RESTful APIs ensuring seamless communication between frontend and backend</li>
                    <li>Worked in an Agile environment, participating in sprint planning and daily scrums</li>
                  </ul>
                </div>
              </div>
            </FadeIn>
            <FadeIn delay={200}>
              <div className="experience-card">
                <div className="exp-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
                    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
                  </svg>
                </div>
                <div className="exp-content">
                  <div className="exp-header">
                    <div>
                      <h3>Support Executive</h3>
                      <p className="exp-company">TCS</p>
                    </div>
                    <span className="exp-date">Aug 2021 – Sep 2022</span>
                  </div>
                  <ul className="exp-points">
                    <li>Supported deployments on servers and monitored servers, identified and resolved bugs</li>
                    <li>Followed up on resolved tickets by conducting surveys to gather feedback and identify inefficiencies</li>
                    <li>Reduced ticket count by 10% as shift lead through efficient task management</li>
                    <li>Gained exposure to ITSM processes through ticketing systems, incident tracking, and deployment support</li>
                  </ul>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Key Contributions */}
          <FadeIn delay={300}>
            <div className="contributions-section">
              <h3 className="contributions-title">Key Contributions & Engagements</h3>
              <div className="contributions-grid">
                <div className="contribution-card">
                  <span className="contribution-icon">🏆</span>
                  <p>Actively participated in hackathons, developing innovative solutions to real-world problems</p>
                </div>
                <div className="contribution-card">
                  <span className="contribution-icon">🎯</span>
                  <p>Organized multiple events and hackathons as a core organizer, collaborating with cross-functional teams</p>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section section-contact">
        <div className="container">
          <FadeIn>
            <span className="section-label">Get in Touch</span>
            <h2 className="section-title">Let's work<br/><span className="highlight">together</span></h2>
            <p className="contact-description">
              Have a project in mind or want to discuss opportunities?
              Feel free to reach out through any of the platforms below.
            </p>
          </FadeIn>
          
          <div className="contact-cards">
            <FadeIn delay={100}>
              <a href={`tel:${SOCIAL_LINKS.phone}`} className="contact-card">
                <div className="contact-icon phone">
                  <PhoneIcon />
                </div>
                <div className="contact-info">
                  <h3>Phone</h3>
                  <p>{SOCIAL_LINKS.phone}</p>
                </div>
                <div className="contact-arrow">
                  <ArrowRightIcon />
                </div>
              </a>
            </FadeIn>

            <FadeIn delay={150}>
              <a href={`mailto:${SOCIAL_LINKS.email}`} className="contact-card">
                <div className="contact-icon gmail">
                  <GmailIcon />
                </div>
                <div className="contact-info">
                  <h3>Email</h3>
                  <p>{SOCIAL_LINKS.email}</p>
                </div>
                <div className="contact-arrow">
                  <ArrowRightIcon />
                </div>
              </a>
            </FadeIn>

            <FadeIn delay={200}>
              <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer" className="contact-card">
                <div className="contact-icon linkedin">
                  <LinkedInIcon />
                </div>
                <div className="contact-info">
                  <h3>LinkedIn</h3>
                  <p>Connect with me</p>
                </div>
                <div className="contact-arrow">
                  <ArrowRightIcon />
                </div>
              </a>
            </FadeIn>

            <FadeIn delay={250}>
              <a href={SOCIAL_LINKS.github} target="_blank" rel="noopener noreferrer" className="contact-card">
                <div className="contact-icon github">
                  <GitHubIcon />
                </div>
                <div className="contact-info">
                  <h3>GitHub</h3>
                  <p>View my projects</p>
                </div>
                <div className="contact-arrow">
                  <ArrowRightIcon />
                </div>
              </a>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-brand">
            <span className="footer-logo">S</span>
            <p>Designed & Built with passion</p>
          </div>
          <div className="footer-links">
            <a href={`tel:${SOCIAL_LINKS.phone}`} className="footer-social-link">
              <PhoneIcon />
            </a>
            <a href={`mailto:${SOCIAL_LINKS.email}`} className="footer-social-link">
              <GmailIcon />
            </a>
            <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer" className="footer-social-link">
              <LinkedInIcon />
            </a>
            <a href={SOCIAL_LINKS.github} target="_blank" rel="noopener noreferrer" className="footer-social-link">
              <GitHubIcon />
            </a>
          </div>
          <p className="footer-copyright">© 2024 Somesh Hanji. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;