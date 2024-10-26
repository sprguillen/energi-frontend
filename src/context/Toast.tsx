import React, { createContext } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { ToastContextProps } from '../interfaces';
import 'react-toastify/dist/ReactToastify.css';

export const ToastContext = createContext('');

export const ToastProvider: React.FC<ToastContextProps> = ({ children }) => {
  const showSuccess = (message: string) => {
    toast.success(message);
  };

  const showError = (message: string) => {
    toast.error(message);
  };

  const showInfo = (message: string) => {
    toast.info(message);
  };

  const showWarning = (message: string) => {
    toast.warn(message);
  };

  return (
    <ToastContext.Provider value={{ showSuccess, showError, showInfo, showWarning }}>
      {children}
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </ToastContext.Provider>
  );
};
