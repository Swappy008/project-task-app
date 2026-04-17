import { useState } from "react";
import TaskCard from "./TaskCard";

// Shows tasks for selected project + filter bar + add task form

const STATUS_FILTERS = ["all", "todo", "in-progress", "done"];

export default function TaskPanel({
  projectName,
  tasks,
  loading,
  error,
  onAdd,
  onStatusChange,
  onDelete,
  statusFilter,
  onFilterChange,
}) {
  const [title, setTitle] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setFormError("Task title cannot be empty.");
      return;
    }
    setFormError("");
    setSubmitting(true);
    await onAdd(title.trim());
    setTitle("");
    setSubmitting(false);
  };

  return (
    <div className="panel task-panel">
      <h2>✅ Tasks — <span className="project-name-label">{projectName}</span></h2>

      {error && <div className="error-msg">{error}</div>}

      {/* Add task form */}
      <form onSubmit={handleSubmit} className="input-row">
        <input
          type="text"
          placeholder="New task title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={submitting}
        />
        <button type="submit" disabled={submitting}>
          {submitting ? "Adding…" : "+ Add"}
        </button>
      </form>
      {formError && <div className="error-msg">{formError}</div>}

      {/* Filter bar */}
      <div className="filter-bar">
        {STATUS_FILTERS.map((f) => (
          <button
            key={f}
            className={`filter-btn ${statusFilter === f ? "active" : ""}`}
            onClick={() => onFilterChange(f)}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Task list */}
      {loading ? (
        <p className="muted">Loading tasks…</p>
      ) : tasks.length === 0 ? (
        <p className="muted">No tasks found. Add one above!</p>
      ) : (
        <div className="task-list">
          {tasks.map((t) => (
            <TaskCard
              key={t.id}
              task={t}
              onStatusChange={onStatusChange}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}
