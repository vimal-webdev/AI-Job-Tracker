# 8. High-Level Design (HLD)

## 👶 For Freshers (Simple English)
An HLD is a broad map of the application. It outlines what modules we have (Companies, Jobs, AI, Reports) and how data enters the system, gets processed, and exits.

---

## 🧑•💻 For Intermediate Developers (Technical Explanation)
The HLD defines the component contracts and integrations:
- **Ingress Controllers**: Standard controller beans mapping requests like `/api/jobs`.
- **Integrations**: Direct HTTP client calling OpenAI Chat Completion endpoints and Gemini GenerateContent endpoints.
- **Egress Generators**: Stream-based file response handlers for Excel downloads.

---

## 👴 For Senior Developers & Interview Prep (System Design & Code Quality)
**Key HLD Questions for Interviewees:**
1. **How do you handle high load on Excel export?**
   - *Answer*: By stream-writing cells to client response output rather than buffering full spreadsheets in-memory using Apache POI `SXSSFWorkbook`.
2. **How does the system select the AI engine?**
   - *Answer*: Managed through property injection (`ai.provider`). A factory class or switch expression resolves the active implementation of `AIService`.\n