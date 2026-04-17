import { useState, useEffect, useCallback } from "react";
import {
  fetchTasks,
  createTask as apiCreateTask,
  updateTaskStatus as apiUpdateStatus,
  deleteTask as apiDeleteTask,
} from "../api/api";

// Custom hook: manages all task state and logic for a given project + filter

export function useTasks(projectId, statusFilter) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadTasks = useCallback(async () => {
    if (projectId === null || projectId === undefined) {
      setTasks([]);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const data = await fetchTasks({
        projectId,
        status: statusFilter || undefined,
      });
      setTasks(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [projectId, statusFilter]);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  const addTask = async (title) => {
    setError(null);
    try {
      const newTask = await apiCreateTask(title, projectId);
      setTasks((prev) => [...prev, newTask]);
      return newTask;
    } catch (err) {
      setError(err.message);
      return null;
    }
  };

  const updateStatus = async (id, status) => {
    setError(null);
    try {
      const updated = await apiUpdateStatus(id, status);
      setTasks((prev) => prev.map((t) => (t.id === id ? updated : t)));
    } catch (err) {
      setError(err.message);
    }
  };

  const removeTask = async (id) => {
    setError(null);
    try {
      await apiDeleteTask(id);
      setTasks((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  return { tasks, loading, error, addTask, updateStatus, removeTask };
}
