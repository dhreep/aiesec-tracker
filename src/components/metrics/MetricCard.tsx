import React from 'react';

interface MetricCardProps {
  title: string;
  value: string;
  type: 'number' | 'percentage' | 'currency';
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, type }) => {
 console.log(type);
  return (
    <div className="card metric-card">
      <div className="card__body">
        <h3>{title}</h3>
        <div className="metric-value">{value}</div>
      </div>
    </div>
  );
};

export default MetricCard;
