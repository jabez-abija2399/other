import { Task, List, DashboardOverview, TaskFormValues, Status } from './types';

const BASE_URL = 'http://localhost:3001/api';

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: 'Unknown error' }));
    throw new Error(errorData.message || 'Something went wrong');
  }
  if (response.status === 204) {
    return null as T; // No content for DELETE
  }
  return response.json();
}

// Task API calls
export const tasksApi = {
  createTask: async (task: TaskFormValues): Promise<Task> => {
    const response = await fetch(`${BASE_URL}/tasks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(task),
    });
    return handleResponse<Task>(response);
  },

  getTasks: async (status?: Status, listId?: string): Promise<Task[]> => {
    const params = new URLSearchParams();
    if (status) params.append('status', status);
    if (listId) params.append('listId', listId);
    const response = await fetch(`${BASE_URL}/tasks?${params.toString()}`);
    return handleResponse<Task[]>(response);
  },

  getTaskById: async (taskId: string): Promise<Task> => {
    const response = await fetch(`${BASE_URL}/tasks/${taskId}`);
    return handleResponse<Task>(response);
  },

  updateTask: async (taskId: string, task: Partial<TaskFormValues>): Promise<Task> => {
    const response = await fetch(`${BASE_URL}/tasks/${taskId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(task),
    });
    return handleResponse<Task>(response);
  },

  deleteTask: async (taskId: string): Promise<void> => {
    const response = await fetch(`${BASE_URL}/tasks/${taskId}`, {
      method: 'DELETE',
    });
    return handleResponse<void>(response);
  },
};

// List API calls
export const listsApi = {
  createList: async (name: string): Promise<List> => {
    const response = await fetch(`${BASE_URL}/lists`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name }),
    });
    return handleResponse<List>(response);
  },

  getLists: async (): Promise<List[]> => {
    const response = await fetch(`${BASE_URL}/lists`);
    return handleResponse<List[]>(response);
  },

  getListById: async (listId: string): Promise<List> => {
    const response = await fetch(`${BASE_URL}/lists/${listId}`);
    return handleResponse<List>(response);
  },

  updateList: async (listId: string, name: string): Promise<List> => {
    const response = await fetch(`${BASE_URL}/lists/${listId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name }),
    });
    return handleResponse<List>(response);
  },

  deleteList: async (listId: string): Promise<void> => {
    const response = await fetch(`${BASE_URL}/lists/${listId}`, {
      method: 'DELETE',
    });
    return handleResponse<void>(response);
  },
};

// Dashboard API calls
export const dashboardApi = {
  getOverview: async (): Promise<DashboardOverview> => {
    const response = await fetch(`${BASE_URL}/dashboard/overview`);
    return handleResponse<DashboardOverview>(response);
  },
};
