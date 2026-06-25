import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { tasksApi, listsApi } from '../api';
import { List, TaskFormValues } from '../types';
import TaskForm from '../components/TaskForm';

const TaskCreation: React.FC = () => {
  const navigate = useNavigate();
  const [lists, setLists] = useState<List[]>([]);
  const [loadingLists, setLoadingLists] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLists = async () => {
      try {
        const fetchedLists = await listsApi.getLists();
        setLists(fetchedLists);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoadingLists(false);
      }
    };
    fetchLists();
  }, []);

  const handleCreateTask = async (values: TaskFormValues) => {
    try {
      await tasksApi.createTask(values);
      alert('Task created successfully!');
      navigate('/all-tasks'); // Navigate to all tasks after creation
    } catch (err: any) {
      alert(`Failed to create task: ${err.message}`);
    }
  };

  if (loadingLists) {
    return <div style={{ padding: '20px', textAlign: 'center' }}>Loading lists for task creation...</div>;
  }

  if (error) {
    return <div style={{ padding: '20px', textAlign: 'center', color: 'red' }}>Error: {error}</div>;
  }

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto', border: '1px solid #ddd', borderRadius: '8px', backgroundColor: '#fff' }}>
      <h1 style={{ marginBottom: '20px', color: '#333' }}>Create New Task</h1>
      {lists.length > 0 ? (
        <TaskForm onSubmit={handleCreateTask} lists={lists} />
      ) : (
        <p>No lists available. Please create a list first in List Management to add tasks.</p>
      )}
    </div>
  );
};

export default TaskCreation;
