import { List } from '../models/List';
import db from '../db';
import { v4 as uuidv4 } from 'uuid';

interface CreateListPayload {
  name: string;
}

interface UpdateListPayload {
  name: string;
}

export class ListController {
  static createList(payload: CreateListPayload): List {
    if (!payload.name) {
      throw new Error('List name is required.');
    }
    const now = new Date().toISOString();
    const newList: List = {
      id: uuidv4(),
      name: payload.name,
      createdAt: now,
      updatedAt: now,
    };
    db.lists.set(newList.id, newList);
    return newList;
  }

  static getLists(): List[] {
    return Array.from(db.lists.values());
  }

  static getListById(listId: string): List | undefined {
    return db.lists.get(listId);
  }

  static updateList(listId: string, payload: UpdateListPayload): List | undefined {
    const list = db.lists.get(listId);
    if (!list) {
      return undefined;
    }

    if (!payload.name) {
      throw new Error('List name is required.');
    }

    const updatedList: List = {
      ...list,
      name: payload.name,
      updatedAt: new Date().toISOString(),
    };
    db.lists.set(listId, updatedList);
    return updatedList;
  }

  static deleteList(listId: string): boolean {
    const listExists = db.lists.has(listId);
    if (listExists) {
      // Also delete all tasks associated with this list
      Array.from(db.tasks.values())
        .filter(task => task.listId === listId)
        .forEach(task => db.tasks.delete(task.id));
      db.lists.delete(listId);
    }
    return listExists;
  }
}
