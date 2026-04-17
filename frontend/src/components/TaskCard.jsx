// A single task card with status dropdown and delete button

const STATUS_OPTIONS = ["todo", "in-progress", "done"];

const STATUS_COLORS = {
  todo: "#f59e0b",
  "in-progress": "#3b82f6",
  done: "#10b981",
};

export default function TaskCard({ task, onStatusChange, onDelete }) {
  return (
    <div className="task-card">
      <div className="task-header">
        <span className="task-title">{task.title}</span>
        <button
          className="delete-btn"
          onClick={() => onDelete(task.id)}
          title="Delete task"
        >
          ✕
        </button>
      </div>

      <div className="task-footer">
        <span
          className="status-badge"
          style={{ background: STATUS_COLORS[task.status] }}
        >
          {task.status}
        </span>

        <select
          value={task.status}
          onChange={(e) => onStatusChange(task.id, e.target.value)}
          className="status-select"
        >
          {STATUS_OPTIONS.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
