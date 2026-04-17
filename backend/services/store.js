// In-memory storage - acts like a simple database
// Data lives here while the server is running

let projects = [];
let tasks = [];
let projectIdCounter = 1;
let taskIdCounter = 1;

// --- Project helpers ---

function getAllProjects() {
  return projects;
}

function getProjectById(id) {
  return projects.find((p) => p.id === id);
}

function createProject(name) {
  const project = { id: projectIdCounter++, name };
  projects.push(project);
  return project;
}

// --- Task helpers ---

const VALID_STATUSES = ["todo", "in-progress", "done"];

function getAllTasks({ projectId, status } = {}) {
  let result = [...tasks];

  if (projectId !== undefined) {
    result = result.filter((t) => t.projectId === projectId);
  }

  if (status !== undefined) {
    result = result.filter((t) => t.status === status);
  }

  return result;
}

function getTaskById(id) {
  return tasks.find((t) => t.id === id);
}

function createTask(title, projectId) {
  const task = {
    id: taskIdCounter++,
    title,
    status: "todo",
    projectId,
  };
  tasks.push(task);
  return task;
}

function updateTaskStatus(id, status) {
  const task = tasks.find((t) => t.id === id);
  if (!task) return null;
  task.status = status;
  return task;
}

function deleteTask(id) {
  const index = tasks.findIndex((t) => t.id === id);
  if (index === -1) return false;
  tasks.splice(index, 1);
  return true;
}

module.exports = {
  VALID_STATUSES,
  getAllProjects,
  getProjectById,
  createProject,
  getAllTasks,
  getTaskById,
  createTask,
  updateTaskStatus,
  deleteTask,
};
