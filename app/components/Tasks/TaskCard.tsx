import { TASK_CONTEXT_LABELS } from "@/app/constants";
import { TaskCardProps } from "@/app/types";
import { getDueDateInfo } from "@/app/utils";
import { Ban, ChevronDown, Circle, CircleCheck, Star } from "lucide-react";

export function TaskCard({ task, openDrawer }: TaskCardProps) {
  const Icon =
    task.status === "completed"
      ? CircleCheck
      : task.status === "next_action"
        ? Circle
        : Ban;
  const completedSubtasks =
    task.subtasks?.filter((sub) => sub.status === "completed").length ?? 0;
  const dueDate = getDueDateInfo(task.dueDate);

  return (
    <div
      key={task.id}
      onClick={() => openDrawer("task", { type: "task", data: task })}
      className="p-2.5 bg-white/5 border border-white/10 rounded-sm hover:border-white/30 hover:bg-white/10 transition-all flex flex-col gap-2 cursor-pointer group"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <Icon
            size={16}
            className={`${
              task.status === "completed"
                ? "text-green-500/50 hover:text-green-500"
                : "text-white/60 hover:text-white"
            } cursor-pointer flex-shrink-0`}
          />
          <div className="flex items-center gap-1.5">
            {task.featured && (
              <Star size={12} className="text-amber-400 fill-amber-400" />
            )}
            <div className="text-white text-sm font-medium">{task.title}</div>
            {task.subtasks && task.subtasks.length > 0 && (
              <div className="text-xs ml-2">
                {completedSubtasks} / {task.subtasks.length} subtareas
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          {dueDate && (
            <div
              className={`text-xs px-2 py-0.5 text-neutral-400 rounded border border-neutral-400 capitalize ${dueDate?.className} `}
            >
              {dueDate.text}
            </div>
          )}
          {task.context && (
            <span className="text-xs px-2 py-0.5 text-neutral-400 rounded border border-neutral-400 capitalize">
              # {TASK_CONTEXT_LABELS[task.context]}
            </span>
          )}
        </div>
      </div>

      {task.subtasks && task.subtasks.length > 0 && (
        <div className="pl-6 space-y-1 border-l border-white/10 ml-2 my-1">
          {task.subtasks.slice(0, 3).map((sub) => (
            <div key={sub.id} className="flex items-center gap-2">
              <input
                type="checkbox"
                readOnly
                checked={sub.status === "completed"}
                className="w-3 h-3 accent-green-500 cursor-pointer rounded-sm  opacity-50 cursor-not-allowed pointer-events-none"
              />

              <span
                className={`text-xs ${
                  sub.status === "completed"
                    ? "line-through text-neutral-500"
                    : "text-neutral-300"
                }`}
              >
                {sub.title}
              </span>
            </div>
          ))}
          {task.subtasks.length > 3 && (
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                openDrawer("task", { type: "task", data: task });
              }}
              className="flex items-center gap-1 text-xs text-neutral-400 hover:text-neutral-300 transition-colors cursor-pointer"
              title="Ver todas las subtareas"
            >
              <ChevronDown size={12} />
              <span>Ver {task.subtasks.length - 3} más</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
}
