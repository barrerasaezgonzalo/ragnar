/* Dates */

import { Task } from "./types";
export function getDueDateInfo(date?: string) {
  if (!date) {
    return null;
  }

  const match = date.match(/^(\d{4})-(\d{2})-(\d{2})[T\s](\d{2}):(\d{2})/);

  if (!match) {
    return null;
  }

  const [, year, month, day, hours, minutes] = match;

  const time = `${hours}:${minutes}`;

  const dueDate = new Date(Number(year), Number(month) - 1, Number(day));

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const dueDay = new Date(dueDate);
  dueDay.setHours(0, 0, 0, 0);

  const diffTime = dueDay.getTime() - today.getTime();

  const remainingDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  const isOverdue = dueDay < today;

  let text: string;
  let className: string;

  const monthLabelShort = dueDate.toLocaleDateString("es-ES", {
    month: "short",
  });

  const weekday = dueDate.toLocaleDateString("es-ES", {
    weekday: "long",
  });

  if (isOverdue) {
    text = "Atrasada";
    className = "bg-red-500/20 text-red-300 border border-red-500/30";
  } else if (remainingDays === 0) {
    text = "Hoy";
    className = "bg-amber-500/20 text-amber-300 border border-amber-500/30";
  } else if (remainingDays === 1) {
    text = "Mañana";
    className = "bg-purple-500/20 text-purple-200 border border-purple-500/40";
  } else {
    text = `En ${remainingDays} días`;
    className = "bg-white/20 text-neutral-200 border border-white/15";
  }

  return {
    text,
    className,
    date: `${day}/${month}/${year}`,
    day,
    month,
    year,
    isOverdue,
    remainingDays,
    time,
    monthLabelShort,
    weekday,
  };
}

export const formatDateTimeLocal = (date?: string) => {
  if (!date) return "";

  return date.slice(0, 16);
};

export function getFormattedToday() {
  return new Date().toLocaleDateString("es-ES", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/* Calendar */

export function getTasksForMonth(tasks: Task[], currentDate: Date): Task[] {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  return tasks.filter((task) => {
    if (!task.dueDate) return false;

    const taskDate = new Date(task.dueDate);

    return taskDate.getFullYear() === year && taskDate.getMonth() === month;
  });
}
