import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { listsApi, tasksApi } from '../api';
import { List, Task, Status, TaskFormValues } from '../types';
import ListHeader from '../components/ListHeader';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';
import TaskDetailModal from '../components/TaskDetailModal';
import ListEditFormModal from '../components/ListEditFormModal';

const ListDetail: React.FC = () => {
  const { listId } = useParams<{ listId: string }>();
  const navigate = useNavigate();

  const [list, setList] = useState<List | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [allLists, setAllLists] = useState<List[]>([]); // To pass to TaskForm/TaskDetailModal
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [showEditListModal, setShowEditListModal] = useState(false);

  const fetchListAndTasks = async () => {
    if (!listId) return;
    setLoading(true);
    try {
      const fetchedList = await listsApi.getListById(listId);
      setList(fetchedList);
      const fetchedTasks = await tasksApi.getTasks(undefined, listId);
      setTasks(fetchedTasks);
      const fetchedAllLists = await listsApi.getLists();
      setAllLists(fetchedAllLists);
    } catch (err: any) {
      setError(err.message);
      if (err.message.includes('not found')) {
        navigate('/lists'); // Redirect if list not found
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchListAndTasks();
  }, [listId]);

  const handleCreateTask = async (values: TaskFormValues) => {
    try {
      await tasksApi.createTask({ ...values, listId: listId! });
      fetchListAndTasks();
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
      fetchListAndTasks();
      setSelectedTask(null);
    } catch (err: any) {
      alert(`Failed to update task: ${err.message}`);
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    try {
      await tasksApi.deleteTask(taskId);
      fetchListAndTasks();
      setSelectedTask(null);
    } catch (err: any) {
      alert(`Failed to delete task: ${err.message}`);
    }
  };

  const handleToggleComplete = async (task: Task) => {
    const newStatus = task.status === Status.Completed ? Status.Active : Status.Completed;
    try {
      await tasksApi.updateTask(task.id, { status: newStatus });
      fetchListAndTasks();
    } catch (err: any) {
      alert(`Failed to update task status: ${err.message}`);
    }
  };

  const handleUpdateList = async (id: string, name: string) => {
    try {
      await listsApi.updateList(id, name);
      fetchListAndTasks();
      setShowEditListModal(false);
    } catch (err: any) {
      alert(`Failed to update list: ${err.message}`);
    }
  };

  const handleDeleteList = async (id: string) => {
    try {
      await listsApi.deleteList(id);
      navigate('/lists'); // Redirect to list management after deletion
    } catch (err: any) {
      alert(`Failed to delete list: ${err.message}`);
    }
  };

  if (loading) {
    return <div style={{ padding: '20px', textAlign: 'center' }}>Loading list...</div>;
  }

  if (error) {
    return <div style={{ padding: '20px', textAlign: 'center', color: 'red' }}>Error: {error}</div>;
  }

  if (!list) {
    return <div style={{ padding: '20px', textAlign: 'center' }}>List not found.</div>;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', maxWidth: '800px', margin: '0 auto', border: '1px solid #ddd', borderRadius: '8px', overflow: 'hidden' }}>
      <ListHeader list={list} onEditClick={() => setShowEditListModal(true)} />
      <div style={{ flexGrow: 1, overflowY: 'auto' }}>
        <TaskList tasks={tasks} onTaskClick={handleTaskClick} onToggleComplete={handleToggleComplete} />
      </div>
      <div style={{ padding: '20px', borderTop: '1px solid #eee', backgroundColor: '#f5f5f5' }}>
        <TaskForm onSubmit={handleCreateTask} lists={allLists} initialData={{ ...{} as Task, listId: list.id }} />
      </div>

      {selectedTask && (allLists.length > 0) && (
        <TaskDetailModal
          task={selectedTask}
          lists={allLists}
          onClose={handleCloseTaskDetail}
          onUpdateTask={handleUpdateTask}
          onDeleteTask={handleDeleteTask}
        />
      )}

      {showEditListModal && (
        <ListEditFormModal
          list={list}
          onClose={() => setShowEditListModal(false)}
          onUpdate={handleUpdateList}
          onDelete={handleDeleteList}
        />
      )}
    </div>
  );
};

export default ListDetail;
