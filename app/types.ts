/* UI */

export type Site = {
  key: string;
  name: string;
  description: string;
  url: string;
};

export type HeaderProps = {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
};

export type SearchProps = {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
};

export type DrawerData =
  { type: "task"; data: Task } | { type: null; data: null };

/* Tasks */

export type TaskContext = "digital" | "out" | "home" | "work";
export type TaskStatus =
  | "inbox"
  | "calendar"
  | "next_action"
  | "waiting"
  | "someday"
  | "completed"
  | "archived";
type SubTaskStatus = "pending" | "completed";

export type Task = {
  id?: string;
  userId?: string;
  title: string;
  description?: string | undefined;
  status?: TaskStatus;
  context?: TaskContext;
  dueDate?: string;
  createdAt?: string;
  updatedAt?: string;
  featured?: boolean;
  subtasks?: SubTask[] | undefined;
};

export type SubTask = {
  id: string;
  title: string;
  status: SubTaskStatus;
};

export type TaskGroupProps = {
  openDrawer: (type: string, data?: DrawerData) => void;
  searchQuery: string;
};

export type TaskDrawerProps = {
  task: Task;
  onClose: () => void;
};

export type TaskBoardProps = {
  tasks: Task[];
  openDrawer: (type: string, data?: DrawerData) => void;
};

export type TaskCardProps = {
  task: Task;
  openDrawer: (type: string, data?: DrawerData) => void;
};

/* Calendar */

export type CalendarGroupProps = {
  openDrawer: (type: string, data?: DrawerData) => void;
  searchQuery: string;
};

export type CalendarViewProps = {
  openDrawer: (type: string, data?: DrawerData) => void;
  currentDate: Date;
  monthLabel: string;
  previousMonth: () => void;
  nextMonth: () => void;
  goToday: () => void;
  searchQuery: string;
};

export type CalendarListProps = {
  openDrawer: (type: string, data?: DrawerData) => void;
  tasks: Task[];
  currentDate: Date;
};

export type CalendarMonthProps = {
  tasks: Task[];
  currentDate: Date;
  onChangeView: (view: "list" | "month") => void;
};

export type CaptureProps = {
  openDrawer: (type: string, data?: DrawerData) => void;
};
