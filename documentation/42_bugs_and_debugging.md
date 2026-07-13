# 42. Common Bugs and Debugging Scenarios

## 👶 For Freshers (Simple English)
If the database connection fails:
- Check if your MySQL server is running.
- Verify the username and password in `application.properties`.

---

## 🧑•💻 For Intermediate Developers (Technical Explanation)
- **JSON Formatting Errors**: AI responses may occasionally return Markdown wrappers (e.g. ` ```json `). The backend service uses regex cleanups to strip these before parsing the JSON string.
- **Port Collision**: If port 8080 is already in use, stop the conflicting process or change the server port using `server.port = 8081` in properties.

---

## 👴 For Senior Developers & Interview Prep (System Design & Code Quality)
- **Heap Memory Outage**: Large Excel exports can exhaust heap memory. Optimize memory usage by streaming data using Apache POI's `SXSSFWorkbook`.
- **Hikari Connection Timeout**: Resolve timeouts by optimizing database indexes and closing active entity manager connections promptly.\n