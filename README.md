# 🚀 AI-Powered Job Application Tracker

> A Smart Job Application Management System built using **Java 17, Spring Boot, MySQL, REST APIs, Apache POI, and AI Integration (Gemini & OpenAI)** to help job seekers organize applications, manage HR contacts, generate professional emails, analyze job descriptions, and prepare for interviews.

![Java](https://img.shields.io/badge/Java-17-orange)
![Spring Boot](https://img.shields.io/badge/SpringBoot-3.x-brightgreen)
![MySQL](https://img.shields.io/badge/MySQL-8-blue)
![REST API](https://img.shields.io/badge/REST-API-red)
![Maven](https://img.shields.io/badge/Maven-3.9+-purple)
![License](https://img.shields.io/badge/License-MIT-yellow)

---

## 📌 Project Overview

Searching for jobs involves applying to hundreds of companies. Tracking applications manually in Excel becomes difficult and time-consuming.

This application provides a centralized backend with REST APIs where users can:
- Store job applications
- Manage company information
- Save HR contacts
- Track interview stages
- Export applications to Excel (via Apache POI)
- Generate professional email templates (via AI)
- Analyze Job Descriptions (via AI)
- Generate interview questions (via AI)
- Receive AI suggestions for resume improvements

---

## 💡 Key Features

### Company Management
- Add, update, view, and delete company details.

### HR Contact Management
- Manage recruiter contacts: Name, email, phone, LinkedIn profile, and notes.

### Job Application Management
- Track Job ID, role, company, HR contact, applied date, application status, resume version, job description, salary, location, job portal, and custom notes.

### Application Status
Supported stages:
`Applied`, `Resume Viewed`, `Shortlisted`, `Technical Round`, `HR Round`, `Manager Round`, `Offer Received`, `Rejected`, `Joined`

### Excel Export (`GET /api/jobs/export`)
Generates a styled Excel sheet using Apache POI containing:
- Job ID
- Company
- Job Role
- HR Name
- Email
- Phone
- Status
- Applied Date

### AI Integration (`/api/ai/*`)
Supports both **Google Gemini API** and **OpenAI API** to:
- **Analyze Resume against Job Description**: Supports uploading resume documents directly (**PDF, DOC, DOCX up to 2MB**), extracts text, calculates ATS Score, highlights missing skills, and suggests resume improvements.
- **Analyze Job Description**: Extracts required skills, experience level, responsibilities, and search keywords.
- **Generate Interview Preparation**: Produces relevant Java, Spring Boot, SQL, HR, and coding questions based on the job role.
- **Generate Professional Emails**: Automatically creates custom Cold Emails, Referrals, Follow-ups, Thank You, and Confirmation emails using target role, company, recruiter/HR name, and optional custom context details.

---

## 🏗 System Architecture

```
               Spring Boot REST API Backend
                            │
     ┌──────────────────────┼──────────────────────┐
     ▼                      ▼                      ▼
  Company               HR Contact            Job Tracker
     │                      │                      │
     └──────────────────────┼──────────────────────┘
                            ▼
                     Spring Data JPA (Hibernate)
                            │
                            ▼
                      MySQL Database
```

---

## 📂 Project Structure

```
jobtracker
│
├── src/main/java/com/vimal/jobtracker
│   ├── config                  # Configuration beans (RestTemplate, ObjectMapper)
│   ├── controller              # REST Controllers exposing endpoints
│   ├── dto                     # Request and Response payloads
│   ├── entity                  # JPA Hibernate Entities
│   ├── exception               # Global Exception handlers
│   ├── excel                   # Apache POI Excel export utility
│   ├── repository              # Spring Data JPA Repository interfaces
│   ├── service                 # Core Services (CRUD, Excel generation, AI calls)
│   └── JobtrackerApplication.java
│
├── src/main/resources
│   └── application.properties  # Database and AI configuration properties
│
└── pom.xml                     # Maven dependencies (Web, JPA, Validation, POI, MySQL)
```

---

## 🗄 Database Design

### Company (`companies`)
- `id` (BIGINT, PK, Auto-increment)
- `company_name` (VARCHAR, Not Null)
- `location` (VARCHAR)
- `website` (VARCHAR)

### HR Contact (`hr_contacts`)
- `id` (BIGINT, PK, Auto-increment)
- `hr_name` (VARCHAR, Not Null)
- `email` (VARCHAR)
- `phone` (VARCHAR)
- `linkedin` (VARCHAR)
- `notes` (TEXT)

### Job Application (`job_applications`)
- `id` (BIGINT, PK, Auto-increment)
- `job_id` (VARCHAR)
- `role` (VARCHAR, Not Null)
- `company_id` (FK -> companies)
- `hr_contact_id` (FK -> hr_contacts, Nullable)
- `status` (VARCHAR, Not Null)
- `applied_date` (DATE)
- `resume_version` (VARCHAR)
- `job_description` (TEXT)
- `salary` (VARCHAR)
- `location` (VARCHAR)
- `job_portal` (VARCHAR)
- `notes` (TEXT)

---

## 🔥 REST APIs

### Company APIs
```http
POST   /api/companies       - Create Company
GET    /api/companies       - Get All Companies
GET    /api/companies/{id}  - Get Company Details
PUT    /api/companies/{id}  - Update Company
DELETE /api/companies/{id}  - Delete Company
```

### HR APIs
```http
POST   /api/hr              - Create HR Contact
GET    /api/hr              - Get All HR Contacts
GET    /api/hr/{id}         - Get HR Details
PUT    /api/hr/{id}         - Update HR Contact
DELETE /api/hr/{id}         - Delete HR Contact
```

### Job APIs
```http
POST   /api/jobs            - Create Job Application
GET    /api/jobs            - Get All Job Applications
GET    /api/jobs/{id}       - Get Job Details
PUT    /api/jobs/{id}       - Update Job Application
DELETE /api/jobs/{id}       - Delete Job Application
GET    /api/jobs/export     - Export Applications to Excel
```

### AI APIs
```http
POST   /api/ai/email             - Generate Email Templates
POST   /api/ai/resume-analysis   - Analyze Resume Match
POST   /api/ai/job-description   - Extract Details from Job Description
POST   /api/ai/interview         - Generate Role-Specific Interview Questions
```

---

## 🚀 Installation & Setup

1. **Clone the project** or copy it to your workspace.
2. **Database Setup**: Make sure MySQL is running. In `src/main/resources/application.properties`, configure your credentials. The schema `job_tracker_db` will be auto-created if it does not exist:
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/job_tracker_db?createDatabaseIfNotExist=true
   spring.datasource.username=root
   spring.datasource.password=vimal
   ```
3. **AI Configuration**: In `application.properties`, specify your preferred AI provider (`gemini` or `openai`) and supply your API key:
   ```properties
   ai.provider=gemini
   ai.gemini.api-key=YOUR_GEMINI_API_KEY
   ```
   *Note: If the key is left as the placeholder `YOUR_GEMINI_API_KEY_HERE` or empty, the application automatically runs in an **Offline Mock Mode**, returning high-quality, dynamically generated mock responses for testing all AI features.*
## 💻 Frontend Application

The frontend is a modern, responsive web application built with **React 19** and **Vite**. It features a premium dark-themed **Glassmorphism** styling system built entirely with custom CSS.

### Key Frontend Interfaces:
- **Dashboard Overview**: Displays key job metrics (applied count, shortlisted, active interviews, offers) and a feed of recent activities.
- **Job Applications (Kanban & List)**: Seamless toggle between a board-style workflow lane and search-enabled tabular view.
- **Companies & Recruiters Registry**: Full panels for management of target companies and contact databases.
- **AI Suite Workspace**: Side-by-side interfaces for resume evaluation (ATS matching), JD extraction, cold email generation, and role prep questions.

---

## ⚙️ Running the Full-Stack Application

### Option A: Clean Startup (Recommended for Windows)
We have provided a automated runner script `run_app.ps1` in the root folder. It stops any active/stale server processes listening on ports `8080` or `5173` and launches both the backend and frontend in separate, clean terminal windows:

```powershell
powershell -ExecutionPolicy Bypass -File .\run_app.ps1
```

---

### Option B: Running Services Separately

#### 1. Launch Spring Boot Backend (Port 8080)
Ensure MySQL is running and your database/AI API keys are configured in `src/main/resources/application.properties`. From the project root, run:

- **Windows Powershell**:
  ```powershell
  ./mvnw spring-boot:run
  ```
- **macOS / Linux**:
  ```bash
  ./mvnw spring-boot:run
  ```

#### 2. Launch Vite React Frontend (Port 5173)
Open a new terminal window, change directory to the `frontend` folder, and launch the dev server:

```bash
cd frontend
npm run dev
```

---

## 🌐 Application Portals
Once both components are running, they can be reached at:
- **Backend API Port**: `http://localhost:8080`
- **Frontend App Portal**: `http://localhost:5173`
