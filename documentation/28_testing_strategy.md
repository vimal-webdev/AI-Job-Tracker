# 28. Testing Strategy

## 👶 For Freshers (Simple English)
We write test scripts to make sure our code works correctly automatically. If we make changes, we run the tests to check if anything broke.

---

## 🧑•💻 For Intermediate Developers (Technical Explanation)
- **Unit Tests**: Mock dependencies using Mockito (`@ExtendWith(MockitoExtension.class)`) to test services in isolation.
- **Integration Tests**: Bootstraps the application context using `@SpringBootTest` to test end-to-end database actions.

---

## 👴 For Senior Developers & Interview Prep (System Design & Code Quality)
- **Testcontainers**: Use Testcontainers to run tests against a real Dockerized MySQL database instead of an H2 in-memory database to match production behavior.
- **MockMvc**: Mock web requests to test controllers and verify HTTP responses without starting the full tomcat server.\n