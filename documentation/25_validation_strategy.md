# 25. Validation Strategy

## 👶 For Freshers (Simple English)
Validation is checking if the user typed the right data. For example, check that the company name isn't empty and that emails have an `@` symbol.

---

## 🧑•💻 For Intermediate Developers (Technical Explanation)
Uses **JSR-380 Bean Validation** in DTOs:
- `@NotBlank(message = "...")`: Prevents null or empty strings.
- `@Email(message = "...")`: Validates email patterns.
- `@NotNull`: Prevents null objects.

---

## 👴 For Senior Developers & Interview Prep (System Design & Code Quality)
Whenever validation fails, a `MethodArgumentNotValidException` is thrown.
This exception is intercepted by the `GlobalExceptionHandler` to compile validation errors into a clean, readable JSON map response.\n