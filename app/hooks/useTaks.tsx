import { useContext } from "react";
import { TaskContext } from "../providers/TaskProvider";

export function useTask() {
  const context = useContext(TaskContext);

  if (!context) {
    throw new Error("useTasks debe usarse dentro de TaskProvider");
  }

  const { tasks, loadingTasks, updateTask, deleteTask, createTask } = context;

  return {
    tasks,
    loadingTasks,
    updateTask,
    deleteTask,
    createTask,
  };
}
