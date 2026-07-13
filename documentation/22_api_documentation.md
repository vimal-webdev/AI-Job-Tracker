# 22. API Documentation

## 👶 For Freshers (Simple English)
This document outlines what details the frontend needs to send to the backend to perform actions (like adding a job) and what responses to expect.

---

## 🧑•💻 For Intermediate Developers (Technical Explanation)
### 1. Create Job Application
- **Method / Route**: `POST /api/jobs`
- **Request Body**:
```json
{
  "jobId": "J101",
  "role": "React Developer",
  "companyId": 1,
  "hrContactId": 2,
  "status": "Applied",
  "appliedDate": "2026-07-13",
  "salary": "90000"
}
```
- **Responses**:
  - `201 Created`: Application registered successfully.
  - `400 Bad Request`: Input validation failed (e.g. empty role name).

---

## 👴 For Senior Developers & Interview Prep (System Design & Code Quality)
All API endpoints follow strict REST conventions:
- Verbs are represented by HTTP methods (GET, POST, PUT, DELETE).
- Resources are plural nouns (`/api/companies`, `/api/jobs`).
- Payload validation errors return structured error messages (handled by the Global Exception Handler).\n