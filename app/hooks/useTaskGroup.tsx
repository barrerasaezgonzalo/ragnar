import { useState } from "react";
import { TaskContext } from "../types";
import { useTask } from "./useTaks";

export function useTaskGroup(searchQuery: string) {
  const { tasks } = useTask();

  const [contextFilter, setContextFilter] = useState<TaskContext | "all">(
    "all",
  );

  const filteredTasks = tasks.filter((task) => {
    const matchesContext =
      contextFilter === "all" || task.context === contextFilter;

    const matchesSearch = task.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    return matchesContext && matchesSearch;
  });

  const doneTask = filteredTasks.filter((task) => task.status === "completed");

  return {
    contextFilter,
    setContextFilter,
    filteredTasks,
    doneTask,
  };
}
