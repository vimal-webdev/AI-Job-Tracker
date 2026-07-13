# 23. Authentication & Authorization

## 👶 For Freshers (Simple English)
Authentication checks **who you are** (login). Authorization checks **what you can do** (admin actions vs user actions).

---

## 🧑•💻 For Intermediate Developers (Technical Explanation)
Currently, this application runs on a local, single-user dashboard model.
To transition to multi-user:
1. Integrate **Spring Security**.
2. Set up **JWT (JSON Web Tokens)**.
3. Secure endpoints using `@PreAuthorize("hasRole('ROLE_USER')")`.

---

## 👴 For Senior Developers & Interview Prep (System Design & Code Quality)
**System Design: Secure Multi-Tenant Architecture**
```
  [React UI] ──> [JWT Header Check] ──> [Spring Security Filter Chain]
                                                   │
                                                   ▼
                                         [TenantContext Identifier]
```
To implement multi-tenancy, add a `tenant_id` column to all tables and intercept queries using a custom Spring Data JPA dynamic filter.\n