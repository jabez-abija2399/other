import React, { useEffect, useState } from 'react';
import { tasksApi, listsApi } from '../api';
import { Task, List, Status, TaskFormValues } from '../types';
import TaskList from '../components/TaskList';
import TaskFilter from '../components/TaskFilter';
import TaskForm from '../components/TaskForm';
import TaskDetailModal from '../components/TaskDetailModal';

const AllTasks: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [lists, setLists] = useState<List[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<Status | undefined>(undefined);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const fetchTasksAndLists = async () => {
    setLoading(true);
    try {
      const fetchedTasks = await tasksApi.getTasks(filterStatus);
      setTasks(fetchedTasks);
      const fetchedLists = await listsApi.getLists();
      setLists(fetchedLists);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasksAndLists();
  }, [filterStatus]);

  const handleCreateTask = async (values: TaskFormValues) => {
    try {
      await tasksApi.createTask(values);
      fetchTasksAndLists();
    } catch (err: any) {
      alert(`Failed to create task: ${err.message}`);
    }
  };

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task);
  };

  const handleCloseTaskDetail = () => {
    setSelectedTask(null);
  };

  const handleUpdateTask = async (taskId: string, values: Partial<TaskFormValues>) => {
    try {
      await tasksApi.updateTask(taskId, values);
      fetchTasksAndLists();
      setSelectedTask(null);
    } catch (err: any) {
      alert(`Failed to update task: ${err.message}`);
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    try {
      await tasksApi.deleteTask(taskId);
      fetchTasksAndLists();
      setSelectedTask(null);
    } catch (err: any) {
      alert(`Failed to delete task: ${err.message}`);
    }
  };

  const handleToggleComplete = async (task: Task) => {
    const newStatus = task.status === Status.Completed ? Status.Active : Status.Completed;
    try {
      await tasksApi.updateTask(task.id, { status: newStatus });
      fetchTasksAndLists();
    } catch (err: any) {
      alert(`Failed to update task status: ${err.message}`);
    }
  };

  if (loading) {
    return <div style={{ padding: '20px', textAlign: 'center' }}>Loading tasks...</div>;
  }

  if (error) {
    return <div style={{ padding: '20px', textAlign: 'center', color: 'red' }}>Error: {error}</div>;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', maxWidth: '800px', margin: '0 auto', border: '1px solid #ddd', borderRadius: '8px', overflow: 'hidden' }}>
      <h1 style={{ padding: '20px', margin: 0, backgroundColor: '#f5f5f5', borderBottom: '1px solid #eee' }}>All Tasks</h1>
      <TaskFilter onFilterChange={setFilterStatus} />
      <div style={{ flexGrow: 1, overflowY: 'auto' }}>
        <TaskList tasks={tasks} onTaskClick={handleTaskClick} onToggleComplete={handleToggleComplete} />
      </div>
      <div style={{ padding: '20px', borderTop: '1px solid #eee', backgroundColor: '#f5f5f5' }}>
        <TaskForm onSubmit={handleCreateTask} lists={lists} />
      </div>

      {selectedTask && (lists.length > 0) && (
        <TaskDetailModal
          task={selectedTask}
          lists={lists}
          onClose={handleCloseTaskDetail}
          onUpdateTask={handleUpdateTask}
          onDeleteTask={handleDeleteTask}
        />
      )}
    </div>
  );
};

export default AllTasks;
