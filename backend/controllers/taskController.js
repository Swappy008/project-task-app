const store = require("../services/store");

// POST /tasks
function createTask(req, res) {
  const { title, projectId } = req.body;

  // Validate title
  if (!title || typeof title !== "string" || title.trim() === "") {
    return res.status(400).json({ error: "Task title is required." });
  }

  // Validate projectId
  if (projectId === undefined || projectId === null) {
    return res.status(400).json({ error: "projectId is required." });
  }

  const pid = Number(projectId);
  if (isNaN(pid)) {
    return res.status(400).json({ error: "projectId must be a number." });
  }

  // Check project exists
  const project = store.getProjectById(pid);
  if (!project) {
    return res.status(404).json({ error: `Project with id ${pid} not found.` });
  }

  const task = store.createTask(title.trim(), pid);
  return res.status(201).json(task);
}

// GET /tasks?projectId=&status=
function getTasks(req, res) {
  const { projectId, status } = req.query;

  // Validate status if provided
  if (status !== undefined && !store.VALID_STATUSES.includes(status)) {
    return res.status(400).json({
      error: `Invalid status. Must be one of: ${store.VALID_STATUSES.join(", ")}`,
    });
  }

  // Parse projectId if provided
  let pid;
  if (projectId !== undefined) {
    pid = Number(projectId);
    if (isNaN(pid)) {
      return res.status(400).json({ error: "projectId must be a number." });
    }
  }

  const tasks = store.getAllTasks({ projectId: pid, status });
  return res.status(200).json(tasks);
}

// PATCH /tasks/:id
function updateTask(req, res) {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ error: "Task id must be a number." });
  }

  const { status } = req.body;

  // Validate status
  if (!status) {
    return res.status(400).json({ error: "status is required." });
  }

  if (!store.VALID_STATUSES.includes(status)) {
    return res.status(400).json({
      error: `Invalid status. Must be one of: ${store.VALID_STATUSES.join(", ")}`,
    });
  }

  const task = store.updateTaskStatus(id, status);
  if (!task) {
    return res.status(404).json({ error: `Task with id ${id} not found.` });
  }

  return res.status(200).json(task);
}

// DELETE /tasks/:id
function deleteTask(req, res) {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ error: "Task id must be a number." });
  }

  const deleted = store.deleteTask(id);
  if (!deleted) {
    return res.status(404).json({ error: `Task with id ${id} not found.` });
  }

  return res.status(200).json({ message: `Task ${id} deleted successfully.` });
}

module.exports = { createTask, getTasks, updateTask, deleteTask };
