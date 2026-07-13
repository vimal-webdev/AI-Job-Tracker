# 14. Database Design

## 👶 For Freshers (Simple English)
We save our data in three simple tables:
1. `companies` (Who they are)
2. `hr_contacts` (How to contact them)
3. `job_applications` (The job details, linked to a company and contact)

---

## 🧑•💻 For Intermediate Developers (Technical Explanation)
- **Primary Keys**: Auto-incremented `BIGINT` variables.
- **Foreign Keys**:
  - `company_id` in `job_applications` references `id` in `companies`.
  - `hr_contact_id` in `job_applications` references `id` in `hr_contacts`.
- **Data Types**: `VARCHAR` for strings, `TEXT` for larger fields like notes and job descriptions.

---

## 👴 For Senior Developers & Interview Prep (System Design & Code Quality)
- **Normalization**: Structured to the **Third Normal Form (3NF)**. Redundant attributes (such as recruiter emails or company websites) are isolated in their respective tables rather than duplicated within individual job records.
- **Indexing**: Foreign keys are indexed to maximize join queries when assembling complete job views.\n