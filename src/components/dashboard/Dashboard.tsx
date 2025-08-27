import React from 'react';
import LeadsTable from './LeadsTable';
import { useLeads } from '@/context/LeadsContext';

const Dashboard: React.FC = () => {
  const { state } = useLeads();

  return (
    <div className="section active">
      <div className="section-header">
        <h1>Lead Dashboard</h1>
        <p className="section-subtitle">Manage and track your sales leads</p>
      </div>
      
      <LeadsTable leads={state.leads} />
    </div>
  );
};

export default Dashboard;
