import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useLeads } from '@/context/LeadsContext';
import { useToast } from '@/context/ToastContext';
import { LeadStatus } from '@/types';
import { formatDate, calculateAge, calculateFreshness } from '@/utils/dateUtils';
import StatusChip from '@/components/common/StatusChip'; // Import StatusChip

const LeadDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { state, dispatch } = useLeads();
  const { showToast } = useToast();

  const lead = state.leads.find(l => l.id === Number(id));

  if (!lead) {
    return (
      <div className="section active">
        <div className="section-header">
          <h1>Lead Not Found</h1>
        </div>
      </div>
    );
  }

  const handleStatusUpdate = (status: LeadStatus): void => {
    dispatch({
      type: 'UPDATE_LEAD',
      payload: { id: lead.id, updates: { status } }
    });
    showToast(`Lead status updated to ${status}`, 'success');
  };

  const handleCommentsUpdate = (comments: string): void => {
    dispatch({
      type: 'UPDATE_LEAD',
      payload: { id: lead.id, updates: { comments } }
    });
    // showToast('Comments updated successfully', 'success');
  };

  return (
    <div className="section active">
      <div className="detail-header">
        <button 
          className="btn btn--outline"
          onClick={() => navigate('/')}
        >
          <ArrowLeft size={16} />
          Back to Dashboard
        </button>
        <h1>Lead Details</h1>
      </div>

      <div className="detail-container">
        <div className="card">
          <div className="card__body">
            {/* Add status chip next to the name */}
            <div className="flex items-center gap-12 mb-16">
              <h3>{lead.name}</h3>
            </div>
            
            <div className="detail-fields">
              <div className="detail-field">
                <label>Phone</label>
                <span>{lead.phone}</span>
              </div>
              <div className="detail-field">
                <label>College</label>
                <span>{lead.college}</span>
              </div>
              <div className="detail-field">
                <label>Signup Date</label>
                <span>{formatDate(lead.signup_date)}</span>
              </div>
              <div className="detail-field">
                <label>Date of Birth</label>
                <span>{formatDate(lead.date_of_birth)}</span>
              </div>
              <div className="detail-field">
                <label>Age</label>
                <span>{calculateAge(lead.date_of_birth)} years</span>
              </div>
              <div className="detail-field">
                <label>Freshness</label>
                <span>{calculateFreshness(lead.signup_date)} hours</span>
              </div>
            </div>

            {/* Add status info at the bottom */}
            <div className="status-info">
              <div className="detail-field">
                <label>Current Status</label>
                <StatusChip status={lead.status} />
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card__body">
            <h4>Update Status</h4>
            
            <div className="status-buttons">
              <button 
                className="btn status-btn accept-btn"
                onClick={() => handleStatusUpdate('accepted')}
              >
                Accept
              </button>
              <button 
                className="btn status-btn recall-btn"
                onClick={() => handleStatusUpdate('uncontacted')}
              >
                Recall
              </button>
              <button 
                className="btn status-btn reject-btn"
                onClick={() => handleStatusUpdate('rejected')}
              >
                Reject
              </button>
            </div>

            <div className="form-group">
              <label htmlFor="comments" className="form-label">Comments</label>
              <textarea 
                id="comments"
                className="form-control"
                rows={4}
                value={lead.comments}
                onChange={(e) => handleCommentsUpdate(e.target.value)}
                placeholder="Add comments about this lead..."
              />
            </div>

            <div className="last-updated">
              Last updated: {new Date().toLocaleString()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeadDetail;
