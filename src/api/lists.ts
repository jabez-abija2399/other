import { Request, Response } from 'express';
import { ListController } from '../controllers/ListController';
import db from '../db';

export class ListApi {
  static async createList(req: Request, res: Response): Promise<void> {
    try {
      const { name } = req.body;
      const newList = ListController.createList({ name });
      res.status(201).json(newList);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  static async getLists(req: Request, res: Response): Promise<void> {
    try {
      const lists = ListController.getLists();
      const listsWithTaskCounts = lists.map(list => {
        const taskCount = Array.from(db.tasks.values()).filter(task => task.listId === list.id).length;
        return { ...list, taskCount };
      });
      res.status(200).json(listsWithTaskCounts);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  static async getListById(req: Request, res: Response): Promise<void> {
    try {
      const { listId } = req.params;
      const list = ListController.getListById(listId);
      if (list) {
        res.status(200).json(list);
      } else {
        res.status(404).json({ message: 'List not found' });
      }
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  static async updateList(req: Request, res: Response): Promise<void> {
    try {
      const { listId } = req.params;
      const { name } = req.body;
      const updatedList = ListController.updateList(listId, { name });
      if (updatedList) {
        res.status(200).json(updatedList);
      } else {
        res.status(404).json({ message: 'List not found' });
      }
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  static async deleteList(req: Request, res: Response): Promise<void> {
    try {
      const { listId } = req.params;
      const deleted = ListController.deleteList(listId);
      if (deleted) {
        res.status(204).send(); // No Content
      } else {
        res.status(404).json({ message: 'List not found' });
      }
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
}
