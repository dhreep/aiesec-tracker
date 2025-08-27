import React, { useEffect } from 'react';
import { X, CheckCircle, XCircle, Info, AlertTriangle } from 'lucide-react';
import { ToastType } from '@/types';

interface ToastProps {
  toast: ToastType;
  onRemove: (id: string) => void;
}

const Toast: React.FC<ToastProps> = ({ toast, onRemove }) => {
  useEffect(() => {
    if (toast.duration) {
      const timer = setTimeout(() => {
        onRemove(toast.id);
      }, toast.duration);

      return () => clearTimeout(timer);
    }
  }, [toast.id, toast.duration, onRemove]);

  const getIcon = () => {
    switch (toast.type) {
      case 'success':
        return <CheckCircle size={16} />;
      case 'error':
        return <XCircle size={16} />;
      case 'warning':
        return <AlertTriangle size={16} />;
      default:
        return <Info size={16} />;
    }
  };

  return (
    <div className={`toast ${toast.type}`}>
      <div className="flex items-center gap-8">
        {getIcon()}
        <span>{toast.message}</span>
        <button 
          onClick={() => onRemove(toast.id)}
          className="btn btn--sm"
        >
          <X size={14} />
        </button>
      </div>
    </div>
  );
};

export default Toast;
