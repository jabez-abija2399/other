import React, { useState, useEffect } from 'react';
import { Task, Priority, Status, List, TaskFormValues } from '../types';
import TaskForm from './TaskForm';

interface TaskDetailModalProps {
  task: Task;
  lists: List[];
  onClose: () => void;
  onUpdateTask: (taskId: string, values: Partial<TaskFormValues>) => void;
  onDeleteTask: (taskId: string) => void;
}

const TaskDetailModal: React.FC<TaskDetailModalProps> = ({ task, lists, onClose, onUpdateTask, onDeleteTask }) => {
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    // Reset editing state when a new task is selected
    setIsEditing(false);
  }, [task]);

  const handleUpdate = (values: TaskFormValues) => {
    onUpdateTask(task.id, values);
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      onDeleteTask(task.id);
      onClose();
    }
  };

  const currentList = lists.find(list => list.id === task.listId);

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
      <div style={{ background: 'white', padding: '20px', borderRadius: '8px', width: '90%', maxWidth: '500px', maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: '1.2em', cursor: 'pointer' }}>&times;</button>
        </div>
        {isEditing ? (
          <TaskForm
            initialData={task}
            onSubmit={handleUpdate}
            onCancel={() => setIsEditing(false)}
            lists={lists}
            isEditMode={true}
          />
        ) : (
          <div>
            <h2 style={{ marginBottom: '10px' }}>{task.title}</h2>
            <p><strong>Description:</strong> {task.description || 'N/A'}</p>
            <p><strong>Due Date:</strong> {new Date(task.dueDate).toLocaleString()}</p>
            <p><strong>Priority:</strong> {task.priority}</p>
            <p><strong>Status:</strong> {task.status}</p>
            <p><strong>List:</strong> {currentList ? currentList.name : 'N/A'}</p>
            <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
              <button onClick={() => setIsEditing(true)} style={{ padding: '8px 15px', borderRadius: '4px', border: 'none', backgroundColor: '#007bff', color: 'white', cursor: 'pointer' }}>Edit</button>
              <button onClick={handleDelete} style={{ padding: '8px 15px', borderRadius: '4px', border: 'none', backgroundColor: '#dc3545', color: 'white', cursor: 'pointer' }}>Delete</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskDetailModal;
