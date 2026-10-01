import {
  CalendarDays,
  CalendarIcon,
  ChevronLeft,
  ChevronRight,
  ListIcon,
} from "lucide-react";
import type { Dispatch, SetStateAction } from "react";

type CalendarHeaderProps = {
  monthLabel: string;
  calendarViewMode: "month" | "list";
  setCalendarViewMode: Dispatch<SetStateAction<"month" | "list">>;
  previousMonth: () => void;
  nextMonth: () => void;
  goToday: () => void;
};

export function CalendarHeader({
  monthLabel,
  calendarViewMode,
  setCalendarViewMode,
  previousMonth,
  nextMonth,
  goToday,
}: CalendarHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-3 flex-shrink-0">
      <h2 className="text-sm font-semibold uppercase tracking-wider mb-2 flex items-center gap-2">
        <CalendarDays className="h-4 w-4" />
        {monthLabel}
      </h2>

      <div className="flex items-center gap-1.5">
        <div className="flex items-center bg-white/5 border border-white/15 rounded-sm p-0.5">
          <button
            type="button"
            onClick={() => setCalendarViewMode("month")}
            className={`p-1 rounded-sm cursor-pointer transition-colors ${
              calendarViewMode === "month"
                ? "bg-white/25 text-white shadow-sm"
                : "text-neutral-400 hover:text-white hover:bg-white/10"
            }`}
            title="Vista Mes"
          >
            <CalendarIcon size={13} />
          </button>

          <button
            type="button"
            onClick={() => setCalendarViewMode("list")}
            className={`p-1 rounded-sm cursor-pointer transition-colors ${
              calendarViewMode === "list"
                ? "bg-white/25 text-white shadow-sm"
                : "text-neutral-400 hover:text-white hover:bg-white/10"
            }`}
            title="Vista Lista"
          >
            <ListIcon size={13} />
          </button>
        </div>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={previousMonth}
            className="p-1.5 bg-white/5 hover:bg-white/15 border border-white/15 rounded-sm text-white cursor-pointer transition-colors flex items-center justify-center"
          >
            <ChevronLeft size={13} />
          </button>

          <button
            type="button"
            onClick={goToday}
            className="px-2.5 py-1.5 bg-white/5 hover:bg-white/15 border border-white/15 rounded-sm text-white text-xs font-medium cursor-pointer transition-colors flex items-center justify-center leading-none"
          >
            Hoy
          </button>

          <button
            type="button"
            onClick={nextMonth}
            className="p-1.5 bg-white/5 hover:bg-white/15 border border-white/15 rounded-sm text-white cursor-pointer transition-colors flex items-center justify-center"
          >
            <ChevronRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
