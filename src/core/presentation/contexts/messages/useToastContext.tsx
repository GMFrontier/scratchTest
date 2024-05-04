import {useContext} from 'react';
import {ToastContext} from './ToastContext';

export const useToastContext = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error(
      'Este context no puede ser llamado fuera del ToastContextProvider',
    );
  }
  return context;
};
