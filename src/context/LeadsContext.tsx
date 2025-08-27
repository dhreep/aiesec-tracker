import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { Lead, LeadsState, LeadsAction, LeadsContextType } from '@/types';
import { initialLeads } from '@/data/initialData';

const LeadsContext = createContext<LeadsContextType | undefined>(undefined);

const leadsReducer = (state: LeadsState, action: LeadsAction): LeadsState => {
  switch (action.type) {
    case 'SET_LEADS':
      return { ...state, leads: action.payload };
    
    case 'ADD_LEADS':
      return { 
        ...state, 
        leads: [...state.leads, ...action.payload.map(lead => ({
          ...lead,
          id: state.leads.length + Math.floor(Math.random() * 1000)
        }))] 
      };
    
    case 'UPDATE_LEAD':
      return {
        ...state,
        leads: state.leads.map(lead => 
          lead.id === action.payload.id ? { ...lead, ...action.payload.updates } : lead
        )
      };
    
    case 'DELETE_LEAD':
      return {
        ...state,
        leads: state.leads.filter(lead => lead.id !== action.payload)
      };
    
    case 'SET_SELECTED_LEAD':
      return { ...state, selectedLead: action.payload };
    
    case 'SET_SORT':
      return { 
        ...state, 
        sortColumn: action.payload.column,
        sortDirection: action.payload.direction 
      };
    
    default:
      return state;
  }
};

const initialState: LeadsState = {
  leads: initialLeads,
  selectedLead: null,
  sortColumn: null,
  sortDirection: 'asc'
};

interface LeadsProviderProps {
  children: ReactNode;
}

export const LeadsProvider: React.FC<LeadsProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(leadsReducer, initialState);

  // Save to localStorage whenever leads change
  useEffect(() => {
    localStorage.setItem('sales-tracker-leads', JSON.stringify(state.leads));
  }, [state.leads]);

  // Load from localStorage on mount
  useEffect(() => {
    const savedLeads = localStorage.getItem('sales-tracker-leads');
    if (savedLeads) {
      try {
        const parsedLeads: Lead[] = JSON.parse(savedLeads);
        dispatch({ type: 'SET_LEADS', payload: parsedLeads });
      } catch (error) {
        console.error('Error parsing saved leads:', error);
      }
    }
  }, []);

  const value: LeadsContextType = { state, dispatch };

  return (
    <LeadsContext.Provider value={value}>
      {children}
    </LeadsContext.Provider>
  );
};

export const useLeads = (): LeadsContextType => {
  const context = useContext(LeadsContext);
  if (!context) {
    throw new Error('useLeads must be used within a LeadsProvider');
  }
  return context;
};
