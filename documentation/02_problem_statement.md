# 2. Problem Statement

## 👶 For Freshers (Simple English)
When applying for jobs:
1. People lose track of application stages (e.g., did they send a follow-up email? Is the next round a tech test?).
2. Resumes get rejected by automated screeners (ATS) because they don't match the job description.
3. Writing cold emails or thank-you notes takes too much time.
4. Candidates don't know what technical questions to prepare for.

---

## 🧑‍💻 For Intermediate Developers (Technical Explanation)
The primary challenges solved by this application include:
- **Data Fragmentation**: Relational mapping of jobs, companies, and contacts prevents data inconsistencies (like duplicate companies or orphaned contact notes).
- **Resume-JD Alignment**: Traditional keyword search is insufficient. This app uses AI vector-like contextual prompting to score alignment.
- **Automated Document Export**: Simplifies user reports from database records into downloadable `.xlsx` sheets.

---

## 👴 For Senior Developers & Interview Prep (System Design & Code Quality)
**Interview Focus: Business Value & Engineering Challenges**
- **Concurrency & Resource Leakage**: Heavy generation of Excel reports could exhaust memory if worksheets are not closed. The app uses `try-with-resources` to ensure `SXSSFWorkbook` or `XSSFWorkbook` objects are collected.
- **Rate-Limiting & Cost Management**: Large prompt exchanges with LLMs are expensive. The app manages this via prompt design (instructing the model to return structured, compact JSON schemas) and direct exception handling for HTTP 429/500 errors.\n