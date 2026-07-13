# 13. Frontend Implementation

## 👶 For Freshers (Simple English)
The frontend is what the user clicks on. It is made of buttons, input boxes, sidebars, charts, and boards that update in real-time.

---

## 🧑•💻 For Intermediate Developers (Technical Explanation)
Built using **React 19** and **Vite**:
- State is managed globally in `App.jsx` and passed to subviews as props.
- Custom Toast notification triggers alerts on successful actions (e.g. "Job Added Successfully").
- The Kanban board uses standard CSS flexbox grids to organize columns for status lanes.

---

## 👴 For Senior Developers & Interview Prep (System Design & Code Quality)
- **State Management**: Optimized to reduce rendering overhead. Lists and stats calculate metrics dynamically rather than duplicating stored states.
- **Styling**: Utilizes CSS variables in `index.css` for easy maintenance of the Glassmorphism theme (backdrop-filter, blur values, gradients).\n