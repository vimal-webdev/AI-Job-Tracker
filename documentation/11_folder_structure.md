# 11. Folder Structure

## 👶 For Freshers (Simple English)
Folders organize our code. The backend has Java code in `src/main/java`, configurations in `resources`, and the frontend code is in `frontend/src`.

---

## 🧑•💻 For Intermediate Developers (Technical Explanation)
```
job_tracker/
├── frontend/                     # React application
│   ├── src/
│   │   ├── components/           # Sub-views (Dashboard, Kanban, CRUD panels)
│   │   ├── App.jsx               # Main controller & state manager
│   │   ├── App.css               # Theme resets
│   │   ├── index.css             # Glassmorphism styling variables
│   │   └── main.jsx              # DOM mounting point
├── src/main/java/com/vimal/jobtracker/
│   ├── config/                   # RestTemplate & Bean settings
│   ├── controller/               # API routes
│   ├── dto/                      # Data Transfer Objects
│   ├── entity/                   # MySQL Schema Entities
│   ├── exception/                # Standard Exception handlers
│   ├── excel/                    # Excel Export logic
│   ├── repository/               # JPA database layer
│   └── service/                  # Core Business Services
└── pom.xml                       # Maven dependency tree
```

---

## 👴 For Senior Developers & Interview Prep (System Design & Code Quality)
We maintain a clean architecture by isolating business domains from infrastructure. Services only interact with DTOs and entities, preventing presentation leakages into the persistence tier.\n