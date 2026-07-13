# 15. Entity-Relationship (ER) Diagram

## 👶 For Freshers (Simple English)
An ER Diagram is a visual diagram showing how tables relate:
- A company can have many jobs.
- An HR contact can represent many jobs.

---

## 🧑•💻 For Intermediate Developers (Technical Explanation)
ASCII ER Diagram:
```
+---------------+              +------------------+
|   COMPANIES   |              |   HR_CONTACTS    |
+---------------+              +------------------+
| id (PK)       |<───┐    ┌───>| id (PK)          |
| company_name  |    │    │    | hr_name          |
| location      |    │    │    | email            |
+---------------+    │    │    +------------------+
                     │    │
                     │    │
             +-------┴────┴-------+
             |  JOB_APPLICATIONS  |
             +--------------------+
             | id (PK)            |
             | role               |
             | company_id (FK)    |
             | hr_contact_id (FK) |
             | status             |
             +--------------------+
```

---

## 👴 For Senior Developers & Interview Prep (System Design & Code Quality)
The ER mapping enforces referential integrity:
- `COMPANIES` to `JOB_APPLICATIONS` is a **1-to-Many** relationship.
- `HR_CONTACTS` to `JOB_APPLICATIONS` is a **1-to-Many** relationship.\n