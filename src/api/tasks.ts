import { Request, Response } from 'express';
import { TaskController } from '../controllers/TaskController';
import { Status, Priority } from '../models/Task';

export class TaskApi {
  static async createTask(req: Request, res: Response): Promise<void> {
    try {
      const { title, description, dueDate, priority, status, listId } = req.body;
      const newTask = TaskController.createTask({
        title,
        description,
        dueDate,
        priority: priority as Priority,
        status: status as Status,
        listId,
      });
      res.status(201).json(newTask);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  static async getTasks(req: Request, res: Response): Promise<void> {
    try {
      const { status, listId } = req.query;
      const tasks = TaskController.getTasks(status as Status, listId as string);
      res.status(200).json(tasks);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  static async getTaskById(req: Request, res: Response): Promise<void> {
    try {
      const { taskId } = req.params;
      const task = TaskController.getTaskById(taskId);
      if (task) {
        res.status(200).json(task);
      } else {
        res.status(404).json({ message: 'Task not found' });
      }
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  static async updateTask(req: Request, res: Response): Promise<void> {
    try {
      const { taskId } = req.params;
      const { title, description, dueDate, priority, status, listId } = req.body;
      const updatedTask = TaskController.updateTask(taskId, {
        title,
        description,
        dueDate,
        priority: priority as Priority,
        status: status as Status,
        listId,
      });
      if (updatedTask) {
        res.status(200).json(updatedTask);
      } else {
        res.status(404).json({ message: 'Task not found' });
      }
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  static async deleteTask(req: Request, res: Response): Promise<void> {
    try {
      const { taskId } = req.params;
      const deleted = TaskController.deleteTask(taskId);
      if (deleted) {
        res.status(204).send(); // No Content
      } else {
        res.status(404).json({ message: 'Task not found' });
      }
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
}
