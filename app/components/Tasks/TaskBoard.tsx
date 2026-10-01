import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { TaskBoardProps } from "@/app/types";
import {
  TASK_STATUS_ICONS,
  TASK_STATUS_LABELS,
  TASK_STATUSES,
} from "@/app/constants";
import { TaskCard } from "./TaskCard";

export function TaskBoard({ tasks, openDrawer }: TaskBoardProps) {
  const visibleStatuses = TASK_STATUSES.filter(
    (status) => status !== "calendar",
  );
  const [openStatus, setOpenStatus] = useState<
    (typeof visibleStatuses)[number] | null
  >(visibleStatuses[0]);

  const toggleStatus = (status: (typeof visibleStatuses)[number]) => {
    if (status === "next_action" || status === "inbox") return;
    setOpenStatus((current) => (current === status ? null : status));
  };

  return (
    <>
      {visibleStatuses.map((status) => {
        const StatusIcon = TASK_STATUS_ICONS[status];
        const statusTasks =
          tasks?.filter((task) => task.status === status) ?? [];
        const alwaysOpen = status === "next_action" || status === "inbox";
        const isOpen = alwaysOpen || openStatus === status;

        return (
          <div key={status}>
            <button
              type="button"
              className="text-sm font-semibold uppercase tracking-wider my-6 cursor-pointer w-full"
              onClick={() => toggleStatus(status)}
            >
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold uppercase tracking-wider flex items-center gap-2">
                  <StatusIcon className="h-4 w-4" />
                  <span
                    className={
                      (status === "inbox" || status === "next_action") &&
                      statusTasks.length > 5
                        ? "text-red-400"
                        : ""
                    }
                  >
                    {TASK_STATUS_LABELS[status]} ({statusTasks.length})
                  </span>
                </p>

                {!alwaysOpen && (
                  <div className="text-neutral-300 hover:text-white">
                    {isOpen ? (
                      <ChevronUp className="h-6 w-6" />
                    ) : (
                      <ChevronDown className="h-6 w-6" />
                    )}
                  </div>
                )}
              </div>
            </button>

            {isOpen && (
              <div className="space-y-2 overflow-y-auto pr-1 flex-grow custom-scroll mt-4">
                {statusTasks.length === 0 && (
                  <div className="flex min-h-20 items-center justify-center rounded-lg border border-dashed border-neutral-700 mb-4">
                    <p className="text-center text-sm text-neutral-500 mb-4">
                      No tienes tareas activas en {TASK_STATUS_LABELS[status]}
                    </p>
                  </div>
                )}

                {statusTasks.map((task) => (
                  <div key={task.id}>
                    <TaskCard task={task} openDrawer={openDrawer} />
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </>
  );
}
