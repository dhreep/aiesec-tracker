export interface Lead {
  id: number;
  name: string;
  phone: string;
  college: string;
  signup_date: string;
  date_of_birth: string;
  status: LeadStatus;
  comments: string;
}

export type LeadStatus = 'new' | 'uncontacted' | 'accepted' | 'rejected';

export interface LeadWithCalculations extends Lead {
  age: number;
  freshness: number;
}

export interface UploadState {
  file: File | null;
  preview: Lead[];
  isUploading: boolean;
  error: string | null;
}

export interface LeadsContextType {
  state: LeadsState;
  dispatch: React.Dispatch<LeadsAction>;
}

export interface LeadsState {
  leads: Lead[];
  selectedLead: Lead | null;
  sortColumn: string | null;
  sortDirection: 'asc' | 'desc';
}

export type LeadsAction =
  | { type: 'SET_LEADS'; payload: Lead[] }
  | { type: 'ADD_LEADS'; payload: Lead[] }
  | { type: 'UPDATE_LEAD'; payload: { id: number; updates: Partial<Lead> } }
  | { type: 'DELETE_LEAD'; payload: number }
  | { type: 'SET_SELECTED_LEAD'; payload: Lead | null }
  | { type: 'SET_SORT'; payload: { column: string; direction: 'asc' | 'desc' } };

export interface ToastType {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
  duration?: number;
}

export interface MetricData {
  totalLeads: number;
  conversionRate: number;
  averageAge: number;
  recentActivity: number;
}
