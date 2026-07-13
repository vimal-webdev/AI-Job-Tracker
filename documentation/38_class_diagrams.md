# 38. Class Diagrams

## 👶 For Freshers (Simple English)
A Class Diagram shows the relationships between Java classes, including variables, data types, and method signatures.

---

## 🧑•💻 For Intermediate Developers (Technical Explanation)
ASCII Class Diagram:
```
+---------------------+         +---------------------+
|       Company       |         |   JobApplication    |
+---------------------+         +---------------------+
| - id: Long          |1       *| - id: Long          |
| - companyName: String|◄───────| - role: String      |
+---------------------+         | - company: Company  |
                                +---------------------+
```

---

## 👴 For Senior Developers & Interview Prep (System Design & Code Quality)
- Associations are explicitly defined.
- Decoupling relationships via entity configurations prevents cyclic dependencies between classes.\n