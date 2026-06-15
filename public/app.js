const API = "/todos";

// ── State ──────────────────────────────────────────────────
let todos = [];
let filter = "all"; // all | active | completed

// ── DOM References ─────────────────────────────────────────
const todoInput  = document.getElementById("todoInput");
const addBtn     = document.getElementById("addBtn");
const todoList   = document.getElementById("todoList");
const footer     = document.getElementById("footer");
const itemCount  = document.getElementById("itemCount");
const clearBtn   = document.getElementById("clearBtn");
const filterBtns = document.querySelectorAll(".filter-btn");

// ── Toast Notification ─────────────────────────────────────
function showToast(msg) {
  let toast = document.getElementById("toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "toast";
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2500);
}

// ── API Helpers ────────────────────────────────────────────
async function apiFetch(url, options = {}) {
  const res = await fetch(url, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || "Something went wrong");
  }
  return res.json();
}

// ── CRUD Operations ────────────────────────────────────────
async function loadTodos() {
  try {
    todos = await apiFetch(API);
    render();
  } catch (e) {
    showToast("❌ " + e.message);
  }
}

async function addTodo() {
  const text = todoInput.value.trim();
  if (!text) { todoInput.focus(); return; }

  try {
    const newTodo = await apiFetch(API, {
      method: "POST",
      body: JSON.stringify({ text }),
    });
    todos.push(newTodo);
    todoInput.value = "";
    render();
    showToast("✅ Todo added!");
  } catch (e) {
    showToast("❌ " + e.message);
  }
}

async function toggleTodo(id) {
  const todo = todos.find((t) => t.id === id);
  if (!todo) return;

  try {
    const updated = await apiFetch(`${API}/${id}`, {
      method: "PUT",
      body: JSON.stringify({ completed: !todo.completed }),
    });
    Object.assign(todo, updated);
    render();
  } catch (e) {
    showToast("❌ " + e.message);
  }
}

async function deleteTodo(id) {
  try {
    await apiFetch(`${API}/${id}`, { method: "DELETE" });
    todos = todos.filter((t) => t.id !== id);
    render();
    showToast("🗑️ Todo deleted");
  } catch (e) {
    showToast("❌ " + e.message);
  }
}

async function saveEdit(id, newText) {
  if (!newText.trim()) return;
  try {
    const updated = await apiFetch(`${API}/${id}`, {
      method: "PUT",
      body: JSON.stringify({ text: newText.trim() }),
    });
    const todo = todos.find((t) => t.id === id);
    if (todo) Object.assign(todo, updated);
    render();
    showToast("✏️ Todo updated");
  } catch (e) {
    showToast("❌ " + e.message);
  }
}

async function clearCompleted() {
  try {
    await apiFetch(`${API}/completed/all`, { method: "DELETE" });
    todos = todos.filter((t) => !t.completed);
    render();
    showToast("🧹 Cleared completed todos");
  } catch (e) {
    showToast("❌ " + e.message);
  }
}

// ── Render ─────────────────────────────────────────────────
function render() {
  const visible = todos.filter((t) => {
    if (filter === "active")    return !t.completed;
    if (filter === "completed") return t.completed;
    return true;
  });

  todoList.innerHTML = "";

  if (visible.length === 0) {
    todoList.innerHTML = `<li class="empty-state">✨ Nothing here — add a task!</li>`;
  } else {
    visible.forEach((todo) => todoList.appendChild(createItem(todo)));
  }

  // Footer
  const activeCount = todos.filter((t) => !t.completed).length;
  const hasCompleted = todos.some((t) => t.completed);

  footer.style.display = todos.length ? "flex" : "none";
  itemCount.textContent = `${activeCount} item${activeCount !== 1 ? "s" : ""} left`;
  clearBtn.style.display = hasCompleted ? "inline-block" : "none";
}

function createItem(todo) {
  const li = document.createElement("li");
  li.className = `todo-item${todo.completed ? " completed" : ""}`;
  li.dataset.id = todo.id;

  li.innerHTML = `
    <input type="checkbox" ${todo.completed ? "checked" : ""} title="Mark complete" />
    <span class="todo-text">${escapeHtml(todo.text)}</span>
    <div class="todo-actions">
      <button class="btn-icon btn-edit" title="Edit">✏️</button>
      <button class="btn-icon btn-del"  title="Delete">🗑️</button>
    </div>
  `;

  // Checkbox
  li.querySelector('input[type="checkbox"]').addEventListener("change", () =>
    toggleTodo(todo.id)
  );

  // Edit button → inline editing
  li.querySelector(".btn-edit").addEventListener("click", () => {
    const span = li.querySelector(".todo-text");
    const actions = li.querySelector(".todo-actions");

    const input = document.createElement("input");
    input.className = "edit-input";
    input.value = todo.text;
    span.replaceWith(input);
    input.focus();

    const saveBtn = document.createElement("button");
    saveBtn.className = "btn-icon btn-save";
    saveBtn.textContent = "💾";
    saveBtn.title = "Save";
    actions.replaceWith(saveBtn);

    const doSave = () => saveEdit(todo.id, input.value);
    saveBtn.addEventListener("click", doSave);
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter")  doSave();
      if (e.key === "Escape") render();
    });
  });

  // Delete button
  li.querySelector(".btn-del").addEventListener("click", () =>
    deleteTodo(todo.id)
  );

  return li;
}

function escapeHtml(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// ── Event Listeners ────────────────────────────────────────
addBtn.addEventListener("click", addTodo);
todoInput.addEventListener("keydown", (e) => { if (e.key === "Enter") addTodo(); });
clearBtn.addEventListener("click", clearCompleted);

filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    filter = btn.dataset.filter;
    render();
  });
});

// ── Init ───────────────────────────────────────────────────
loadTodos();
