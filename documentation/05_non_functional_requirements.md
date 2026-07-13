# 5. Non-Functional Requirements

## 👶 For Freshers (Simple English)
How well the app *must* perform:
- The screen should load instantly (under 1 second).
- The dashboard must look modern and adjust to laptop, tablet, and mobile screens.
- If the database fails, show a clean error message, don't just crash.

---

## 🧑‍💻 For Intermediate Developers (Technical Explanation)
- **Scalability**: Decoupled REST APIs allow the backend to be scaled independently of the React frontend.
- **JSON Sanitization**: AI results are parsed and sanitized to remove Markdown wrappers (like ` ```json `) to guarantee valid API output.
- **Maintainability**: Clear package hierarchy (controller, service, repository, DTO) for quick onboarding.

---

## 👴 For Senior Developers & Interview Prep (System Design & Code Quality)
- **Availability & Resilience**: The database pool is managed via HikariCP, handling max connections, idle timeouts, and automatic connection retries.
- **API Performance**: Response times for local CRUD are sub-50ms; AI calls are handled asynchronously or with loader states in the UI to prevent thread blocking.
- **SEO & Responsiveness**: Strict semantic HTML structure used in React layout modules.\n