# 10. Complete Project Workflow

## 👶 For Freshers (Simple English)
Here is how you use the app:
1. Open the website. Add a new company (e.g. "Google").
2. Add a new recruiter contact (e.g. "Sarah, recruiter@google.com").
3. Add a job application (e.g. "Software Engineer", status "Applied").
4. Click "AI Suite", copy a job description, paste your resume, and get your match score.
5. Click "Export Excel" to save all applications as a spreadsheet.

---

## 🧑•💻 For Intermediate Developers (Technical Explanation)
Data Flow:
- **React Frontend**: Submits a POST request payload containing job data.
- **REST Controller**: Validates constraints and maps the DTO payload to a JPA entity.
- **Service Layer**: Coordinates transaction state, links related entity references, and saves the record.
- **Repository Layer**: Generates SQL insert commands for MySQL.

---

## 👴 For Senior Developers & Interview Prep (System Design & Code Quality)
**Lifecycle of a Transaction:**
1. CORS filter interceptor validates origin.
2. Servlet delegating filter handles security checks.
3. Controller triggers argument resolvers and validation.
4. `@Transactional` service block opens a session.
5. Hibernate performs dirty checks and synchronizes cache state with the database.
6. Service returns entity mapped to DTO.
7. Controller serializes DTO to JSON.\n