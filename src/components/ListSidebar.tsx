import React from 'react';
import { List } from '../types';

interface ListSidebarProps {
  lists: List[];
  onListSelect: (listId: string) => void;
  onShowAllTasks: () => void;
  onManageLists: () => void;
  activeListId?: string;
}

const ListSidebar: React.FC<ListSidebarProps> = ({ lists, onListSelect, onShowAllTasks, onManageLists, activeListId }) => {
  return (
    <div style={{ width: '250px', padding: '15px', backgroundColor: '#f0f2f5', borderRight: '1px solid #ddd', height: '100vh', overflowY: 'auto' }}>
      <h3 style={{ marginTop: 0, marginBottom: '20px', color: '#333' }}>Your Lists</h3>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        <li style={{ marginBottom: '5px' }}>
          <button
            onClick={onShowAllTasks}
            style={{
              width: '100%', padding: '10px', textAlign: 'left', border: 'none', borderRadius: '4px',
              backgroundColor: !activeListId ? '#e0e6ed' : 'transparent',
              fontWeight: !activeListId ? 'bold' : 'normal',
              cursor: 'pointer', '&:hover': { backgroundColor: '#e0e6ed' }
            }}
          >
            All Tasks
          </button>
        </li>
        {lists.map((list) => (
          <li key={list.id} style={{ marginBottom: '5px' }}>
            <button
              onClick={() => onListSelect(list.id)}
              style={{
                width: '100%', padding: '10px', textAlign: 'left', border: 'none', borderRadius: '4px',
                backgroundColor: activeListId === list.id ? '#e0e6ed' : 'transparent',
                fontWeight: activeListId === list.id ? 'bold' : 'normal',
                cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                '&:hover': { backgroundColor: '#e0e6ed' }
              }}
            >
              <span>{list.name}</span>
              <span style={{ fontSize: '0.8em', backgroundColor: '#ccc', padding: '2px 6px', borderRadius: '10px' }}>
                {list.taskCount !== undefined ? list.taskCount : '...'} 
              </span>
            </button>
          </li>
        ))}
        <li style={{ marginTop: '20px' }}>
          <button
            onClick={onManageLists}
            style={{
              width: '100%', padding: '10px', textAlign: 'left', border: '1px solid #007bff', borderRadius: '4px',
              backgroundColor: 'white', color: '#007bff', cursor: 'pointer', fontWeight: 'bold',
              '&:hover': { backgroundColor: '#e0f2ff' }
            }}
          >
            + Manage Lists
          </button>
        </li>
      </ul>
    </div>
  );
};

export default ListSidebar;
