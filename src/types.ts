export enum Priority {
  Low = 'Low',
  Medium = 'Medium',
  High = 'High',
}

export enum Status {
  Active = 'Active',
  Completed = 'Completed',
  Pending = 'Pending',
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  dueDate: string;
  priority: Priority;
  status: Status;
  listId: string;
}

export interface List {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  taskCount?: number; // For sidebar display
}

export interface DashboardOverview {
  tasksToday: Task[];
  tasksOverdue: Task[];
  tasksUpcoming: Task[];
}

export interface TaskFormValues {
  title: string;
  description?: string;
  dueDate: string;
  priority: Priority;
  status: Status;
  listId: string;
}
