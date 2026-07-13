# 9. Low-Level Design (LLD)

## 👶 For Freshers (Simple English)
An LLD is a detailed blueprint showing exactly how class objects look, what properties they contain, and what methods they execute.

---

## 🧑•💻 For Intermediate Developers (Technical Explanation)
The LLD focuses on object relationships:
- **JPA Mappings**:
  - `JobApplication` has a `@ManyToOne` relationship with `Company`.
  - `JobApplication` has a `@ManyToOne` relationship with `HRContact`.
- **Inheritance & Abstraction**:
  - `AIService` interface contains methods: `analyzeResume()`, `generateEmail()`, `prepareInterview()`.
  - Concrete classes: `GeminiAIService` and `OpenAIService`.

---

## 👴 For Senior Developers & Interview Prep (System Design & Code Quality)
**Class Diagram representation (ASCII):**
```
+-------------------------------------+
|         <<interface>>               |
|           AIService                 |
+-------------------------------------+
| + analyzeResume(req): Analysis      |
| + generateEmail(req): EmailResponse |
+-------------------------------------+
                  ▲
         ┌────────┴────────┐
         │                 │
+-----------------+ +-----------------+
| GeminiAIService | |  OpenAIService  |
+-----------------+ +-----------------+
```
The LLD implements runtime polymorphism. The app wires the correct bean using `@Primary` or conditional configuration loading based on the active application profile.\n