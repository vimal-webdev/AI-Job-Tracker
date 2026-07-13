# 37. Component Diagrams

## 👶 For Freshers (Simple English)
A Component Diagram shows the physical building blocks of the application and how they link together.

---

## 🧑•💻 For Intermediate Developers (Technical Explanation)
ASCII Component Diagram:
```
+--------------------------------------------------------+
|                      React UI Client                   |
+--------------------------------------------------------+
                           │
                           ▼ (REST APIs)
+--------------------------------------------------------+
|                     Spring Boot Backend                |
|  [Controller] ──> [Service] ──> [Repository] ──> [POI] |
+--------------------------------------------------------+
```

---

## 👴 For Senior Developers & Interview Prep (System Design & Code Quality)
This component diagram shows standard dependency alignment:
- Controllers depend only on Services.
- Services depend on Repositories and external clients.
- Repositories depend on persistence data sources.\n