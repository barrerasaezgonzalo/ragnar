import {
  Rocket,
  Inbox,
  Clock,
  Calendar,
  CheckCircle,
  Archive,
} from "lucide-react";
import { Site, TaskContext, TaskStatus } from "./types";

/* UI */

export const SITES: Site[] = [
  {
    key: "rise",
    name: "Rise",
    description: "¡Bienvenido a tu viaje de bienestar!",
    url: "https://rise-inky-rho.vercel.app",
  },
  {
    key: "stash",
    name: "Stash",
    description: "Guarda antes de que se escape.",
    url: "",
  },
  {
    key: "talo",
    name: "Talo",
    description: "Aprende paso a paso.",
    url: "https://talo-plum.vercel.app",
  },
  {
    key: "refine",
    name: "Refine",
    description: "Convierte una idea en un mejor prompt.",
    url: "https://refine-steel.vercel.app",
  },
];

/* Tasks */

export const TASK_CONTEXTS = ["digital", "out", "home", "work"] as const;

export const TASK_CONTEXT_LABELS: Record<TaskContext, string> = {
  digital: "Digital",
  out: "Outside",
  home: "Home",
  work: "Work",
};

export const TASK_STATUSES = [
  "next_action",
  "inbox",
  "calendar",
  "waiting",
  "someday",
  "completed",
  "archived",
] as const;

export const TASK_STATUS_LABELS: Record<TaskStatus, string> = {
  next_action: "Next actions",
  inbox: "Inbox",
  calendar: "Calendar",
  waiting: "Waiting",
  someday: "Someday",
  completed: "Completed",
  archived: "Archived",
};

export const TASK_STATUS_ICONS: Record<
  TaskStatus,
  React.ComponentType<{ className?: string }>
> = {
  next_action: Rocket,
  inbox: Inbox,
  calendar: Calendar,
  waiting: Clock,
  someday: Calendar,
  completed: CheckCircle,
  archived: Archive,
};

/* Calendar */

export const WEEK_DAYS = ["Lu", "Ma", "Mi", "Ju", "Vi", "Sá", "Do"];
