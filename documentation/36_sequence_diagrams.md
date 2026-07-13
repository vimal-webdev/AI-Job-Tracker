# 36. Sequence Diagrams

## 👶 For Freshers (Simple English)
A Sequence Diagram shows step-by-step how different parts of the application execute code in order over time.

---

## 🧑•💻 For Intermediate Developers (Technical Explanation)
Order of events during an AI request:
```
React Client        Controller          Service           AI Provider
    │                   │                  │                   │
    │──(POST Request)──>│                  │                   │
    │                   │──(Call Service)─>│                   │
    │                   │                  │──(HTTP Request)──>│
    │                   │                  │<──(Return JSON)───│
    │                   │<──(Return DTO)───│                   │
    │<──(JSON Response)─│                  │                   │
```

---

## 👴 For Senior Developers & Interview Prep (System Design & Code Quality)
The sequence diagram demonstrates synchronous execution flows. If the external API call is slow, it blocks the thread. To optimize, use Spring Boot's `@Async` features or WebClient for asynchronous processing.\n