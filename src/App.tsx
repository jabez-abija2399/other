import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import AllTasks from './pages/AllTasks';
import ListDetail from './pages/ListDetail';
import ListManagement from './pages/ListManagement';
import TaskCreation from './pages/TaskCreation';
import ListSidebar from './components/ListSidebar';
import { List } from './types';
import { listsApi } from './api';

const App: React.FC = () => {
  const [lists, setLists] = React.useState<List[]>([]);
  const [activeListId, setActiveListId] = React.useState<string | undefined>(undefined);

  const fetchListsWithCounts = async () => {
    try {
      const fetchedLists = await listsApi.getLists();
      setLists(fetchedLists);
    } catch (error) {
      console.error('Failed to fetch lists:', error);
    }
  };

  React.useEffect(() => {
    fetchListsWithCounts();
    const intervalId = setInterval(fetchListsWithCounts, 5000); // Refresh lists every 5 seconds
    return () => clearInterval(intervalId);
  }, []);

  return (
    <Router>
      <div style={{ display: 'flex', minHeight: '100vh', fontFamily: 'Arial, sans-serif' }}>
        <ListSidebar 
          lists={lists}
          onListSelect={(id) => {
            setActiveListId(id);
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore - TS thinks navigate is not defined, but it's used in nested component
            window.location.href = `/lists/${id}`;
          }}
          onShowAllTasks={() => {
            setActiveListId(undefined);
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            window.location.href = `/all-tasks`;
          }}
          onManageLists={() => {
            setActiveListId(undefined);
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            window.location.href = `/lists`;
          }}
          activeListId={activeListId}
        />

        <div style={{ flexGrow: 1, padding: '20px', backgroundColor: '#f8f9fa' }}>
          <nav style={{ marginBottom: '20px', borderBottom: '1px solid #eee', paddingBottom: '15px' }}>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', gap: '20px' }}>
              <li><Link to="/dashboard" style={{ textDecoration: 'none', color: '#007bff', fontWeight: 'bold' }}>Dashboard</Link></li>
              <li><Link to="/all-tasks" style={{ textDecoration: 'none', color: '#007bff', fontWeight: 'bold' }}>All Tasks</Link></li>
              <li><Link to="/task-creation" style={{ textDecoration: 'none', color: '#007bff', fontWeight: 'bold' }}>Create Task</Link></li>
              <li><Link to="/lists" style={{ textDecoration: 'none', color: '#007bff', fontWeight: 'bold' }}>Manage Lists</Link></li>
            </ul>
          </nav>

          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/all-tasks" element={<AllTasks />} />
            <Route path="/lists/:listId" element={<ListDetail />} />
            <Route path="/lists" element={<ListManagement />} />
            <Route path="/task-creation" element={<TaskCreation />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
