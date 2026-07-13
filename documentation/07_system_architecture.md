# 7. System Architecture

## 👶 For Freshers (Simple English)
Here is how the parts of the app talk to each other:
```
  [User's Web Browser (React UI)]
               │
               ▼  (HTTP REST Requests)
    [Spring Boot API Server]
         /           \
        ▼             ▼
  [MySQL DB]     [Google/OpenAI APIs]
```

---

## 🧑‍💻 For Intermediate Developers (Technical Explanation)
The system adopts a classic **3-Tier Layered Architecture**:
1. **Presentation Layer**: React SPA communicating asynchronously using standard REST calls.
2. **Business Logic Layer**: Spring Boot services handling transactions, exporting reports, and sanitizing LLM responses.
3. **Data Access Layer**: Spring Data JPA translating object mutations into MySQL queries.

---

## 👴 For Senior Developers & Interview Prep (System Design & Code Quality)
**ASCII Architecture Diagram:**
```
+-----------------------------------------------------------+
|                    PRESENTATION LAYER                     |
|                React 19 SPA (Vite Dev Server)             |
+-----------------------------------------------------------+
                             │
                             ▼  (JSON over HTTPS / CORS)
+-----------------------------------------------------------+
|                      APPLICATION LAYER                    |
|             Spring Boot Controller (REST APIs)            |
|                            │                              |
|                            ▼                              |
|                 Core Service Components                   |
|       (CompanyService, JobService, AIService)             |
+-----------------------------------------------------------+
         │                                         │
         ▼ (JDBC / Hibernate)                      ▼ (JSON over HTTPS)
+--------------------------------+       +------------------+
|        PERSISTENCE LAYER       |       |  EXTERNAL LAYER  |
|       MySQL 8.x Database       |       |  Gemini / OpenAI |
+--------------------------------+       +------------------+
```
- Decoupling services enables isolated testing of mock repository operations and mock external AI client requests.\n