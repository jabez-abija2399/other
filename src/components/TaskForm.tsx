import React, { useState, useEffect } from 'react';
import { Task, Priority, Status, List, TaskFormValues } from '../types';

interface TaskFormProps {
  initialData?: Task;
  onSubmit: (values: TaskFormValues) => void;
  onCancel?: () => void;
  lists: List[];
  isEditMode?: boolean;
}

const TaskForm: React.FC<TaskFormProps> = ({ initialData, onSubmit, onCancel, lists, isEditMode = false }) => {
  const [title, setTitle] = useState(initialData?.title || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [dueDate, setDueDate] = useState(initialData?.dueDate ? new Date(initialData.dueDate).toISOString().substring(0, 16) : '');
  const [priority, setPriority] = useState<Priority>(initialData?.priority || Priority.Medium);
  const [status, setStatus] = useState<Status>(initialData?.status || Status.Active);
  const [listId, setListId] = useState<string>(initialData?.listId || (lists.length > 0 ? lists[0].id : ''));

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setDescription(initialData.description || '');
      setDueDate(new Date(initialData.dueDate).toISOString().substring(0, 16));
      setPriority(initialData.priority);
      setStatus(initialData.status);
      setListId(initialData.listId);
    } else if (lists.length > 0 && !listId) {
      setListId(lists[0].id);
    }
  }, [initialData, lists, listId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !dueDate || !listId) {
      alert('Title, Due Date, and List are required.');
      return;
    }
    onSubmit({
      title,
      description,
      dueDate: new Date(dueDate).toISOString(),
      priority,
      status,
      listId,
    });
    if (!isEditMode) {
      setTitle('');
      setDescription('');
      setDueDate('');
      setPriority(Priority.Medium);
      setStatus(Status.Active);
      // Keep current listId selected if applicable or reset to default
      setListId(lists.length > 0 ? lists[0].id : '');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px', padding: '15px', border: '1px solid #ddd', borderRadius: '5px', backgroundColor: '#f9f9f9' }}>
      <h3 style={{ margin: '0 0 10px 0' }}>{isEditMode ? 'Edit Task' : 'Create New Task'}</h3>
      <input
        type="text"
        placeholder="Task Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
      />
      <textarea
        placeholder="Description (optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows={3}
        style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
      />
      <input
        type="datetime-local"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        required
        style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
      />
      <select value={priority} onChange={(e) => setPriority(e.target.value as Priority)} style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}>
        {Object.values(Priority).map((p) => (
          <option key={p} value={p}>{p}</option>
        ))}
      </select>
      <select value={status} onChange={(e) => setStatus(e.target.value as Status)} style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}>
        {Object.values(Status).map((s) => (
          <option key={s} value={s}>{s}</option>
        ))}
      </select>
      <select value={listId} onChange={(e) => setListId(e.target.value)} required style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}>
        {lists.length === 0 && <option value="">No lists available</option>}
        {lists.map((list) => (
          <option key={list.id} value={list.id}>{list.name}</option>
        ))}
      </select>
      <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
        <button type="submit" style={{ padding: '10px 15px', borderRadius: '4px', border: 'none', backgroundColor: '#007bff', color: 'white', cursor: 'pointer' }}>
          {isEditMode ? 'Update Task' : 'Add Task'}
        </button>
        {onCancel && (
          <button type="button" onClick={onCancel} style={{ padding: '10px 15px', borderRadius: '4px', border: '1px solid #ccc', backgroundColor: '#f0f0f0', cursor: 'pointer' }}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default TaskForm;
