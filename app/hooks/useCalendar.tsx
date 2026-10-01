import { useTask } from "@/app/hooks/useTaks";
import { useState } from "react";

export function useCalendar() {
  const { tasks } = useTask();

  const [currentDate, setCurrentDate] = useState(new Date());

  const previousMonth = () => {
    setCurrentDate((current) => {
      const date = new Date(current);
      date.setMonth(date.getMonth() - 1);
      return date;
    });
  };

  const nextMonth = () => {
    setCurrentDate((current) => {
      const date = new Date(current);
      date.setMonth(date.getMonth() + 1);
      return date;
    });
  };

  const goToday = () => {
    setCurrentDate(new Date());
  };

  const monthLabel = currentDate.toLocaleDateString("es-ES", {
    month: "long",
    year: "numeric",
  });

  return {
    tasks,
    currentDate,
    monthLabel,
    previousMonth,
    nextMonth,
    goToday,
  };
}
