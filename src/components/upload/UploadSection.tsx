import React, { useRef, ChangeEvent } from 'react';
import { Upload, FileSpreadsheet, CheckCircle, XCircle } from 'lucide-react';
import { useFileUpload } from '@/hooks/useFileUpload';
import { useLeads } from '@/context/LeadsContext';
import { useToast } from '@/context/ToastContext';
import FilePreview from './FilePreview';
import { Lead } from '@/types';

const UploadSection: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { dispatch } = useLeads();
  const { showToast } = useToast();
  
  const {
    file,
    preview,
    isUploading,
    error,
    handleFileSelect,
    confirmUpload,
    resetUpload
  } = useFileUpload({
    onUploadComplete: (newLeads: Lead[]) => {
      dispatch({ type: 'ADD_LEADS', payload: newLeads });
      showToast(`Successfully uploaded ${newLeads.length} leads!`, 'success');
    }
  });

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      handleFileSelect(selectedFile);
    }
  };

  const handleUploadClick = (): void => {
    fileInputRef.current?.click();
  };

  return (
    <div className="upload-container">
      <div className="section-header">
        <h1>Upload Leads</h1>
        <p className="section-subtitle">Import leads from Excel or CSV files</p>
      </div>

      <div className="card upload-card">
        <div className="card__body">
          {!file ? (
            <div className="upload-area" onClick={handleUploadClick}>
              <input
                ref={fileInputRef}
                type="file"
                accept=".xlsx,.xls,.csv"
                onChange={handleFileChange}
                className="file-input"
              />
              <div className="upload-icon">
                <Upload size={48} />
              </div>
              <h3>Click to upload or drag and drop</h3>
              <p>Excel (.xlsx, .xls) or CSV files only</p>
              <p className="text-sm text-secondary">
                Required columns: name, phone, college, signup_date, date_of_birth
              </p>
            </div>
          ) : (
            <div className="file-status">
              <div className="flex items-center gap-8 mb-16">
                <FileSpreadsheet size={24} />
                <div>
                  <h4>{file.name}</h4>
                  <p className="text-sm text-secondary">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>

              {isUploading && (
                <div className="flex items-center gap-8">
                  <div className="spinner"></div>
                  <span>Processing file...</span>
                </div>
              )}

              {error && (
                <div className="status status--error">
                  <XCircle size={16} />
                  {error}
                </div>
              )}

              {preview.length > 0 && (
                <div className="status status--success">
                  <CheckCircle size={16} />
                  Found {preview.length} valid leads
                </div>
              )}
            </div>
          )}

          {preview.length > 0 && (
            <FilePreview 
              data={preview}
              onConfirm={confirmUpload}
              onCancel={resetUpload}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default UploadSection;
