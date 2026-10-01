import { useState } from "react";
import { SubTask, Task } from "../types";
import { useTask } from "./useTaks";

export function useTaskDrawer(task: Task, onClose: () => void) {
  const [draft, setDraft] = useState<Task>({
    ...task,
    subtasks: [...(task.subtasks ?? [])],
  });

  const [newSubtask, setNewSubtask] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const { createTask, updateTask, deleteTask } = useTask();

  const isNewTask = !task.id;

  const updateField = <K extends keyof Task>(field: K, value: Task[K]) => {
    setDraft((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const addSubtask = () => {
    const title = newSubtask.trim();

    if (!title) return;

    const subtask: SubTask = {
      id: crypto.randomUUID(),
      title,
      status: "pending",
    };

    setDraft((prev) => ({
      ...prev,
      subtasks: [...(prev.subtasks ?? []), subtask],
    }));

    setNewSubtask("");
  };

  const toggleSubtask = (subtaskId: string) => {
    setDraft((prev) => ({
      ...prev,
      subtasks: prev.subtasks?.map((subtask) =>
        subtask.id === subtaskId
          ? {
              ...subtask,
              status: subtask.status === "completed" ? "pending" : "completed",
            }
          : subtask,
      ),
    }));
  };

  const deleteSubtask = (subtaskId: string) => {
    setDraft((prev) => ({
      ...prev,
      subtasks: prev.subtasks?.filter((subtask) => subtask.id !== subtaskId),
    }));
  };

  const completedSubtasks =
    draft.subtasks?.filter((subtask) => subtask.status === "completed")
      .length ?? 0;

  const handleSave = async () => {
    try {
      setIsSaving(true);

      if (isNewTask) {
        await createTask(draft);
      } else {
        await updateTask(draft);
      }

      onClose();
    } catch (error) {
      console.error("Error al guardar la tarea:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!draft.id) return;

    try {
      setIsDeleting(true);

      await deleteTask(draft.id);

      onClose();
    } catch (error) {
      console.error("Error al eliminar la tarea:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return {
    draft,
    setDraft,
    newSubtask,
    setNewSubtask,
    updateField,
    addSubtask,
    toggleSubtask,
    deleteSubtask,
    completedSubtasks,
    isSaving,
    isDeleting,
    handleSave,
    handleDelete,
  };
}
