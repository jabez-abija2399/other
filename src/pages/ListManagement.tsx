import React, { useEffect, useState } from 'react';
import { listsApi } from '../api';
import { List } from '../types';
import ListCreateForm from '../components/ListCreateForm';
import ListEditFormModal from '../components/ListEditFormModal';

const ListManagement: React.FC = () => {
  const [lists, setLists] = useState<List[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedList, setSelectedList] = useState<List | null>(null);

  const fetchLists = async () => {
    setLoading(true);
    try {
      const fetchedLists = await listsApi.getLists();
      setLists(fetchedLists);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLists();
  }, []);

  const handleCreateList = async (name: string) => {
    try {
      await listsApi.createList(name);
      fetchLists();
    } catch (err: any) {
      alert(`Failed to create list: ${err.message}`);
    }
  };

  const handleUpdateList = async (listId: string, name: string) => {
    try {
      await listsApi.updateList(listId, name);
      fetchLists();
      setSelectedList(null);
    } catch (err: any) {
      alert(`Failed to update list: ${err.message}`);
    }
  };

  const handleDeleteList = async (listId: string) => {
    try {
      await listsApi.deleteList(listId);
      fetchLists();
      setSelectedList(null);
    } catch (err: any) {
      alert(`Failed to delete list: ${err.message}`);
    }
  };

  if (loading) {
    return <div style={{ padding: '20px', textAlign: 'center' }}>Loading lists...</div>;
  }

  if (error) {
    return <div style={{ padding: '20px', textAlign: 'center', color: 'red' }}>Error: {error}</div>;
  }

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto', border: '1px solid #ddd', borderRadius: '8px', backgroundColor: '#fff' }}>
      <h1 style={{ marginBottom: '20px', color: '#333' }}>List Management</h1>

      <ListCreateForm onCreate={handleCreateList} />

      <h2 style={{ marginBottom: '15px', borderBottom: '1px solid #eee', paddingBottom: '10px', color: '#555' }}>Existing Lists</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {lists.length === 0 ? (
          <p>No lists created yet. Start by adding one!</p>
        ) : (
          lists.map((list) => (
            <li key={list.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px', border: '1px solid #eee', borderRadius: '4px', marginBottom: '8px', backgroundColor: '#f9f9f9' }}>
              <span>{list.name}</span>
              <button
                onClick={() => setSelectedList(list)}
                style={{ padding: '6px 12px', borderRadius: '4px', border: 'none', backgroundColor: '#007bff', color: 'white', cursor: 'pointer' }}
              >
                Edit
              </button>
            </li>
          ))
        )}
      </ul>

      {selectedList && (
        <ListEditFormModal
          list={selectedList}
          onClose={() => setSelectedList(null)}
          onUpdate={handleUpdateList}
          onDelete={handleDeleteList}
        />
      )}
    </div>
  );
};

export default ListManagement;
