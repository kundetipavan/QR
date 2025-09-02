import React, { useEffect } from 'react';
import { CheckCircle, XCircle, Info, X } from 'lucide-react';
import { useApp } from '../contexts/AppContext';

export function Toast() {
  const { toasts, dispatch } = useApp();

  return (
    <div className="fixed bottom-20 md:top-20 left-4 right-4 md:right-4 md:left-auto z-50 space-y-2">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} dispatch={dispatch} />
      ))}
    </div>
  );
}

function ToastItem({ toast, dispatch }) {
  const { id, message, type, duration } = toast;

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        dispatch({ type: 'REMOVE_TOAST', payload: id });
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [id, duration, dispatch]);

  const getIcon = () => {
    switch (type) {
      case 'success': return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'error': return <XCircle className="h-5 w-5 text-red-500" />;
      default: return <Info className="h-5 w-5 text-blue-500" />;
    }
  };

  const getBgColor = () => {
    switch (type) {
      case 'success': return 'bg-green-50 border-green-200';
      case 'error': return 'bg-red-50 border-red-200';
      default: return 'bg-blue-50 border-blue-200';
    }
  };

  return (
    <div className={`flex items-center p-4 rounded-lg border shadow-lg w-full md:min-w-80 md:max-w-md transform transition-all duration-300 ease-in-out ${getBgColor()}`}>
      {getIcon()}
      <span className="ml-3 text-sm font-medium text-gray-900 flex-1">{message}</span>
      <button
        onClick={() => dispatch({ type: 'REMOVE_TOAST', payload: id })}
        className="ml-2 text-gray-400 hover:text-gray-600 transition-colors"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}