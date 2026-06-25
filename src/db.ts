import { Task, Priority, Status } from './models/Task';
import { List } from './models/List';
import { v4 as uuidv4 } from 'uuid';

interface Database {
  tasks: Map<string, Task>;
  lists: Map<string, List>;
}

const db: Database = {
  tasks: new Map<string, Task>(),
  lists: new Map<string, List>(),
};

// Seed some initial data
const seedData = () => {
  const personalListId = uuidv4();
  const workListId = uuidv4();

  const personalList: List = {
    id: personalListId,
    name: 'Personal',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const workList: List = {
    id: workListId,
    name: 'Work',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  db.lists.set(personalList.id, personalList);
  db.lists.set(workList.id, workList);

  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);
  const nextWeek = new Date();
  nextWeek.setDate(today.getDate() + 7);

  const task1: Task = {
    id: uuidv4(),
    title: 'Buy groceries',
    description: 'Milk, eggs, bread, butter',
    dueDate: tomorrow.toISOString(),
    priority: Priority.High,
    status: Status.Active,
    listId: personalListId,
  };

  const task2: Task = {
    id: uuidv4(),
    title: 'Finish report',
    description: 'Submit Q3 financial report',
    dueDate: today.toISOString(),
    priority: Priority.High,
    status: Status.Active,
    listId: workListId,
  };

  const task3: Task = {
    id: uuidv4(),
    title: 'Call mom',
    description: '',
    dueDate: tomorrow.toISOString(),
    priority: Priority.Medium,
    status: Status.Pending,
    listId: personalListId,
  };

  const task4: Task = {
    id: uuidv4(),
    title: 'Review PR #123',
    description: 'Check new feature implementation',
    dueDate: nextWeek.toISOString(),
    priority: Priority.Low,
    status: Status.Active,
    listId: workListId,
  };

  const task5: Task = {
    id: uuidv4(),
    title: 'Pay electricity bill',
    description: '',
    dueDate: yesterday.toISOString(),
    priority: Priority.High,
    status: Status.Active,
    listId: personalListId,
  };

  const task6: Task = {
    id: uuidv4(),
    title: 'Schedule team meeting',
    description: 'For project X kickoff',
    dueDate: today.toISOString(),
    priority: Priority.Medium,
    status: Status.Completed,
    listId: workListId,
  };

  db.tasks.set(task1.id, task1);
  db.tasks.set(task2.id, task2);
  db.tasks.set(task3.id, task3);
  db.tasks.set(task4.id, task4);
  db.tasks.set(task5.id, task5);
  db.tasks.set(task6.id, task6);
};

seedData();

export default db;
