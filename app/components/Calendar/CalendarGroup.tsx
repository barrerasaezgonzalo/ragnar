import { useCalendar } from "@/app/hooks/useCalendar";
import { CalendarView } from "./CalendarView";
import { CalendarGroupProps } from "@/app/types";

export function CalendarGroup({ openDrawer, searchQuery }: CalendarGroupProps) {
  const { currentDate, monthLabel, previousMonth, nextMonth, goToday } =
    useCalendar();

  return (
    <div className="bg-black/40 backdrop-blur-md border border-white/20 rounded-sm px-4 py-2 flex flex-col  pt-4">
      <CalendarView
        openDrawer={openDrawer}
        currentDate={currentDate}
        monthLabel={monthLabel}
        previousMonth={previousMonth}
        nextMonth={nextMonth}
        goToday={goToday}
        searchQuery={searchQuery}
      />
    </div>
  );
}
