# 4. Functional Requirements

## 👶 For Freshers (Simple English)
What the app *must* do:
- Show a stats bar (applied, interview, offer).
- Let the user save, edit, and delete companies.
- Let the user save contact info for recruiters.
- Track application states: `Applied`, `Shortlisted`, `Technical Round`, etc.
- Export applications to a download folder as an Excel file.
- Analyze resumes and JDs using AI.

---

## 🧑‍💻 For Intermediate Developers (Technical Explanation)
- **Authentication Bypass / Cross-Origin Resource Sharing**: CORS configured to allow React client (`http://localhost:5173`) requests to hit the backend (`http://localhost:8080`).
- **Relational Integrity**: Deleting a company should handle related job applications via foreign key constraints (`ON DELETE SET NULL` or cascade block).
- **AI Suite Execution**:
  - `POST /api/ai/resume-analysis`
  - `POST /api/ai/job-description`
  - `POST /api/ai/email`
  - `POST /api/ai/interview`

---

## 👴 For Senior Developers & Interview Prep (System Design & Code Quality)
**Interview Tip: Categorize requirements during system design interviews!**
```
+-------------------------------------------------------------+
|                     FUNCTIONAL USES                         |
+-------------------------------------------------------------+
|  [CRUD Service]   -->  Company, HRContact, JobApplication   |
|  [Excel Export]   -->  Apache POI workbook generation       |
|  [AI Endpoints]   -->  Gemini/OpenAI Prompt Pipeline        |
+-------------------------------------------------------------+
```
- **Validation Constraints**: Ensures all request bodies are verified before entering the business layer using `@Valid` annotation checks in controllers.\n