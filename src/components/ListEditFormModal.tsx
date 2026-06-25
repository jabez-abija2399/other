import React, { useState, useEffect } from 'react';
import { List } from '../types';

interface ListEditFormModalProps {
  list: List;
  onClose: () => void;
  onUpdate: (listId: string, name: string) => void;
  onDelete: (listId: string) => void;
}

const ListEditFormModal: React.FC<ListEditFormModalProps> = ({ list, onClose, onUpdate, onDelete }) => {
  const [name, setName] = useState(list.name);

  useEffect(() => {
    setName(list.name);
  }, [list]);

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onUpdate(list.id, name);
    }
  };

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete the list "${list.name}"? All tasks in this list will also be deleted.`)) {
      onDelete(list.id);
      onClose();
    }
  };

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
      <div style={{ background: 'white', padding: '20px', borderRadius: '8px', width: '90%', maxWidth: '400px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: '1.2em', cursor: 'pointer' }}>&times;</button>
        </div>
        <h3 style={{ marginTop: '0' }}>Edit List</h3>
        <form onSubmit={handleUpdate} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <label>
            List Name:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc', marginTop: '5px' }}
            />
          </label>
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
            <button type="submit" style={{ padding: '8px 15px', borderRadius: '4px', border: 'none', backgroundColor: '#007bff', color: 'white', cursor: 'pointer' }}>
              Save Changes
            </button>
            <button type="button" onClick={handleDelete} style={{ padding: '8px 15px', borderRadius: '4px', border: 'none', backgroundColor: '#dc3545', color: 'white', cursor: 'pointer' }}>
              Delete List
            </button>
            <button type="button" onClick={onClose} style={{ padding: '8px 15px', borderRadius: '4px', border: '1px solid #ccc', backgroundColor: '#f0f0f0', cursor: 'pointer' }}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ListEditFormModal;
