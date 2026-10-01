import { getDueDateInfo, getTasksForMonth } from "@/app/utils";
import { WEEK_DAYS } from "@/app/constants";
import { CalendarMonthProps } from "@/app/types";

export function CalendarMonth({
  tasks,
  currentDate,
  onChangeView,
}: CalendarMonthProps) {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDay = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const startingDay = (firstDay.getDay() + 6) % 7;
  const days = Array.from({ length: startingDay + daysInMonth }, (_, index) =>
    index < startingDay ? null : index - startingDay + 1,
  );
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
    <div className="grid grid-cols-7 gap-1 text-center text-sm text-neutral-300">
      {WEEK_DAYS.map((day) => (
        <span
          key={day}
          className="h-8 border border-white/10 py-1 font-semibold text-neutral-400"
        >
          {day}
        </span>
      ))}

      {days.map((day, index) => {
        if (day === null) {
          return <div key={`empty-${index}`} className="h-12 p-2" />;
        }

        const dayTasks = monthTasks.filter((task) => {
          const taskDate = new Date(task.dueDate!);
          return taskDate.getDate() === day;
        });
        const hasTasks = dayTasks.length > 0;
        const dueDate = hasTasks ? getDueDateInfo(dayTasks[0].dueDate) : null;
        const handleDayClick = () => {
          if (!hasTasks) return;
          onChangeView("list");
        };

        return (
          <div
            key={day}
            onClick={handleDayClick}
            className={`
              flex h-12 flex-col items-center justify-center
              rounded border p-2 transition-all
              ${
                hasTasks
                  ? "cursor-pointer font-bold hover:brightness-110"
                  : "cursor-default"
              }
              ${
                dueDate?.className ??
                "border-white/5 bg-white/5 text-neutral-300"
              }
            `}
          >
            <span>{day}</span>
            {hasTasks && (
              <span
                onClick={(event) => {
                  event.stopPropagation();
                  onChangeView("list");
                }}
                className="cursor-pointer text-[10px] text-purple-300/70 hover:text-purple-200"
              >
                {dayTasks.length === 1
                  ? "1 evento"
                  : `${dayTasks.length} eventos`}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}
