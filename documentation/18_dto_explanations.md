# 18. DTO Explanations

## 👶 For Freshers (Simple English)
DTO stands for **Data Transfer Object**. It is a simple class used only to carry data from the frontend to the backend controller. It does not map directly to the database.

---

## 🧑•💻 For Intermediate Developers (Technical Explanation)
Why we separate Entities and DTOs:
- **Security**: Prevents users from binding values to internal fields (like database primary keys or audit timestamps).
- **Validation**: JSR-380 validation annotations (like `@NotBlank`, `@Email`) are declared on the DTO.

---

## 👴 For Senior Developers & Interview Prep (System Design & Code Quality)
Using DTOs decouples the internal database schema from the external API contract. Changes to the database table (e.g. renaming column `role` to `job_title`) will not break public API consumers, as only the conversion mapper mapping the DTO to Entity needs adjustment.\n