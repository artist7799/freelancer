import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, CheckCircle, Info, X } from 'lucide-react';
import { useGlobalStore } from '../../store/useGlobalStore';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useGlobalStore();

  const iconMap = {
    success: <CheckCircle className="w-5 h-5 text-success" />,
    error: <AlertCircle className="w-5 h-5 text-danger" />,
    warning: <AlertCircle className="w-5 h-5 text-warning" />,
    info: <Info className="w-5 h-5 text-accent" />,
  };

  const bgBorderMap = {
    success: 'border-success/20 bg-success/5 text-success-content',
    error: 'border-danger/20 bg-danger/5 text-danger-content',
    warning: 'border-warning/20 bg-warning/5 text-warning-content',
    info: 'border-accent/20 bg-accent/5 text-accent-content',
  };

  return (
    <div className="fixed top-24 right-4 z-50 flex flex-col gap-2 w-full max-w-sm pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            layout
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9, transition: { duration: 0.15 } }}
            className={`pointer-events-auto flex items-start gap-3 p-4 rounded-xl border glass shadow-lg ${
              bgBorderMap[toast.type]
            }`}
          >
            <div className="mt-0.5">{iconMap[toast.type]}</div>
            <p className="flex-1 text-sm font-medium text-app-text">{toast.message}</p>
            <button
              onClick={() => removeToast(toast.id)}
              className="p-0.5 rounded-lg text-app-muted hover:text-app-text transition-all"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
export default ToastContainer;
