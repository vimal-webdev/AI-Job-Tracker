# 📋 AI Job Tracker - Architecture, Schema & Workflow Specification

This document presents the formal technical architecture, database schema, and data workflow diagrams for the AI-Powered Job Application Tracker.

---

## 1. System Architecture Diagram

```mermaid
graph TD
    classDef frontend fill:#f9f9f9,stroke:#333,stroke-width:2px;
    classDef backend fill:#e1f5fe,stroke:#0288d1,stroke-width:2px;
    classDef database fill:#efebe9,stroke:#5d4037,stroke-width:2px;
    classDef external fill:#f3e5f5,stroke:#7b1fa2,stroke-width:2px;

    subgraph Frontend ["React 19 Client (Port 5173)"]
        UI["Vite SPA UI (Glassmorphic Components)"]
        AISuite["AI Suite Module"]
    end

    subgraph Backend ["Spring Boot API Server (Port 8080)"]
        Controller["REST Controllers (AIController, JobController)"]
        Service["Service Layer (AIService, JobService)"]
        Parser["Document Extraction (PDFBox, Apache POI)"]
    end

    subgraph Database ["Database Layer"]
        DB[("MySQL Database (job_tracker_db)")]
    end

    subgraph External ["External Services"]
        AI_API["Generative AI APIs (Gemini / OpenAI)"]
    end

    UI -->|HTTP Requests / Multipart Form| Controller
    Controller --> Service
    Service -->|SQL CRUD / JPA| DB
    Service -->|Parse PDF / Word Documents| Parser
    Service -->|HTTPS Prompt payload| AI_API

    class UI,AISuite frontend;
    class Controller,Service,Parser backend;
    class DB database;
    class AI_API external;
```

---

## 2. Database Schema (Entity Relationship Diagram)

```mermaid
erDiagram
    COMPANIES {
        bigint id PK "Auto-Increment"
        varchar company_name "NOT NULL"
        varchar location "Nullable"
        varchar website "Nullable"
    }
    HR_CONTACTS {
        bigint id PK "Auto-Increment"
        varchar hr_name "NOT NULL"
        varchar email "Nullable"
        varchar phone "Nullable"
        varchar linkedin "Nullable"
        text notes "Nullable"
    }
    JOB_APPLICATIONS {
        bigint id PK "Auto-Increment"
        varchar job_id "Nullable"
        varchar role "NOT NULL"
        bigint company_id FK "References companies"
        bigint hr_contact_id FK "References hr_contacts, Nullable"
        varchar status "NOT NULL"
        date applied_date "Nullable"
        varchar resume_version "Nullable"
        text job_description "Nullable"
        varchar salary "Nullable"
        varchar location "Nullable"
        varchar job_portal "Nullable"
        text notes "Nullable"
    }

    COMPANIES ||--o{ JOB_APPLICATIONS : "associated with"
    HR_CONTACTS ||--o{ JOB_APPLICATIONS : "manages"
```

---

## 3. Resume Analysis Data Workflow

```mermaid
sequenceDiagram
    autonumber
    actor User as Job Seeker (React App)
    participant Backend as Spring Boot API
    participant Parser as Apache PDFBox / POI
    participant AI as Generative AI Service

    User->>Backend: Post Resume Document (.pdf/.docx) & target Job Description
    activate Backend
    Backend->>Parser: Extract raw text from file bytes
    Parser-->>Backend: Return extracted text contents
    Backend->>AI: Send prompt payload (Extracted resume text + Job Description)
    activate AI
    AI-->>Backend: Return structured JSON response matching response model DTO
    deactivate AI
    Backend-->>User: Return AIResumeAnalysisResponse (ATS Score, Improvements, Missing Skills)
    deactivate Backend
    User->>User: Render ATS match gauge & recommendations list in AI Suite UI
```
