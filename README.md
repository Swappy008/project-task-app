# 🗂️ Project & Task Manager

A full-stack web app built with **Node.js + Express** (backend) and **React** (frontend).  
Supports multiple projects, tasks with status tracking, filtering, and deletion.

---

## 📁 Folder Structure

```
project-task-app/
├── backend/
│   ├── server.js                  ← Entry point, starts Express server
│   ├── package.json               ← Backend dependencies
│   ├── routes/
│   │   ├── projectRoutes.js       ← URL routes for /projects
│   │   └── taskRoutes.js          ← URL routes for /tasks
│   ├── controllers/
│   │   ├── projectController.js   ← Logic for project API requests
│   │   └── taskController.js      ← Logic for task API requests
│   ├── services/
│   │   └── store.js               ← In-memory data storage
│   └── middleware/
│       └── errorHandler.js        ← Global error catching
│
└── frontend/
    ├── package.json               ← Frontend dependencies
    ├── public/
    │   └── index.html             ← HTML shell for React
    └── src/
        ├── index.js               ← React entry point
        ├── App.js                 ← Root component, holds all state
        ├── App.css                ← All styles
        ├── api/
        │   └── api.js             ← All fetch() calls to backend
        ├── hooks/
        │   ├── useProjects.js     ← Custom hook for project state
        │   └── useTasks.js        ← Custom hook for task state
        └── components/
            ├── ProjectPanel.jsx   ← Left panel: project list + form
            ├── TaskPanel.jsx      ← Right panel: tasks + filter
            └── TaskCard.jsx       ← Single task card component
```

---

## ⚙️ Setup & Installation (Step by Step)

### Step 1 — Install Node.js

1. Go to 👉 https://nodejs.org
2. Click the **"LTS"** (recommended) version button to download
3. Open the downloaded file and follow the installer steps (just click Next → Next → Finish)
4. To verify it worked, open **VS Code Terminal** (`Ctrl + `` ` ``) and type:
   ```
   node -v
   ```
   You should see something like `v20.x.x` ✅

---

### Step 2 — Download / Clone this project

If you have git installed:
```bash
git clone <your-repo-url>
cd project-task-app
```

Or just download the ZIP and extract it, then open the folder in VS Code:
- **File → Open Folder** → select `project-task-app`

---

### Step 3 — Start the Backend

Open a **new terminal** in VS Code (`Ctrl + `` ` ``):

```bash
cd backend
npm install
npm run dev
```

You should see:
```
✅ Server running at http://localhost:5000
```

> 💡 Keep this terminal open! The backend must stay running.

---

### Step 4 — Start the Frontend

Open a **second terminal** in VS Code (`Ctrl + Shift + `` ` ``):

```bash
cd frontend
npm install
npm start
```

This will automatically open your browser at **http://localhost:3000** 🎉

> 💡 You need BOTH terminals running at the same time — one for backend, one for frontend.

---

## 🌐 API Reference

### Projects

| Method | URL | Body | Description |
|--------|-----|------|-------------|
| `GET` | `/projects` | — | Get all projects |
| `POST` | `/projects` | `{ "name": "My Project" }` | Create a project |

### Tasks

| Method | URL | Body / Query | Description |
|--------|-----|-------------|-------------|
| `GET` | `/tasks?projectId=1&status=todo` | query params | Get tasks (filter optional) |
| `POST` | `/tasks` | `{ "title": "Fix bug", "projectId": 1 }` | Create a task |
| `PATCH` | `/tasks/:id` | `{ "status": "done" }` | Update task status |
| `DELETE` | `/tasks/:id` | — | Delete a task |

**Valid status values:** `todo` · `in-progress` · `done`

---

## 💡 Design Questions & Answers

### 1. How did you structure your backend, and why?

The backend follows a **3-layer architecture**:

```
Routes → Controllers → Services (Store)
```

- **Routes** (`routes/`) — Only define the URL and HTTP method. They don't contain logic.
- **Controllers** (`controllers/`) — Handle the request and response. They validate input, call the store, and send back the right HTTP status codes.
- **Services / Store** (`services/store.js`) — The data layer. All data lives here. Controllers never touch raw data directly.
- **Middleware** — Global error handling so unexpected crashes return a proper JSON response, not an HTML error page.

This separation keeps each file small and focused. If you later swap in-memory storage for a real database (like MongoDB), you only change `store.js` — nothing else needs to change.

---

### 2. How are you managing state and API calls in the frontend?

State is managed with **React hooks** (`useState`, `useEffect`) and organized into **custom hooks**:

- `useProjects.js` — Manages the projects list: fetching on load, and adding new ones.
- `useTasks.js` — Manages tasks for the selected project: fetching when project or filter changes, adding, updating status, and deleting.

All `fetch()` calls are isolated in `api/api.js`. Components never call `fetch()` directly — they just use the custom hooks. This means:
- Components stay clean and easy to read
- API logic is in one place (easy to update)
- Loading and error states are handled in the hooks and passed down as props

The root `App.js` holds `selectedProjectId` and `statusFilter` as state, and passes everything down to the panels via props.

---

### 3. If this app needed to scale, what would you improve?

**Backend:**
- Replace in-memory storage with a real database (e.g., **PostgreSQL** or **MongoDB**)
- Add a proper ORM like **Prisma** or **Mongoose** for data modeling
- Add **authentication** (JWT tokens) so users only see their own projects
- Add **pagination** to `/tasks` so large lists don't slow things down
- Use environment variables (`.env` file) for config like PORT and DB URL
- Add **rate limiting** to prevent abuse

**Frontend:**
- Use **React Query** or **SWR** for smarter data fetching (caching, auto-refetch)
- Add **React Router** for separate pages (e.g., `/projects/:id`)
- Add a global state manager (like **Zustand**) if the app grows
- Add proper **form validation libraries** (like React Hook Form)
- Write **unit tests** with Jest and React Testing Library

---

## ✅ Features Implemented

- [x] Create and list projects
- [x] Select a project to view its tasks
- [x] Add tasks to a selected project
- [x] Update task status (todo → in-progress → done)
- [x] Filter tasks by status
- [x] Delete tasks
- [x] Loading states on all async operations
- [x] Error handling and validation messages
- [x] Responsive layout (works on mobile too)
- [x] Organized backend: routes / controllers / services
- [x] Input validation with proper HTTP status codes
- [x] Edge case handling (missing fields, invalid status, non-existent project)

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Backend | Node.js, Express |
| Frontend | React 18, functional components |
| Styling | Plain CSS with CSS variables |
| Data | In-memory (no database) |
| Dev tool | nodemon (auto-restart backend) |
