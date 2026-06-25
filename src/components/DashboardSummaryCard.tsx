import React from 'react';

interface DashboardSummaryCardProps {
  title: string;
  count: number;
  color: string;
}

const DashboardSummaryCard: React.FC<DashboardSummaryCardProps> = ({ title, count, color }) => {
  return (
    <div style={{
      backgroundColor: color,
      color: 'white',
      padding: '20px',
      borderRadius: '8px',
      textAlign: 'center',
      flex: 1,
      minWidth: '180px',
      maxWidth: '300px',
      boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
    }}>
      <h3 style={{ margin: '0 0 10px 0', fontSize: '1.2em' }}>{title}</h3>
      <p style={{ margin: 0, fontSize: '2.5em', fontWeight: 'bold' }}>{count}</p>
    </div>
  );
};

export default DashboardSummaryCard;
