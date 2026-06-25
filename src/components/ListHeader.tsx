import React from 'react';
import { List } from '../types';

interface ListHeaderProps {
  list: List;
  onEditClick: (list: List) => void;
}

const ListHeader: React.FC<ListHeaderProps> = ({ list, onEditClick }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px', borderBottom: '1px solid #eee', backgroundColor: '#f0f2f5' }}>
      <h2 style={{ margin: 0 }}>{list.name}</h2>
      <button
        onClick={() => onEditClick(list)}
        style={{ padding: '8px 15px', borderRadius: '4px', border: '1px solid #007bff', backgroundColor: 'white', color: '#007bff', cursor: 'pointer' }}
      >
        Edit List
      </button>
    </div>
  );
};

export default ListHeader;
