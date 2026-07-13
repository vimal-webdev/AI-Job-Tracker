# 26. Exception Handling

## 👶 For Freshers (Simple English)
If something goes wrong (like a database crash or not finding a company), we don't want a scary white screen. We want a friendly message explaining the problem.

---

## 🧑•💻 For Intermediate Developers (Technical Explanation)
- **`ResourceNotFoundException`**: Custom exception for missing database resources.
- **`@RestControllerAdvice`**: Declares a global handler intercepting exceptions across all controller classes.

---

## 👴 For Senior Developers & Interview Prep (System Design & Code Quality)
**ASCII Handler Workflow:**
```
[Service throws ResourceNotFoundException]
                     │
                     ▼
       [GlobalExceptionHandler]
                     │
                     ▼ (Intercepts Exception)
[Returns 404 NOT FOUND with ErrorResponse JSON]
```
This ensures consistent API behavior under all error scenarios.\n