# Java Backend Developer Portfolio - Somesh Hanji

A production-ready portfolio website built with Spring Boot + MySQL backend and React frontend, showcasing professional Java backend development skills.

## 🚀 Live Application
- **Frontend**: https://springboot-portfolio.preview.emergentagent.com
- **Backend**: Spring Boot REST API on port 8001
- **Swagger**: Available at /api/swagger-ui.html

## ✅ What's Built

### Backend (Spring Boot 3.2.1)
- ✅ Proper layered architecture (Controller → Service → Repository → Entity)
- ✅ JPA + Hibernate ORM with MySQL
- ✅ Full CRUD REST APIs for Skills, Projects, Education, Contacts
- ✅ DTO pattern for data transfer
- ✅ Global exception handling
- ✅ Jakarta validation
- ✅ CORS configuration
- ✅ Auto data seeding (education, skills, projects)
- ✅ Swagger/OpenAPI documentation

### Frontend (React 19)
- ✅ Dark minimalist design with professional blue accents
- ✅ Smooth scrolling navigation
- ✅ Fully responsive layout
- ✅ Sections: Home, About, Skills, Projects, Education, Experience, Contact
- ✅ Working contact form integrated with backend
- ✅ Modern flat UI (no heavy glassmorphism)
- ✅ Work Sans + Inter fonts

### Database (MySQL)
- ✅ Tables: skills, projects, education, contacts
- ✅ Initial data automatically seeded
- ✅ Proper relationships and constraints

## 🎯 API Endpoints

All endpoints prefixed with `/api`:

**Skills**
- GET /api/skills - List all skills
- POST /api/skills - Create skill
- GET /api/skills/{id} - Get skill by ID
- PUT /api/skills/{id} - Update skill
- DELETE /api/skills/{id} - Delete skill

**Projects**
- GET /api/projects - List all projects
- POST /api/projects - Create project
- GET /api/projects/{id} - Get project by ID
- PUT /api/projects/{id} - Update project
- DELETE /api/projects/{id} - Delete project

**Education**
- GET /api/education - List all education (ordered)
- POST /api/education - Create education
- GET /api/education/{id} - Get education by ID
- PUT /api/education/{id} - Update education
- DELETE /api/education/{id} - Delete education

**Contact**
- POST /api/contact - Submit contact form
- GET /api/contact - List all contacts
- GET /api/contact/{id} - Get contact by ID
- DELETE /api/contact/{id} - Delete contact

## 📁 Project Structure

```
portfolio/
├── backend/
│   ├── src/main/java/com/portfolio/backend/
│   │   ├── controller/       # REST Controllers
│   │   ├── service/          # Business Logic
│   │   ├── repository/       # JPA Repositories
│   │   ├── entity/           # Database Entities
│   │   ├── dto/              # Data Transfer Objects
│   │   ├── exception/        # Exception Handlers
│   │   ├── config/           # Configuration
│   │   │   ├── CorsConfig.java
│   │   │   └── DataSeeder.java
│   │   └── BackendApplication.java
│   ├── src/main/resources/
│   │   └── application.properties
│   ├── pom.xml
│   ├── Dockerfile
│   └── .env
└── frontend/
    ├── src/
    │   ├── App.js           # Main React component
    │   └── App.css          # Dark minimalist styles
    ├── package.json
    └── .env
```

## 🛠️ Tech Stack

**Backend:**
- Java 17
- Spring Boot 3.2.1
- Spring Data JPA
- Hibernate
- MySQL 8.0 / MariaDB 10.11
- Maven
- Lombok
- Swagger/OpenAPI
- Jakarta Validation

**Frontend:**
- React 19
- Axios
- Modern CSS (Dark theme)
- Google Fonts (Work Sans, Inter)

## 🚀 Local Setup

### Prerequisites
- Java 17+
- Maven 3.8+
- MySQL 8.0+ or MariaDB 10.11+
- Node.js 16+
- Yarn

### Backend Setup

1. **Start MySQL and create database:**
```bash
mysql -u root -p
CREATE DATABASE portfolio_db;
CREATE USER 'portfolio_user'@'localhost' IDENTIFIED BY 'portfolio123';
GRANT ALL PRIVILEGES ON portfolio_db.* TO 'portfolio_user'@'localhost';
FLUSH PRIVILEGES;
exit;
```

2. **Set environment variables:**
```bash
export DB_HOST=localhost
export DB_PORT=3306
export DB_NAME=portfolio_db
export DB_USER=portfolio_user
export DB_PASSWORD=portfolio123
```

3. **Build and run:**
```bash
cd backend
mvn clean package
java -jar target/backend-1.0.0.jar
```

Backend runs on: http://localhost:8001

### Frontend Setup

1. **Install dependencies:**
```bash
cd frontend
yarn install
```

2. **Configure environment:**
```bash
# .env file
REACT_APP_BACKEND_URL=http://localhost:8001
```

3. **Start development server:**
```bash
yarn start
```

Frontend runs on: http://localhost:3000

## 🐳 Docker Deployment

**Build:**
```bash
cd backend
docker build -t portfolio-backend .
```

**Run:**
```bash
docker run -p 8001:8001 \
  -e DB_HOST=host.docker.internal \
  -e DB_PORT=3306 \
  -e DB_NAME=portfolio_db \
  -e DB_USER=portfolio_user \
  -e DB_PASSWORD=portfolio123 \
  portfolio-backend
```

## ☁️ Cloud Deployment

### Recommended Free Hosting

**Backend:**
- Render (recommended)
- Railway
- Heroku

**Frontend:**
- Vercel (recommended)
- Netlify
- Cloudflare Pages

**Database:**
- PlanetScale (MySQL)
- Railway
- Aiven

### Configuration for Cloud MySQL

Update `application.properties`:
```properties
spring.datasource.url=jdbc:mysql://your-cloud-host:3306/portfolio_db
spring.datasource.username=your_user
spring.datasource.password=your_password
```

## 📝 Data Seeded

### Education
1. MCA from KLS Gogte Institute of Technology (8.26 CGPA)
2. BCA from Peopletree Education Society (70.85%)

### Skills
- Programming: Java, Python
- Backend: Spring Boot, Servlets, JDBC
- Database: MySQL, SQLite
- Frontend: HTML, CSS, Bootstrap, JavaScript
- Tools: Git, Maven, Postman
- Concepts: OOP, Collections, REST APIs

### Projects
1. Employee Management System (Spring Boot + MySQL)
2. Recruiting Website for Welders (Django + SQLite)

## 👨‍💻 Developer Profile

**Somesh Nagappa Hanji**
- Java Backend Developer | Spring Boot Specialist
- Location: India
- Seeking entry-level backend developer opportunities

## 📚 API Documentation

Swagger UI: http://localhost:8001/api/swagger-ui.html

## 🎨 Design Highlights

- ✅ Dark minimalist theme (#0a0a0a)
- ✅ Professional blue accent (#3b82f6)
- ✅ Flat, modern design (no heavy glassmorphism)
- ✅ Smooth animations and transitions
- ✅ Fully responsive (mobile, tablet, desktop)
- ✅ Recruiter-friendly interface

---

Built with ❤️ using Spring Boot & React
