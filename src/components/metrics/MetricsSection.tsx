import React from 'react';
import { useLeads } from '@/context/LeadsContext';
import { calculateMetrics } from '@/utils/calculations';
import MetricCard from './MetricCard';

const MetricsSection: React.FC = () => {
  const { state } = useLeads();
  const metrics = calculateMetrics(state.leads);

  return (
    <div className="section active">
      <div className="section-header">
        <h1>Lead Analytics</h1>
        <p className="section-subtitle">Track your lead conversion performance</p>
      </div>

      <div className="metrics-grid">
        <div className="metrics-cards">
          <MetricCard
            title="Total Leads"
            value={metrics.totalLeads.toString()}
            type="number"
          />
          <MetricCard
            title="Conversion Rate"
            value={`${metrics.conversionRate}%`}
            type="percentage"
          />
          <MetricCard
            title="Average Age"
            value={metrics.averageAge.toString()}
            type="number"
          />
          <MetricCard
            title="Recent Activity"
            value={metrics.recentActivity.toString()}
            type="number"
          />
        </div>

        <div className="charts-grid">
          <div className="card chart-card">
            <div className="card__body">
              <h4>Status Distribution</h4>
              <p>Chart implementation coming soon...</p>
            </div>
          </div>
          
          <div className="card chart-card">
            <div className="card__body">
              <h4>Lead Conversion Funnel</h4>
              <p>Chart implementation coming soon...</p>
            </div>
          </div>
          
          <div className="card chart-card chart-wide">
            <div className="card__body">
              <h4>Signup Timeline</h4>
              <p>Chart implementation coming soon...</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MetricsSection;
