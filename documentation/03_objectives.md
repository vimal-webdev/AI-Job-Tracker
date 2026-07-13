# 3. Objectives

## 👶 For Freshers (Simple English)
Our goals:
1. Make a beautiful screen (Dashboard) to see all job stats.
2. Allow adding/updating/deleting companies, recruiters, and jobs.
3. Add a "magic" AI button to analyze resumes and write recruiter emails.
4. Export lists to Excel with one click.

---

## 🧑‍💻 For Intermediate Developers (Technical Explanation)
- Provide full **CRUD** endpoints for entities (`Company`, `HRContact`, `JobApplication`).
- Integrate **OpenAI/Gemini APIs** to parse unstructured text inputs and respond with structured, valid JSON payloads.
- Achieve **99.9% uptime** on local dev environments using clean Spring Boot error handlers and database automatic schema initialization.

---

## 👴 For Senior Developers & Interview Prep (System Design & Code Quality)
- **High Cohesion & Low Coupling**: Ensure components obey single responsibility principles.
- **Type Safety**: Establish strong contracts between the client and server via strict DTO structures.
- **Graceful Failover**: When AI keys are missing or invalid, the backend returns clear exceptions rather than generic HTTP 500 crashes.\n