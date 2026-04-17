const store = require("../services/store");

// POST /projects
function createProject(req, res) {
  const { name } = req.body;

  // Validation
  if (!name || typeof name !== "string" || name.trim() === "") {
    return res.status(400).json({ error: "Project name is required." });
  }

  const project = store.createProject(name.trim());
  return res.status(201).json(project);
}

// GET /projects
function getProjects(req, res) {
  const projects = store.getAllProjects();
  return res.status(200).json(projects);
}

module.exports = { createProject, getProjects };
