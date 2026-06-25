import React, { useState } from 'react';

interface ListCreateFormProps {
  onCreate: (name: string) => void;
}

const ListCreateForm: React.FC<ListCreateFormProps> = ({ onCreate }) => {
  const [listName, setListName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (listName.trim()) {
      onCreate(listName);
      setListName('');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
      <input
        type="text"
        placeholder="New List Name"
        value={listName}
        onChange={(e) => setListName(e.target.value)}
        required
        style={{ flexGrow: 1, padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
      />
      <button type="submit" style={{ padding: '8px 15px', borderRadius: '4px', border: 'none', backgroundColor: '#28a745', color: 'white', cursor: 'pointer' }}>
        Add List
      </button>
    </form>
  );
};

export default ListCreateForm;
