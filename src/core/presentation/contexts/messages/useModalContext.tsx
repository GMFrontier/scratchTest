import {useContext} from 'react';
import { ModalContext } from './ModalContext';

export const useModalContext = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error(
      'Este context no puede ser llamado fuera del ContextProvider',
    );
  }
  return context;
};
