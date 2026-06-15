const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Todo storage
let todos = [];
let nextId = 1;

// ─── ROUTES ────────────────────────────────────────────────

// GET /todos — fetch all todos
app.get("/todos", (req, res) => {
  res.json(todos);
});

// POST /todos — create a new todo
app.post("/todos", (req, res) => {
  const { text } = req.body;

  if (!text || text.trim() === "") {
    return res.status(400).json({ error: "Todo text is required" });
  }

  const newTodo = {
    id: nextId++,
    text: text.trim(),
    completed: false,
  };

  todos.push(newTodo);

  res.status(201).json(newTodo);
});

// PUT /todos/:id — update todo
app.put("/todos/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const todo = todos.find((t) => t.id === id);

  if (!todo) {
    return res.status(404).json({ error: "Todo not found" });
  }

  const { text, completed } = req.body;

  if (text !== undefined) {
    todo.text = text.trim();
  }

  if (completed !== undefined) {
    todo.completed = completed;
  }

  res.json(todo);
});

// DELETE /todos/:id — delete todo
app.delete("/todos/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const index = todos.findIndex((t) => t.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "Todo not found" });
  }

  const deleted = todos.splice(index, 1)[0];

  res.json({
    message: "Deleted successfully",
    todo: deleted,
  });
});

// DELETE completed todos
app.delete("/todos/completed/all", (req, res) => {
  const before = todos.length;

  todos = todos.filter((todo) => !todo.completed);

  res.json({
    message: `Removed ${before - todos.length} completed todos`,
  });
});

// Serve frontend
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Start server
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running!`);
});