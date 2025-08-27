import React, { createContext, useContext, useState, ReactNode } from 'react';
import { ToastType } from '@/types';
import Toast from '@/components/toast/Toast';

interface ToastContextType {
  showToast: (message: string, type?: ToastType['type'], duration?: number) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

interface ToastProviderProps {
  children: ReactNode;
}

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastType[]>([]);

  const showToast = (
    message: string, 
    type: ToastType['type'] = 'info', 
    duration: number = 3000
  ): void => {
    const id = Date.now().toString();
    const newToast: ToastType = { id, message, type, duration };
    
    setToasts(prev => [...prev, newToast]);

    setTimeout(() => {
      setToasts(prev => prev.filter(toast => toast.id !== id));
    }, duration);
  };

  const removeToast = (id: string): void => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="toast-container">
        {toasts.map(toast => (
          <Toast key={toast.id} toast={toast} onRemove={removeToast} />
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
