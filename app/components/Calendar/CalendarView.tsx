import { useState } from "react";
import { CalendarMonth } from "./CalendarMonth";
import { CalendarList } from "./CalendarList";
import { useTask } from "@/app/hooks/useTaks";
import { CalendarViewProps } from "@/app/types";
import { CalendarHeader } from "./CalendarHeader";

export function CalendarView({
  openDrawer,
  currentDate,
  monthLabel,
  previousMonth,
  nextMonth,
  goToday,
  searchQuery,
}: CalendarViewProps) {
  const [calendarViewMode, setCalendarViewMode] = useState<"month" | "list">(
    "list",
  );

  const { tasks } = useTask();

  const calendarTasks = tasks
    ?.filter((task) => task.status === "calendar")
    .filter((task) =>
      task.title.toLowerCase().includes(searchQuery.toLowerCase()),
    );

  return (
    <>
      <CalendarHeader
        monthLabel={monthLabel}
        calendarViewMode={calendarViewMode}
        setCalendarViewMode={setCalendarViewMode}
        previousMonth={previousMonth}
        nextMonth={nextMonth}
        goToday={goToday}
      />

      <div className="overflow-y-auto pr-1 flex-grow custom-scroll mt-4">
        {calendarViewMode === "month" ? (
          <CalendarMonth
            tasks={calendarTasks}
            currentDate={currentDate}
            onChangeView={setCalendarViewMode}
          />
        ) : (
          <CalendarList
            openDrawer={openDrawer}
            tasks={calendarTasks}
            currentDate={currentDate}
          />
        )}
      </div>
    </>
  );
}
