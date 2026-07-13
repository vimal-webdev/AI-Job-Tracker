# 41. 200+ Technical Interview Questions and Answers

## 👶 For Freshers (Simple English)
Sample Question: **What database did you use and why?**
- *Answer*: I used MySQL because it is free, easy to install, and stores data in organized tables.

---

## 🧑•💻 For Intermediate Developers (Technical Explanation)
Sample Question: **How did you handle CORS issues in Spring Boot?**
- *Answer*: I configured `@CrossOrigin(origins = "*")` at the controller level to allow the React client on port 5173 to call the backend on port 8080.

---

## 👴 For Senior Developers & Interview Prep (System Design & Code Quality)
Sample Question: **Explain the N+1 Select Problem and how you solved it in this project.**
- *Answer*: The N+1 select problem occurs when fetching an entity with lazy relationships, causing separate database queries for each child record. I solved this in JPA mappings by using `FetchType.LAZY` and applying custom `JOIN FETCH` queries when loading complete application datasets.\n