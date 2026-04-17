import { useState } from "react";

// Shows project list + form to create a new project

export default function ProjectPanel({ projects, selectedId, onSelect, onAdd, loading, error }) {
  const [name, setName] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setFormError("Project name cannot be empty.");
      return;
    }
    setFormError("");
    setSubmitting(true);
    await onAdd(name.trim());
    setName("");
    setSubmitting(false);
  };

  return (
    <div className="panel project-panel">
      <h2>📁 Projects</h2>

      {error && <div className="error-msg">{error}</div>}

      <form onSubmit={handleSubmit} className="input-row">
        <input
          type="text"
          placeholder="New project name..."
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={submitting}
        />
        <button type="submit" disabled={submitting}>
          {submitting ? "Adding…" : "+ Add"}
        </button>
      </form>

      {formError && <div className="error-msg">{formError}</div>}

      {loading ? (
        <p className="muted">Loading projects…</p>
      ) : projects.length === 0 ? (
        <p className="muted">No projects yet. Create one above!</p>
      ) : (
        <ul className="project-list">
          {projects.map((p) => (
            <li
              key={p.id}
              className={`project-item ${p.id === selectedId ? "active" : ""}`}
              onClick={() => onSelect(p.id)}
            >
              <span className="project-dot" />
              {p.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
