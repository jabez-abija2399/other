import { Task, Priority, Status } from '../models/Task';
import db from '../db';
import { v4 as uuidv4 } from 'uuid';

interface CreateTaskPayload {
  title: string;
  description?: string;
  dueDate: string;
  priority?: Priority;
  status?: Status;
  listId: string;
}

interface UpdateTaskPayload {
  title?: string;
  description?: string;
  dueDate?: string;
  priority?: Priority;
  status?: Status;
  listId?: string;
}

export class TaskController {
  static createTask(payload: CreateTaskPayload): Task {
    if (!payload.title || !payload.dueDate || !payload.listId) {
      throw new Error('Title, due date, and list ID are required.');
    }
    if (!db.lists.has(payload.listId)) {
      throw new Error('List not found.');
    }

    const newTask: Task = {
      id: uuidv4(),
      title: payload.title,
      description: payload.description || '',
      dueDate: payload.dueDate,
      priority: payload.priority || Priority.Medium,
      status: payload.status || Status.Active,
      listId: payload.listId,
    };
    db.tasks.set(newTask.id, newTask);
    return newTask;
  }

  static getTasks(status?: Status, listId?: string): Task[] {
    let tasks = Array.from(db.tasks.values());

    if (status) {
      tasks = tasks.filter(task => task.status === status);
    }
    if (listId) {
      tasks = tasks.filter(task => task.listId === listId);
    }
    return tasks;
  }

  static getTaskById(taskId: string): Task | undefined {
    return db.tasks.get(taskId);
  }

  static updateTask(taskId: string, payload: UpdateTaskPayload): Task | undefined {
    const task = db.tasks.get(taskId);
    if (!task) {
      return undefined;
    }

    const updatedTask: Task = {
      ...task,
      ...payload,
      // Ensure listId exists if it's being updated
      listId: payload.listId && !db.lists.has(payload.listId) ? task.listId : payload.listId || task.listId
    };

    db.tasks.set(taskId, updatedTask);
    return updatedTask;
  }

  static deleteTask(taskId: string): boolean {
    return db.tasks.delete(taskId);
  }
}
