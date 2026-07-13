# 35. Data Flow Diagrams

## 👶 For Freshers (Simple English)
A Data Flow Diagram shows the path data travels from the user's screen into the backend, the database, and back.

---

## 🧑•💻 For Intermediate Developers (Technical Explanation)
ASCII Data Flow (DFD Level 0):
```
[User Input] ──> [React App] ──> [Spring Boot REST API] ──> [MySQL DB]
```

---

## 👴 For Senior Developers & Interview Prep (System Design & Code Quality)
**Detailed Data Flow Diagram (DFD Level 1):**
```
   [React View]  ──(JSON Request)──> [Validation Layer]
                                            │
                                            ▼ (Valid Payload)
   [Database]   <──(SQL Queries)──── [Service Layer] ──(HTTP)──> [AI Provider]
                                            │
                                            ▼
   [React View]  <──(JSON Response)── [Controller]
```\n