import React from 'react';
import { Task, Status } from '../types';

interface TodayTasksListProps {
  tasks: Task[];
  onTaskClick: (task: Task) => void;
  onToggleComplete: (task: Task) => void;
}

const TodayTasksList: React.FC<TodayTasksListProps> = ({ tasks, onTaskClick, onToggleComplete }) => {
  return (
    <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
      <h3 style={{ marginTop: 0, color: '#007bff' }}>Today's Tasks</h3>
      {tasks.length === 0 ? (
        <p>No tasks for today. Enjoy your day!</p>
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
                <p style={{ margin: '3px 0 0 0', fontSize: '0.85em', color: '#666' }}>
                  {new Date(task.dueDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TodayTasksList;
