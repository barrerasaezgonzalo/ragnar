import { ChevronDown } from "lucide-react";
import { TaskContext, TaskGroupProps } from "@/app/types";
import { TASK_CONTEXT_LABELS, TASK_CONTEXTS } from "@/app/constants";
import { TaskBoard } from "./TaskBoard";
import { Capture } from "./Capture";
import { useTaskGroup } from "@/app/hooks/useTaskGroup";

export function TaskGroup({ openDrawer, searchQuery }: TaskGroupProps) {
  const { contextFilter, setContextFilter, filteredTasks, doneTask } =
    useTaskGroup(searchQuery);

  return (
    <div className="lg:col-span-2 bg-black/40 backdrop-blur-md border border-white/20 rounded-sm px-4 flex flex-col pb-4">
      <div className="flex items-center justify-between gap-4 flex-shrink-0">
        <div className="flex items-center gap-4">
          <span className="text-sm text-neutral-400">
            {doneTask.length} / {filteredTasks.length} Completadas
          </span>

          <div className="relative">
            <select
              value={contextFilter}
              onChange={(event) =>
                setContextFilter(event.target.value as TaskContext | "all")
              }
              className="mx-auto py-2 appearance-none rounded-sm bg-black/40 border border-white/40 px-3 pr-8 text-xs text-white/60 outline-none cursor-pointer"
            >
              <option value="all">Todos los contextos</option>

              {TASK_CONTEXTS.map((context) => (
                <option key={context} value={context} className="bg-[#3c2f22]">
                  #{TASK_CONTEXT_LABELS[context]}
                </option>
              ))}
            </select>

            <ChevronDown
              size={14}
              className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-neutral-400"
            />
          </div>
        </div>

        <Capture openDrawer={openDrawer} />
      </div>

      <div className="space-y-4 overflow-y-auto pr-1 flex-grow">
        <TaskBoard tasks={filteredTasks} openDrawer={openDrawer} />
      </div>
    </div>
  );
}
