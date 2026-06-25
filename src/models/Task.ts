import { v4 as uuidv4 } from 'uuid';

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
