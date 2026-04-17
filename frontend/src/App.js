import { useState } from "react";
import ProjectPanel from "./components/ProjectPanel";
import TaskPanel from "./components/TaskPanel";
import { useProjects } from "./hooks/useProjects";
import { useTasks } from "./hooks/useTasks";
import "./App.css";

export default function App() {
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [statusFilter, setStatusFilter] = useState("all");

  // Project state via custom hook
  const {
    projects,
    loading: projectsLoading,
    error: projectsError,
    addProject,
  } = useProjects();

  // Task state via custom hook — re-fetches when project or filter changes
  const {
    tasks,
    loading: tasksLoading,
    error: tasksError,
    addTask,
    updateStatus,
    removeTask,
  } = useTasks(
    selectedProjectId,
    statusFilter === "all" ? undefined : statusFilter
  );

  const selectedProject = projects.find((p) => p.id === selectedProjectId);

  const handleSelectProject = (id) => {
    setSelectedProjectId(id);
    setStatusFilter("all"); // reset filter on project change
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>🗂️ Project & Task Manager</h1>
        <p>Organize your work across projects</p>
      </header>

      <main className="app-body">
        {/* Left: Projects */}
        <ProjectPanel
          projects={projects}
          selectedId={selectedProjectId}
          onSelect={handleSelectProject}
          onAdd={addProject}
          loading={projectsLoading}
          error={projectsError}
        />

        {/* Right: Tasks */}
        {selectedProject ? (
          <TaskPanel
            projectName={selectedProject.name}
            tasks={tasks}
            loading={tasksLoading}
            error={tasksError}
            onAdd={addTask}
            onStatusChange={updateStatus}
            onDelete={removeTask}
            statusFilter={statusFilter}
            onFilterChange={setStatusFilter}
          />
        ) : (
          <div className="panel empty-state">
            <div className="empty-icon">👈</div>
            <h3>Select a project to view tasks</h3>
            <p>Choose a project from the left panel, or create a new one.</p>
          </div>
        )}
      </main>
    </div>
  );
}
