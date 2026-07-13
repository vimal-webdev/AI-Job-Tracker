# 1. Project Overview

## 👶 For Freshers (Simple English)
Imagine you are looking for a job. You apply to 50 or 100 different companies on LinkedIn, Indeed, and Naukri. Keeping track of who you applied to, when you applied, who the recruiter is, and which resume you sent becomes a mess. 
This project is a **Smart Job Tracker**. It is like a digital diary but smarter. It keeps all your job applications in one place and uses AI (like ChatGPT/Gemini) to help you:
- Check if your resume matches a job.
- Write emails to recruiters.
- Prepare for interview questions.

---

## 🧑‍💻 For Intermediate Developers (Technical Explanation)
The **AI-Powered Job Application Tracker** is a full-stack, single-user productivity platform. It features a three-tier architecture:
- **Frontend**: A single-page application built with React 19 and Vite. It utilizes a responsive layout with custom Glassmorphism styles and Lucide-react icons.
- **Backend**: A RESTful Spring Boot 3.x/4.x application built on Java 17, using Spring Data JPA for object-relational mapping.
- **Database**: MySQL 8.x storing structured relational data.
- **AI Integrations**: Exposes HTTP clients communicating directly with Google Gemini & OpenAI API endpoints to perform prompt-based resume checks, job description parsing, cold email templating, and role-specific interview preparation.

---

## 👴 For Senior Developers & Interview Prep (System Design & Code Quality)
From an engineering standpoint, the system is designed around high cohesion and loose coupling. Key architectural highlights include:
- **Clean RESTful API Boundaries**: Decoupled models using DTOs with JSR-380 validation (`@NotNull`, `@Size`, etc.).
- **Polymorphic Service Design**: An `AIService` abstraction with support for runtime-driven provider selection (`gemini` or `openai` via spring configuration properties).
- **Report Generation**: Utilizing Apache POI to parse memory-efficient streams and export application datasets directly into native Excel files.
- **Micro-Animations & Toast Alerts**: Built into React to maximize UX feedback cycles.\n