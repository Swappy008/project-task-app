import { useState, useEffect, useCallback } from "react";
import { fetchProjects, createProject as apiCreateProject } from "../api/api";

// Custom hook: manages all project state and logic
// Components just call this hook — no need to know about fetch()

export function useProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadProjects = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchProjects();
      setProjects(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProjects();
  }, [loadProjects]);

  const addProject = async (name) => {
    setError(null);
    try {
      const newProject = await apiCreateProject(name);
      setProjects((prev) => [...prev, newProject]);
      return newProject;
    } catch (err) {
      setError(err.message);
      return null;
    }
  };

  return { projects, loading, error, addProject, reload: loadProjects };
}
