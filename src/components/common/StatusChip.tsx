import React from 'react';
import { LeadStatus } from '@/types';

interface StatusChipProps {
  status: LeadStatus;
}

const StatusChip: React.FC<StatusChipProps> = ({ status }) => {
  return (
    <span className={`status-chip ${status}`}>
      {status}
    </span>
  );
};

export default StatusChip;
