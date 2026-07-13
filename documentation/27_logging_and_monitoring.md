# 27. Logging & Monitoring

## 👶 For Freshers (Simple English)
Logging is like a flight recorder. It writes down every action the server performs (e.g. "Database connected", "AI endpoint called").

---

## 🧑•💻 For Intermediate Developers (Technical Explanation)
- Integrated using **SLF4J** and **Logback** (Spring Boot defaults).
- Log levels used: `INFO` for normal execution flow, `WARN` for minor anomalies, `ERROR` for crashes.

---

## 👴 For Senior Developers & Interview Prep (System Design & Code Quality)
- **Production Logging**: Configured to export log lines as structured JSON files for log collectors like ELK Stack or Splunk.
- **Performance Profiling**: Logs service method execution times using AOP (Aspect-Oriented Programming) to detect slow system transactions.\n