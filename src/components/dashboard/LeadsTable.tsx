import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Lead, LeadWithCalculations } from '@/types';
import { useLeads } from '@/context/LeadsContext';
import { addCalculationsToLeads, sortLeads } from '@/utils/calculations';
import { formatDate } from '@/utils/dateUtils';
import StatusChip from '@/components/common/StatusChip';

interface LeadsTableProps {
  leads: Lead[];
}

const LeadsTable: React.FC<LeadsTableProps> = ({ leads }) => {
  const navigate = useNavigate();
  const { state, dispatch } = useLeads();

  const leadsWithCalculations = addCalculationsToLeads(leads);
  const sortedLeads = state.sortColumn 
    ? sortLeads(leadsWithCalculations, state.sortColumn, state.sortDirection)
    : leadsWithCalculations;

  const handleSort = (column: string): void => {
    const newDirection = state.sortColumn === column && state.sortDirection === 'asc' 
      ? 'desc' 
      : 'asc';
    
    dispatch({ 
      type: 'SET_SORT', 
      payload: { column, direction: newDirection } 
    });
  };

  const handleRowClick = (leadId: number): void => {
    navigate(`/lead/${leadId}`);
  };

  return (
    <div className="table-container">
      <table className="leads-table">
        <thead>
          <tr>
            <th data-sort="name" onClick={() => handleSort('name')}>
              Name
              <span className={`sort-icon ${state.sortColumn === 'name' ? state.sortDirection : ''}`}></span>
            </th>
            <th data-sort="phone" onClick={() => handleSort('phone')}>
              Phone
              <span className={`sort-icon ${state.sortColumn === 'phone' ? state.sortDirection : ''}`}></span>
            </th>
            <th data-sort="college" onClick={() => handleSort('college')}>
              College
              <span className={`sort-icon ${state.sortColumn === 'college' ? state.sortDirection : ''}`}></span>
            </th>
            <th data-sort="signup_date" onClick={() => handleSort('signup_date')}>
              Signup Date
              <span className={`sort-icon ${state.sortColumn === 'signup_date' ? state.sortDirection : ''}`}></span>
            </th>
            <th data-sort="date_of_birth" onClick={() => handleSort('date_of_birth')}>
              Date of Birth
              <span className={`sort-icon ${state.sortColumn === 'date_of_birth' ? state.sortDirection : ''}`}></span>
            </th>
            <th data-sort="status" onClick={() => handleSort('status')}>
              Status
              <span className={`sort-icon ${state.sortColumn === 'status' ? state.sortDirection : ''}`}></span>
            </th>
            <th data-sort="age" onClick={() => handleSort('age')}>
              Age (Years)
              <span className={`sort-icon ${state.sortColumn === 'age' ? state.sortDirection : ''}`}></span>
            </th>
            <th data-sort="freshness" onClick={() => handleSort('freshness')}>
              Freshness (Hours)
              <span className={`sort-icon ${state.sortColumn === 'freshness' ? state.sortDirection : ''}`}></span>
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedLeads.map((lead) => (
            <tr key={lead.id} onClick={() => handleRowClick(lead.id)}>
              <td>{lead.name}</td>
              <td>{lead.phone}</td>
              <td>{lead.college}</td>
              <td>{formatDate(lead.signup_date)}</td>
              <td>{formatDate(lead.date_of_birth)}</td>
              <td><StatusChip status={lead.status} /></td>
              <td>{lead.age}</td>
              <td>{lead.freshness}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeadsTable;
