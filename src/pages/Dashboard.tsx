import React, { useEffect, useState } from 'react';
import { dashboardApi, tasksApi, listsApi } from '../api';
import { DashboardOverview, Task, Status, List } from '../types';
import TodayTasksList from '../components/TodayTasksList';
import OverdueTasksList from '../components/OverdueTasksList';
import UpcomingTasksList from '../components/UpcomingTasksList';
import DashboardSummaryCard from '../components/DashboardSummaryCard';
import TaskDetailModal from '../components/TaskDetailModal';

const Dashboard: React.FC = () => {
  const [overview, setOverview] = useState<DashboardOverview | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [lists, setLists] = useState<List[]>([]);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const overviewData = await dashboardApi.getOverview();
      setOverview(overviewData);
      const allLists = await listsApi.getLists();
      setLists(allLists);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task);
  };

  const handleCloseTaskDetail = () => {
    setSelectedTask(null);
  };

  const handleUpdateTask = async (taskId: string, values: Partial<Task>) => {
    try {
      await tasksApi.updateTask(taskId, values);
      fetchDashboardData(); // Re-fetch dashboard data to update counts/lists
      setSelectedTask(null);
    } catch (err: any) {
      alert(`Failed to update task: ${err.message}`);
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    try {
      await tasksApi.deleteTask(taskId);
      fetchDashboardData(); // Re-fetch dashboard data
      setSelectedTask(null);
    } catch (err: any) {
      alert(`Failed to delete task: ${err.message}`);
    }
  };

  const handleToggleComplete = async (task: Task) => {
    const newStatus = task.status === Status.Completed ? Status.Active : Status.Completed;
    try {
      await tasksApi.updateTask(task.id, { status: newStatus });
      fetchDashboardData();
    } catch (err: any) {
      alert(`Failed to update task status: ${err.message}`);
    }
  };

  if (loading) {
    return <div style={{ padding: '20px', textAlign: 'center' }}>Loading dashboard...</div>;
  }

  if (error) {
    return <div style={{ padding: '20px', textAlign: 'center', color: 'red' }}>Error: {error}</div>;
  }

  if (!overview) {
    return null; // Should not happen if loading and error are handled
  }

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ marginBottom: '30px', color: '#333' }}>Dashboard Overview</h1>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center', marginBottom: '40px' }}>
        <DashboardSummaryCard title="Today's Tasks" count={overview.tasksToday.length} color="#007bff" />
        <DashboardSummaryCard title="Overdue Tasks" count={overview.tasksOverdue.length} color="#dc3545" />
        <DashboardSummaryCard title="Upcoming Tasks" count={overview.tasksUpcoming.length} color="#ffc107" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
        <TodayTasksList tasks={overview.tasksToday} onTaskClick={handleTaskClick} onToggleComplete={handleToggleComplete} />
        <OverdueTasksList tasks={overview.tasksOverdue} onTaskClick={handleTaskClick} onToggleComplete={handleToggleComplete} />
        <UpcomingTasksList tasks={overview.tasksUpcoming} onTaskClick={handleTaskClick} onToggleComplete={handleToggleComplete} />
      </div>

      {selectedTask && (lists.length > 0) && (
        <TaskDetailModal
          task={selectedTask}
          lists={lists}
          onClose={handleCloseTaskDetail}
          onUpdateTask={handleUpdateTask}
          onDeleteTask={handleDeleteTask}
        />
      )}
    </div>
  );
};

export default Dashboard;
