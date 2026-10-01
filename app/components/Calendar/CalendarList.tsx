import { getDueDateInfo, getTasksForMonth } from "@/app/utils";
import { Star } from "lucide-react";
import { CalendarListProps } from "@/app/types";

export function CalendarList({
  openDrawer,
  tasks,
  currentDate,
}: CalendarListProps) {
  const monthTasks = getTasksForMonth(tasks, currentDate);
  if (monthTasks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <p className="text-sm font-medium text-white">No events</p>

        <p className="mt-1 text-sm text-neutral-400">
          There are no events scheduled for this month.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-2.5">
      {monthTasks.map((task) => {
        const dueDate = getDueDateInfo(task.dueDate);

        const handleClick = () => {
          openDrawer("tasks", {
            type: "task",
            data: task,
          });
        };

        return (
          <div
            key={task.id}
            onClick={handleClick}
            className="mr-1 flex cursor-pointer items-start gap-3 rounded-sm border border-white/10 bg-white/5 p-2 transition-all hover:border-white/25 hover:bg-white/10"
          >
            <div
              className={`
                flex min-w-[36px] flex-col items-center justify-center
                rounded px-2 py-1
                ${dueDate?.className}
              `}
            >
              <span className="text-base uppercase">
                {dueDate?.monthLabelShort}
              </span>

              <span className="text-base font-bold">{dueDate?.day}</span>
            </div>

            <div>
              <p className="flex items-center gap-2 text-sm font-medium text-white">
                {task.featured && (
                  <Star size={12} className="fill-amber-400 text-amber-400" />
                )}

                {task.title}
              </p>

              <p className="text-sm text-neutral-300 capitalize">
                {dueDate?.weekday} {dueDate?.time}
              </p>

              <p className="text-xs text-neutral-400">{dueDate?.text}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
