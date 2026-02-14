import { useEffect, useMemo, useState } from "react";
import { authApi, tasksApi } from "./api";

const initialForm = {
  title: "",
  description: "",
  due_date: "",
  is_completed: false,
};

export default function App() {
  const [mode, setMode] = useState("login");
  const [authLoading, setAuthLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [taskForm, setTaskForm] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);
  const [authForm, setAuthForm] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [taskLoading, setTaskLoading] = useState(false);

  const isAuthenticated = useMemo(() => Boolean(user), [user]);

  useEffect(() => {
    const bootstrap = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setAuthLoading(false);
        return;
      }

      try {
        const { data } = await authApi.me();
        setUser(data);
        await fetchTasks();
      } catch {
        localStorage.removeItem("token");
      } finally {
        setAuthLoading(false);
      }
    };

    bootstrap();
  }, []);

  const fetchTasks = async () => {
    setTaskLoading(true);
    try {
      const { data } = await tasksApi.list();
      setTasks(data);
    } catch {
      setError("Unable to fetch tasks.");
    } finally {
      setTaskLoading(false);
    }
  };

  const handleAuth = async (event) => {
    event.preventDefault();
    setError("");

    try {
      const payload =
        mode === "register"
          ? authForm
          : { username: authForm.username, password: authForm.password };
      const { data } = mode === "register" ? await authApi.register(payload) : await authApi.login(payload);

      localStorage.setItem("token", data.token);
      setUser(data.user);
      setAuthForm({ username: "", email: "", password: "" });
      await fetchTasks();
    } catch (err) {
      setError(err?.response?.data?.detail || "Authentication failed.");
    }
  };

  const handleLogout = async () => {
    try {
      await authApi.logout();
    } catch {
      // ignore logout API failure and clear local state anyway
    } finally {
      localStorage.removeItem("token");
      setUser(null);
      setTasks([]);
      setEditingId(null);
      setTaskForm(initialForm);
    }
  };

  const handleTaskSubmit = async (event) => {
    event.preventDefault();
    setError("");

    const payload = {
      ...taskForm,
      due_date: taskForm.due_date || null,
    };

    try {
      if (editingId) {
        await tasksApi.update(editingId, payload);
      } else {
        await tasksApi.create(payload);
      }

      setTaskForm(initialForm);
      setEditingId(null);
      await fetchTasks();
    } catch {
      setError("Unable to save task.");
    }
  };

  const handleEdit = (task) => {
    setEditingId(task.id);
    setTaskForm({
      title: task.title,
      description: task.description || "",
      due_date: task.due_date || "",
      is_completed: task.is_completed,
    });
  };

  const handleDelete = async (taskId) => {
    setError("");
    try {
      await tasksApi.remove(taskId);
      setTasks((prev) => prev.filter((task) => task.id !== taskId));
    } catch {
      setError("Unable to delete task.");
    }
  };

  if (authLoading) {
    return <div className="container">Loading...</div>;
  }

  if (!isAuthenticated) {
    return (
      <div className="container card">
        <h1>To-Do List</h1>
        <p>{mode === "login" ? "Log in to manage your tasks." : "Create an account to get started."}</p>

        <form onSubmit={handleAuth} className="form">
          <input
            required
            placeholder="Username"
            value={authForm.username}
            onChange={(e) => setAuthForm((prev) => ({ ...prev, username: e.target.value }))}
          />

          {mode === "register" && (
            <input
              type="email"
              placeholder="Email"
              value={authForm.email}
              onChange={(e) => setAuthForm((prev) => ({ ...prev, email: e.target.value }))}
            />
          )}

          <input
            type="password"
            required
            placeholder="Password"
            value={authForm.password}
            onChange={(e) => setAuthForm((prev) => ({ ...prev, password: e.target.value }))}
          />

          <button type="submit">{mode === "login" ? "Login" : "Register"}</button>
        </form>

        <button className="link" onClick={() => setMode((prev) => (prev === "login" ? "register" : "login"))}>
          {mode === "login" ? "Need an account? Register" : "Already have an account? Login"}
        </button>

        {error && <p className="error">{error}</p>}
      </div>
    );
  }

  return (
    <div className="container">
      <div className="header">
        <h1>{user.username}'s Tasks</h1>
        <button onClick={handleLogout}>Logout</button>
      </div>

      <div className="card">
        <h2>{editingId ? "Edit Task" : "Add Task"}</h2>
        <form onSubmit={handleTaskSubmit} className="form">
          <input
            required
            placeholder="Task title"
            value={taskForm.title}
            onChange={(e) => setTaskForm((prev) => ({ ...prev, title: e.target.value }))}
          />
          <textarea
            placeholder="Description"
            value={taskForm.description}
            onChange={(e) => setTaskForm((prev) => ({ ...prev, description: e.target.value }))}
          />
          <input
            type="date"
            value={taskForm.due_date}
            onChange={(e) => setTaskForm((prev) => ({ ...prev, due_date: e.target.value }))}
          />

          <label className="checkbox">
            <input
              type="checkbox"
              checked={taskForm.is_completed}
              onChange={(e) => setTaskForm((prev) => ({ ...prev, is_completed: e.target.checked }))}
            />
            Completed
          </label>

          <div className="actions">
            <button type="submit">{editingId ? "Update Task" : "Create Task"}</button>
            {editingId && (
              <button
                type="button"
                className="secondary"
                onClick={() => {
                  setEditingId(null);
                  setTaskForm(initialForm);
                }}
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="card">
        <h2>Task List</h2>
        {taskLoading ? (
          <p>Loading tasks...</p>
        ) : tasks.length === 0 ? (
          <p>No tasks yet.</p>
        ) : (
          <ul className="tasks">
            {tasks.map((task) => (
              <li key={task.id} className={task.is_completed ? "task completed" : "task"}>
                <div>
                  <strong>{task.title}</strong>
                  {task.description && <p>{task.description}</p>}
                  {task.due_date && <small>Due: {task.due_date}</small>}
                </div>
                <div className="actions">
                  <button className="secondary" onClick={() => handleEdit(task)}>
                    Edit
                  </button>
                  <button className="danger" onClick={() => handleDelete(task.id)}>
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
        {error && <p className="error">{error}</p>}
      </div>
    </div>
  );
}

