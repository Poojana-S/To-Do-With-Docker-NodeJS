# 📝 Todo App — Node.js + Express + HTML/CSS/JS

A clean, full-stack Todo application with a REST API backend and a vanilla JS frontend.

---

## 🗂 Project Structure

```
todo-app/
├── server.js          # Express backend (REST API)
├── package.json
└── public/
    ├── index.html     # Frontend UI
    ├── style.css      # Styles
    └── app.js         # Frontend logic (fetch API calls)
```

---

## 🚀 Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Start the server
```bash
# Production
npm start

# Development (auto-restart on file changes)
npm run dev
```

### 3. Open in browser
```
http://localhost:3000
```

---

## 🔌 REST API Endpoints

| Method | Endpoint                    | Description            |
|--------|-----------------------------|------------------------|
| GET    | `/api/todos`                | Get all todos          |
| POST   | `/api/todos`                | Create a new todo      |
| PUT    | `/api/todos/:id`            | Update a todo          |
| DELETE | `/api/todos/:id`            | Delete a todo          |
| DELETE | `/api/todos/completed/all`  | Clear completed todos  |

### Example Requests

```bash
# Get all todos
curl http://localhost:3000/api/todos

# Create a todo
curl -X POST http://localhost:3000/api/todos \
  -H "Content-Type: application/json" \
  -d '{"text": "Buy groceries"}'

# Toggle complete
curl -X PUT http://localhost:3000/api/todos/1 \
  -H "Content-Type: application/json" \
  -d '{"completed": true}'

# Delete a todo
curl -X DELETE http://localhost:3000/api/todos/1
```

---

## ✨ Features

- ✅ Add, edit, delete todos
- ✅ Mark todos as complete/incomplete
- ✅ Filter by All / Active / Completed
- ✅ Clear all completed at once
- ✅ Item counter
- ✅ Toast notifications
- ✅ Fully responsive design

---

## 🔄 Upgrading to a Real Database

The current app uses in-memory storage (data resets on server restart).
To persist data, swap the `todos` array in `server.js` with:

- **SQLite** — `npm install better-sqlite3`
- **MongoDB** — `npm install mongoose`
- **PostgreSQL** — `npm install pg`
