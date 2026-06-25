import React from 'react';
import { Task, Status } from '../types';

interface TaskListProps {
  tasks: Task[];
  onTaskClick: (task: Task) => void;
  onToggleComplete: (task: Task) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onTaskClick, onToggleComplete }) => {
  if (tasks.length === 0) {
    return <p style={{ textAlign: 'center', color: '#666' }}>No tasks found.</p>;
  }

  return (
    <ul style={{ listStyle: 'none', padding: 0 }}>
      {tasks.map((task) => (
        <li
          key={task.id}
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: '10px',
            borderBottom: '1px solid #eee',
            backgroundColor: task.status === Status.Completed ? '#e6ffe6' : 'white',
            cursor: 'pointer',
            transition: 'background-color 0.2s ease',
          }}
          onClick={() => onTaskClick(task)}
        >
          <input
            type="checkbox"
            checked={task.status === Status.Completed}
            onChange={(e) => {
              e.stopPropagation(); // Prevent li onClick from firing
              onToggleComplete(task);
            }}
            style={{ marginRight: '10px', transform: 'scale(1.2)' }}
          />
          <div style={{ flexGrow: 1 }}>
            <h4 style={{
              margin: 0,
              textDecoration: task.status === Status.Completed ? 'line-through' : 'none',
              color: task.status === Status.Completed ? '#888' : '#333'
            }}>
              {task.title}
            </h4>
            <p style={{ margin: '5px 0 0 0', fontSize: '0.9em', color: '#666' }}>
              Due: {new Date(task.dueDate).toLocaleString()}
            </p>
          </div>
          <span style={{ fontSize: '0.8em', padding: '3px 8px', borderRadius: '3px', color: 'white', backgroundColor: 
            task.priority === 'High' ? '#dc3545' : 
            task.priority === 'Medium' ? '#ffc107' : 
            '#17a2b8'
          }}>
            {task.priority}
          </span>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
