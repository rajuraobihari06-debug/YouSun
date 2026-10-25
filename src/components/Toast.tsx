import React from 'react';
import { CheckCircle, Info, AlertTriangle } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Toast: React.FC = () => {
  const { toast } = useApp();

  if (!toast) return null;

  return (
    <div className="fixed bottom-6 left-6 z-50 flex items-center gap-3 px-4 py-3 rounded-xl bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 shadow-2xl border border-neutral-700/50 dark:border-neutral-200 text-xs font-medium animate-in slide-in-from-bottom-5 duration-200 select-none">
      {toast.type === 'success' && <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />}
      {toast.type === 'warning' && <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0" />}
      {(!toast.type || toast.type === 'info') && <Info className="w-4 h-4 text-blue-500 shrink-0" />}
      <span>{toast.message}</span>
    </div>
  );
};
