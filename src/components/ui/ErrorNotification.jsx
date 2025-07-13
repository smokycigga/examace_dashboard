import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../AppIcon';
import Button from './Button';

const ErrorNotification = ({ 
  show, 
  onClose, 
  title = "Something went wrong", 
  message = "An unexpected error occurred. Please try again.", 
  type = "error",
  actionLabel = null,
  onAction = null,
  autoHide = false,
  duration = 5000 
}) => {
  const [isVisible, setIsVisible] = useState(show);

  useEffect(() => {
    setIsVisible(show);
    
    if (show && autoHide) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        onClose?.();
      }, duration);
      
      return () => clearTimeout(timer);
    }
  }, [show, autoHide, duration, onClose]);

  const getTypeStyles = () => {
    switch (type) {
      case 'warning':
        return {
          bg: 'bg-warning-50',
          border: 'border-warning-200',
          icon: 'AlertTriangle',
          iconColor: 'text-warning-600',
          titleColor: 'text-warning-800',
          messageColor: 'text-warning-700'
        };
      case 'info':
        return {
          bg: 'bg-blue-50',
          border: 'border-blue-200',
          icon: 'Info',
          iconColor: 'text-blue-600',
          titleColor: 'text-blue-800',
          messageColor: 'text-blue-700'
        };
      case 'success':
        return {
          bg: 'bg-success-50',
          border: 'border-success-200',
          icon: 'CheckCircle',
          iconColor: 'text-success-600',
          titleColor: 'text-success-800',
          messageColor: 'text-success-700'
        };
      default: // error
        return {
          bg: 'bg-danger-50',
          border: 'border-danger-200',
          icon: 'AlertCircle',
          iconColor: 'text-danger-600',
          titleColor: 'text-danger-800',
          messageColor: 'text-danger-700'
        };
    }
  };

  const styles = getTypeStyles();

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -50, scale: 0.95 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed top-4 right-4 z-50 max-w-md"
        >
          <div className={`${styles.bg} ${styles.border} border rounded-academic-lg shadow-academic-lg p-4`}>
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <Icon 
                  name={styles.icon} 
                  size={20} 
                  className={styles.iconColor}
                />
              </div>
              
              <div className="flex-1 min-w-0">
                <h4 className={`text-sm font-semibold ${styles.titleColor} mb-1`}>
                  {title}
                </h4>
                <p className={`text-sm ${styles.messageColor}`}>
                  {message}
                </p>
                
                {actionLabel && onAction && (
                  <div className="mt-3">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={onAction}
                      className="text-xs"
                    >
                      {actionLabel}
                    </Button>
                  </div>
                )}
              </div>
              
              <div className="flex-shrink-0">
                <button
                  onClick={() => {
                    setIsVisible(false);
                    onClose?.();
                  }}
                  className={`${styles.messageColor} hover:${styles.titleColor} transition-colors`}
                >
                  <Icon name="X" size={16} />
                </button>
              </div>
            </div>
            
            {autoHide && (
              <div className="mt-2">
                <motion.div
                  initial={{ width: "100%" }}
                  animate={{ width: "0%" }}
                  transition={{ duration: duration / 1000, ease: "linear" }}
                  className={`h-1 ${styles.border.replace('border-', 'bg-')} rounded-full`}
                />
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ErrorNotification;