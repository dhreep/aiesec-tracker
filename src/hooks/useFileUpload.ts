import { useState, useCallback } from 'react';
import Papa from 'papaparse';
import { Lead, UploadState } from '@/types';

interface UseFileUploadProps {
  onUploadComplete: (leads: Lead[]) => void;
}

export const useFileUpload = ({ onUploadComplete }: UseFileUploadProps) => {
  const [uploadState, setUploadState] = useState<UploadState>({
    file: null,
    preview: [],
    isUploading: false,
    error: null
  });

  const handleFileSelect = useCallback((file: File | null) => {
    if (!file) return;
    
    const allowedTypes = [
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'text/csv'
    ];
    
    if (!allowedTypes.includes(file.type)) {
      setUploadState(prev => ({
        ...prev,
        error: 'Please upload a valid Excel or CSV file'
      }));
      return;
    }

    setUploadState(prev => ({
      ...prev,
      file,
      error: null,
      isUploading: true
    }));

    // Parse the file
    Papa.parse<Record<string, string>>(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        if (results.errors.length > 0) {
          setUploadState(prev => ({
            ...prev,
            error: 'Error parsing file: ' + results.errors[0].message,
            isUploading: false
          }));
          return;
        }

        // Transform data to match our schema
        const transformedData: Lead[] = results.data.map((row, index) => ({
          id: Date.now() + index,
          name: row.name || row.Name || '',
          phone: row.phone || row.Phone || row.mobile || row.Mobile || '',
          college: row.college || row.College || row.institution || row.Institution || '',
          signup_date: row.signup_date || row['Signup Date'] || new Date().toISOString(),
          date_of_birth: row.date_of_birth || row['Date of Birth'] || row.dob || row.DOB || new Date('1990-01-01').toISOString(),
          status: 'new' as const,
          comments: ''
        })).filter(lead => lead.name && lead.phone); // Filter out incomplete records

        setUploadState(prev => ({
          ...prev,
          preview: transformedData,
          isUploading: false
        }));
      },
      error: (error: Error) => {
        setUploadState(prev => ({
          ...prev,
          error: 'Failed to parse file: ' + error.message,
          isUploading: false
        }));
      }
    });
  }, []);

  const confirmUpload = useCallback(() => {
    if (uploadState.preview.length > 0) {
      onUploadComplete(uploadState.preview);
      resetUpload();
    }
  }, [uploadState.preview, onUploadComplete]);

  const resetUpload = useCallback(() => {
    setUploadState({
      file: null,
      preview: [],
      isUploading: false,
      error: null
    });
  }, []);

  return {
    ...uploadState,
    handleFileSelect,
    confirmUpload,
    resetUpload
  };
};
