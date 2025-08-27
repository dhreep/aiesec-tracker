import React from 'react';
import { Lead } from '@/types';
import { formatDate } from '@/utils/dateUtils';

interface FilePreviewProps {
  data: Lead[];
  onConfirm: () => void;
  onCancel: () => void;
}

const FilePreview: React.FC<FilePreviewProps> = ({ data, onConfirm, onCancel }) => {
  return (
    <div className="preview-section">
      <h3>Preview Data ({data.length} records)</h3>
      
      <div className="table-container">
        <table className="preview-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone</th>
              <th>College</th>
              <th>Signup Date</th>
              <th>Date of Birth</th>
            </tr>
          </thead>
          <tbody>
            {data.slice(0, 5).map((lead, index) => (
              <tr key={index}>
                <td>{lead.name}</td>
                <td>{lead.phone}</td>
                <td>{lead.college}</td>
                <td>{formatDate(lead.signup_date)}</td>
                <td>{formatDate(lead.date_of_birth)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {data.length > 5 && (
          <p className="text-center text-secondary mt-8">
            ... and {data.length - 5} more records
          </p>
        )}
      </div>

      <div className="upload-actions">
        <button 
          className="btn btn--outline" 
          onClick={onCancel}
        >
          Cancel
        </button>
        <button 
          className="btn btn--primary" 
          onClick={onConfirm}
        >
          Upload {data.length} Leads
        </button>
      </div>
    </div>
  );
};

export default FilePreview;
