"use client";

import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from "react";

import { supabase } from "@/app/lib/supabaseClient";
import { Task } from "@/app/types";

type TaskContextType = {
  tasks: Task[];
  loadingTasks: boolean;
  loadTasks: () => Promise<void>;
  updateTask: (task: Task) => Promise<void>;
  deleteTask: (taskId: string) => Promise<void>;
  createTask: (task: Task) => Promise<void>;
};

export const TaskContext = createContext<TaskContextType | null>(null);

type TaskProviderProps = {
  children: ReactNode;
};

export function TaskProvider({ children }: TaskProviderProps) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loadingTasks, setLoadingTasks] = useState(true);

  const loadTasks = useCallback(async () => {
    try {
      setLoadingTasks(true);

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setTasks([]);
        return;
      }

      const { data, error } = await supabase
        .from("rg_tasks")
        .select("*")
        .eq("user_id", user.id)
        .order("featured", { ascending: false })
        .order("due_date", { ascending: true });

      if (error) {
        console.error("Error al cargar las tareas", error);
        return;
      }

      const normalizedTasks: Task[] = (data ?? []).map((task) => ({
        ...task,
        createdAt: task.created_at,
        dueDate: task.due_date,
        subtasks: [...(task.subtasks ?? [])].map((subtask) => ({
          id: subtask.id,
          title: subtask.title,
          status: subtask.status,
        })),
      }));

      setTasks(normalizedTasks);
    } finally {
      setLoadingTasks(false);
    }
  }, []);

  const updateTask = async (task: Task) => {
    if (!task.id) {
      throw new Error("La tarea no tiene ID");
    }

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      throw new Error("Usuario no autenticado");
    }

    const { data, error } = await supabase
      .from("rg_tasks")
      .update({
        title: task.title,
        description: task.description ?? null,
        status: task.status,
        context: task.context ?? null,
        due_date: task.dueDate ?? null,
        featured: task.featured ?? false,
        subtasks: task.subtasks ?? [],
        updated_at: new Date().toISOString(),
      })
      .eq("id", task.id)
      .eq("user_id", user.id)
      .select()
      .single();

    if (error) {
      console.error("Error al actualizar la tarea", error);
      throw error;
    }

    const updatedTask: Task = {
      ...data,
      createdAt: data.created_at,
      dueDate: data.due_date,
      subtasks: [...(data.subtasks ?? [])].map((subtask) => ({
        id: subtask.id,
        title: subtask.title,
        status: subtask.status,
      })),
    };

    setTasks((currentTasks) =>
      currentTasks.map((currentTask) =>
        currentTask.id === updatedTask.id ? updatedTask : currentTask,
      ),
    );
  };

  const deleteTask = async (taskId: string) => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      throw new Error("Usuario no autenticado");
    }

    const { error } = await supabase
      .from("rg_tasks")
      .delete()
      .eq("id", taskId)
      .eq("user_id", user.id);

    if (error) {
      console.error("Error al eliminar la tarea", error);
      throw error;
    }

    setTasks((currentTasks) =>
      currentTasks.filter((task) => task.id !== taskId),
    );
  };

  const createTask = async (task: Task) => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      throw new Error("Usuario no autenticado");
    }

    const { data, error } = await supabase
      .from("rg_tasks")
      .insert({
        user_id: user.id,
        title: task.title,
        description: task.description ?? null,
        status: task.status ?? "inbox",
        context: task.context ?? null,
        due_date: task.dueDate ?? null,
        featured: task.featured ?? false,
        subtasks: task.subtasks ?? [],
      })
      .select()
      .single();

    if (error) {
      console.error("Error al crear la tarea", error);
      throw error;
    }

    const newTask: Task = {
      ...data,
      createdAt: data.created_at,
      dueDate: data.due_date,
      subtasks: [...(data.subtasks ?? [])].map((subtask) => ({
        id: subtask.id,
        title: subtask.title,
        status: subtask.status,
      })),
    };

    setTasks((currentTasks) => [...currentTasks, newTask]);
  };

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  return (
    <TaskContext.Provider
      value={{
        tasks,
        loadingTasks,
        loadTasks,
        updateTask,
        deleteTask,
        createTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}
