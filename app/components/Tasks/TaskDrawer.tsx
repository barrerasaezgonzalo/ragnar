import {
  CalendarDays,
  Check,
  ChevronDown,
  Circle,
  Plus,
  Trash2,
} from "lucide-react";
import { useState } from "react";
import { formatDateTimeLocal } from "@/app/utils";
import {
  TASK_CONTEXT_LABELS,
  TASK_CONTEXTS,
  TASK_STATUS_LABELS,
  TASK_STATUSES,
} from "@/app/constants";
import { Task, TaskDrawerProps } from "@/app/types";
import { useTaskDrawer } from "@/app/hooks/useTaskDrawer";
import { Modal } from "../UI/Modal";

export function TaskDrawer({ task, onClose }: TaskDrawerProps) {
  const {
    draft,
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
  } = useTaskDrawer(task, onClose);

  const [modalOpen, setModalOpen] = useState(false);
  const isNewTask = !task.id;

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm transition-opacity duration-300"
      onClick={onClose}
    >
      <div
        className="flex h-full w-full max-w-2xl flex-col overflow-y-auto border-l border-white/20 bg-neutral-700/80 px-4 py-4 shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex flex-grow flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-neutral-300">
              Title
            </label>

            <input
              type="text"
              value={draft.title ?? ""}
              onChange={(event) => updateField("title", event.target.value)}
              placeholder="Ej. Revisar entregas..."
              className="rounded-sm border border-white/20 bg-black/40 px-3 py-2 text-sm text-white placeholder-white/40 focus:border-white/50 focus:outline-none"
            />
          </div>

          <div className="relative flex flex-col gap-1.5 pt-2">
            <label className="text-sm font-medium text-neutral-300">
              Description
            </label>

            <textarea
              value={draft.description ?? ""}
              onChange={(event) =>
                updateField("description", event.target.value)
              }
              placeholder="Escribe el detalle de tu nota..."
              className="h-40 w-full resize-none rounded-sm border border-white/20 bg-black/40 px-2 text-sm text-white placeholder-white/40 focus:border-white/50 focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-2">
            <div className="flex w-full flex-col gap-1.5">
              <label className="text-sm font-medium text-neutral-300">
                Status
              </label>

              <div className="relative">
                <select
                  value={draft.status}
                  onChange={(event) =>
                    updateField("status", event.target.value as Task["status"])
                  }
                  className="h-12 w-full appearance-none rounded-sm border border-white/20 bg-black/40 px-3 py-2 text-sm text-white outline-none"
                >
                  {TASK_STATUSES.map((status) => (
                    <option
                      key={status}
                      value={status}
                      className="bg-neutral-900"
                    >
                      {TASK_STATUS_LABELS[status]}
                    </option>
                  ))}
                </select>

                <ChevronDown
                  size={18}
                  className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 text-neutral-300"
                />
              </div>
            </div>

            <div className="flex w-full flex-col gap-1.5">
              <label className="text-sm font-medium text-neutral-300">
                Context
              </label>

              <div className="relative">
                <select
                  value={draft.context}
                  onChange={(event) =>
                    updateField(
                      "context",
                      event.target.value as Task["context"],
                    )
                  }
                  className="h-12 w-full appearance-none rounded-sm border border-white/20 bg-black/40 px-3 py-2 text-sm text-white outline-none"
                >
                  {TASK_CONTEXTS.map((context) => (
                    <option
                      key={context}
                      value={context}
                      className="bg-neutral-900"
                    >
                      {TASK_CONTEXT_LABELS[context]}
                    </option>
                  ))}
                </select>

                <ChevronDown
                  size={18}
                  className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 text-neutral-300"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex w-full flex-col gap-1.5">
              <label className="block">
                <span className="mb-2 block text-sm font-medium text-neutral-200">
                  Due Date
                </span>

                <div className="relative">
                  <CalendarDays
                    size={16}
                    className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500"
                  />

                  <input
                    type="datetime-local"
                    value={formatDateTimeLocal(draft.dueDate)}
                    onChange={(event) =>
                      updateField("dueDate", event.target.value || undefined)
                    }
                    className="h-12 w-full rounded border border-white/20 bg-black/40 pl-8 pr-3 text-sm text-white outline-none transition [color-scheme:dark]"
                  />
                </div>
              </label>
            </div>

            <div className="flex w-full flex-col gap-1.5">
              <section>
                <span className="mb-2 block text-sm font-medium text-white">
                  Important
                </span>

                <button
                  type="button"
                  onClick={() => updateField("featured", !draft.featured)}
                  className="flex h-12 w-full cursor-pointer items-center justify-between rounded border border-white/20 bg-black/40 px-3 transition hover:border-white/30"
                >
                  <span className="flex items-center gap-2 text-sm text-white">
                    <span
                      className={`h-2.5 w-2.5 rounded-full ${
                        draft.featured ? "bg-orange-400" : "bg-neutral-600"
                      }`}
                    />

                    {draft.featured ? "Important" : "Not Important"}
                  </span>

                  <span
                    className={`relative h-6 w-11 shrink-0 rounded-full transition ${
                      draft.featured ? "bg-orange-500" : "bg-neutral-600"
                    }`}
                  >
                    <span
                      className={`absolute top-1 h-4 w-4 rounded-full bg-white transition-all ${
                        draft.featured ? "left-6" : "left-1"
                      }`}
                    />
                  </span>
                </button>
              </section>
            </div>
          </div>

          <div className="flex w-full flex-col gap-1.5">
            <h3 className="mb-2 flex items-center gap-2 text-sm font-medium text-white">
              Subtasks
              <span className="mt-1 text-xs text-neutral-500">
                {completedSubtasks} of {draft.subtasks?.length ?? 0} completed
              </span>
            </h3>

            <div className="overflow-hidden rounded">
              <div className="mb-2 flex gap-2">
                <button
                  type="button"
                  onClick={addSubtask}
                  disabled={!newSubtask.trim()}
                  className="flex h-10 w-10 cursor-pointer items-center justify-center rounded border border-white/20 bg-black/40 text-neutral-300 transition hover:border-white/40 hover:text-neutral-200 disabled:cursor-not-allowed disabled:opacity-30"
                >
                  <Plus size={17} />
                </button>

                <input
                  type="text"
                  value={newSubtask}
                  onChange={(event) => setNewSubtask(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      event.preventDefault();
                      addSubtask();
                    }
                  }}
                  placeholder="New subtask..."
                  className="h-10 flex-1 rounded border border-white/20 bg-black/40 px-3 text-sm text-neutral-300 outline-none placeholder:text-neutral-400 focus:border-white/40"
                />
              </div>

              {draft.subtasks?.map((subtask) => (
                <div
                  key={subtask.id}
                  className="flex min-h-11 items-center gap-3 border-b border-white/10 bg-black/40 px-4 last:border-b-0"
                >
                  <button
                    type="button"
                    onClick={() => toggleSubtask(subtask.id)}
                    className="cursor-pointer text-neutral-500 transition hover:text-neutral-200"
                  >
                    {subtask.status === "completed" ? (
                      <span className="flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500 text-neutral-950">
                        <Check size={11} strokeWidth={3} />
                      </span>
                    ) : (
                      <Circle size={16} />
                    )}
                  </button>

                  <span
                    className={`flex-1 text-sm ${
                      subtask.status === "completed"
                        ? "text-neutral-500 line-through"
                        : "text-neutral-300"
                    }`}
                  >
                    {subtask.title}
                  </span>

                  <button
                    type="button"
                    onClick={() => deleteSubtask(subtask.id)}
                    className="cursor-pointer text-neutral-600 transition hover:text-red-400"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-4">
          {!isNewTask && (
            <button
              type="button"
              onClick={() => setModalOpen(true)}
              disabled={isDeleting || isSaving}
              className="cursor-pointer rounded-sm border border-red-900/60 bg-red-950/30 px-4 py-2 text-xs font-medium text-red-400 hover:bg-red-900/20 hover:text-red-200 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </button>
          )}

          <div className="ml-auto flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={isSaving || isDeleting}
              className="cursor-pointer rounded-sm border border-white/40 bg-neutral-800/40 px-4 py-2 text-xs font-medium hover:bg-neutral-800 hover:text-neutral-200 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handleSave}
              disabled={isSaving || isDeleting || !draft.title?.trim()}
              className="cursor-pointer rounded-sm border border-white/40 bg-orange-600/90 px-4 py-2 text-xs font-medium text-stone-200 hover:bg-orange-500 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSaving
                ? isNewTask
                  ? "Creating..."
                  : "Saving..."
                : isNewTask
                  ? "Create Task"
                  : "Save"}
            </button>
          </div>
        </div>
      </div>

      {!isNewTask && (
        <Modal
          modalOpen={modalOpen}
          modalClose={() => setModalOpen(false)}
          title="¿Eliminar tarea?"
          message="Esta acción eliminará la tarea permanentemente."
          onConfirm={handleDelete}
        />
      )}
    </div>
  );
}
