import { Task, Status } from '../models/Task';
import db from '../db';

export class DashboardController {
  static getDashboardOverview() {
    const allTasks = Array.from(db.tasks.values());
    const now = new Date();
    now.setHours(0, 0, 0, 0); // Normalize to start of today

    const sevenDaysFromNow = new Date();
    sevenDaysFromNow.setDate(now.getDate() + 7);
    sevenDaysFromNow.setHours(23, 59, 59, 999); // Normalize to end of 7th day

    const tasksToday: Task[] = [];
    const tasksOverdue: Task[] = [];
    const tasksUpcoming: Task[] = [];

    for (const task of allTasks) {
      // Only consider active/pending tasks for dashboard overview
      if (task.status === Status.Completed) continue;

      const dueDate = new Date(task.dueDate);
      dueDate.setHours(0, 0, 0, 0); // Normalize task due date to start of day

      if (dueDate.getTime() < now.getTime()) {
        tasksOverdue.push(task);
      } else if (dueDate.getTime() === now.getTime()) {
        tasksToday.push(task);
      } else if (dueDate.getTime() > now.getTime() && dueDate.getTime() <= sevenDaysFromNow.getTime()) {
        tasksUpcoming.push(task);
      }
    }

    return {
      tasksToday: tasksToday.sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()),
      tasksOverdue: tasksOverdue.sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()),
      tasksUpcoming: tasksUpcoming.sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()),
    };
  }
}
