# 6. Technology Stack

## 👶 For Freshers (Simple English)
Why we chose these tools:
- **Java 17 & Spring Boot**: Safe, fast, and standard for company apps.
- **React 19 & Vite**: Super fast tool to build modern user screens.
- **MySQL**: A free and reliable place to save our structured tables.
- **Apache POI**: The official library to write Microsoft Excel files in Java.
- **Gemini & OpenAI APIs**: The AI brains behind resume matching and email writing.

---

## 🧑‍💻 For Intermediate Developers (Technical Explanation)
| Tech | Role | Alternatives | Pros / Cons |
|------|------|--------------|-------------|
| **Java 17** | Core backend language | Node.js, Python | Strict typing, robust ecosystem / Verbose syntax |
| **Spring Boot** | API & business logic framework | NestJS, Express | DI/IoC, JPA, security features / Heavy memory footprint |
| **MySQL** | Persistent RDBMS | PostgreSQL, MongoDB | Relational integrity, ACID compliance / Slower horizontal scale |
| **React 19** | SPA frontend | Angular, Vue | Fast virtual DOM, huge community / Frequent version breaking changes |
| **Vite** | Frontend bundler | Webpack | Instant hot module replacement (HMR) / Newer ecosystem |

---

## 👴 For Senior Developers & Interview Prep (System Design & Code Quality)
**Interview Tip**: Explain your design choices by evaluating trade-offs:
- We selected **Spring Boot** because of its native support for database transaction boundaries (`@Transactional`) and standard ORM integrations.
- **Vite** was chosen over Webpack because it utilizes native ES Modules (ESM) to drastically minimize development server startup times and production build overheads.\n