# 16. Database Schema (SQL)

## 👶 For Freshers (Simple English)
This is the SQL script used to create our tables in the MySQL database.

---

## 🧑•💻 For Intermediate Developers (Technical Explanation)
```sql
CREATE DATABASE IF NOT EXISTS job_tracker_db;
USE job_tracker_db;

CREATE TABLE IF NOT EXISTS companies (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    company_name VARCHAR(255) NOT NULL,
    location VARCHAR(255),
    website VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS hr_contacts (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    hr_name VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    phone VARCHAR(255),
    linkedin VARCHAR(255),
    notes TEXT
);

CREATE TABLE IF NOT EXISTS job_applications (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    job_id VARCHAR(255),
    role VARCHAR(255) NOT NULL,
    company_id BIGINT NOT NULL,
    hr_contact_id BIGINT,
    status VARCHAR(255) NOT NULL,
    applied_date DATE,
    resume_version VARCHAR(255),
    job_description TEXT,
    salary VARCHAR(255),
    location VARCHAR(255),
    job_portal VARCHAR(255),
    notes TEXT,
    FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE CASCADE,
    FOREIGN KEY (hr_contact_id) REFERENCES hr_contacts(id) ON DELETE SET NULL
);
```

---

## 👴 For Senior Developers & Interview Prep (System Design & Code Quality)
Note the constraints configured:
- `ON DELETE CASCADE` on `company_id` ensures that if a company is deleted, all its job applications are purged.
- `ON DELETE SET NULL` on `hr_contact_id` guarantees that if a recruiter record is removed, the associated job applications remain but the recruiter reference is cleared.\n