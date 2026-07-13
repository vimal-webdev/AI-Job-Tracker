# 17. Entity Explanations

## 👶 For Freshers (Simple English)
Entities are Java classes that map exactly to the MySQL tables. When we save a Java entity object, Spring Boot automatically inserts a row into the database.

---

## 🧑•💻 For Intermediate Developers (Technical Explanation)
- **`@Entity`**: Informs Hibernate that this class corresponds to a database table.
- **`@Table(name = "...")`**: Specifies the database table name.
- **`@Id` & `@GeneratedValue`**: Marks the primary key and sets auto-increment.
- **`@ManyToOne` & `@JoinColumn`**: Configures foreign key mapping.

---

## 👴 For Senior Developers & Interview Prep (System Design & Code Quality)
**Interview Tip**: Explain JPA association mappings:
```java
@ManyToOne(fetch = FetchType.LAZY)
@JoinColumn(name = "company_id", nullable = false)
private Company company;
```
- We use **`FetchType.LAZY`** instead of default `EAGER` to avoid the **N+1 select query problem**. This ensures database connections are not overloaded with unnecessary joins.\n