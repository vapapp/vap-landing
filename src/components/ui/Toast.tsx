"use client";

import { useEffect } from 'react';
import styles from './Toast.module.css';

interface ToastProps {
  message: string;
  onClose: () => void;
  duration?: number;
}

const Toast = ({ message, onClose, duration = 5000 }: ToastProps) => {
  
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  return (
    <div className={styles.toastContainer}>
      <div className={styles.toastIcon}>
        {/* Ícone de alerta */}
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="8" x2="12" y2="12"></line>
          <line x1="12" y1="16" x2="12.01" y2="16"></line>
        </svg>
      </div>
      <p className={styles.toastMessage}>{message}</p>
      <button onClick={onClose} className={styles.closeButton}>
        {/* Ícone de fechar */}
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    </div>
  );
};

export default Toast;