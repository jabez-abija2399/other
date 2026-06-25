import React, { useState } from 'react';
import { Status } from '../types';

interface TaskFilterProps {
  onFilterChange: (status?: Status | 'All') => void;
}

const TaskFilter: React.FC<TaskFilterProps> = ({ onFilterChange }) => {
  const [selectedStatus, setSelectedStatus] = useState<Status | 'All'>('All');

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as Status | 'All';
    setSelectedStatus(value);
    onFilterChange(value === 'All' ? undefined : value);
  };

  return (
    <div style={{ padding: '15px', borderBottom: '1px solid #eee', backgroundColor: '#f5f5f5' }}>
      <label htmlFor="status-filter" style={{ marginRight: '10px' }}>Filter by Status:</label>
      <select
        id="status-filter"
        value={selectedStatus}
        onChange={handleChange}
        style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
      >
        <option value="All">All</option>
        {Object.values(Status).map((status) => (
          <option key={status} value={status}>{status}</option>
        ))}
      </select>
    </div>
  );
};

export default TaskFilter;
