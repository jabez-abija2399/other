import React from 'react';
import { Task, Status } from '../types';

interface OverdueTasksListProps {
  tasks: Task[];
  onTaskClick: (task: Task) => void;
  onToggleComplete: (task: Task) => void;
}

const OverdueTasksList: React.FC<OverdueTasksListProps> = ({ tasks, onTaskClick, onToggleComplete }) => {
  return (
    <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
      <h3 style={{ marginTop: 0, color: '#dc3545' }}>Overdue Tasks</h3>
      {tasks.length === 0 ? (
        <p>No overdue tasks. Great job!</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {tasks.map((task) => (
            <li
              key={task.id}
              style={{
                display: 'flex', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid #eee', cursor: 'pointer',
                backgroundColor: task.status === Status.Completed ? '#e6ffe6' : 'transparent'
              }}
              onClick={() => onTaskClick(task)}
            >
              <input
                type="checkbox"
                checked={task.status === Status.Completed}
                onChange={(e) => {
                  e.stopPropagation();
                  onToggleComplete(task);
                }}
                style={{ marginRight: '10px', transform: 'scale(1.1)' }}
              />
              <div style={{ flexGrow: 1 }}>
                <p style={{ margin: 0, textDecoration: task.status === Status.Completed ? 'line-through' : 'none' }}>
                  {task.title}
                </p>
                <p style={{ margin: '3px 0 0 0', fontSize: '0.85em', color: '#888' }}>
                  Due: {new Date(task.dueDate).toLocaleDateString()} {new Date(task.dueDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default OverdueTasksList;
