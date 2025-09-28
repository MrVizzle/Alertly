import React from 'react';
import { CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';

const Toast = ({ toast }) => {
  if (!toast) return null;
  
  return (
    <div className={`fixed top-6 left-4 right-4 z-50 p-4 rounded-2xl shadow-2xl transform transition-all duration-500 ${
      toast.type === 'error' 
        ? 'bg-gradient-to-r from-red-500 to-red-600' 
        : toast.type === 'success' 
        ? 'bg-gradient-to-r from-green-500 to-emerald-600' 
        : 'bg-gradient-to-r from-blue-500 to-indigo-600'
    } text-white glass`}>
      <div className="flex items-center">
        {toast.type === 'success' && <CheckCircle2 size={24} className="mr-3 flex-shrink-0" />}
        {toast.type === 'error' && <AlertCircle size={24} className="mr-3 flex-shrink-0" />}
        {toast.type === 'info' && <Sparkles size={24} className="mr-3 flex-shrink-0" />}
        <span className="font-medium">{toast.message}</span>
      </div>
    </div>
  );
};

export default Toast;