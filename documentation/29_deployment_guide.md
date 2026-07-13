# 29. Deployment Guide

## 👶 For Freshers (Simple English)
Deployment is taking the app from your local computer and putting it on a cloud server (like AWS or Render) so that anyone can use it.

---

## 🧑•💻 For Intermediate Developers (Technical Explanation)
1. **Package Backend**: Run `./mvnw clean package` to generate a executable `.jar` file.
2. **Build Frontend**: Run `npm run build` in the `frontend` folder to compile optimized HTML/JS/CSS assets.
3. **Configure Environment**: Set the database connections and AI keys on the hosting provider.

---

## 👴 For Senior Developers & Interview Prep (System Design & Code Quality)
**Dockerized Deployment Strategy:**
```dockerfile
# Backend Dockerfile example
FROM eclipse-temurin:17-jdk-jammy
VOLUME /tmp
COPY target/jobtracker-0.0.1-SNAPSHOT.jar app.jar
ENTRYPOINT ["java","-jar","/app.jar"]
```
Run both services in a unified container network using Docker Compose to handle networking and container restarts.\n