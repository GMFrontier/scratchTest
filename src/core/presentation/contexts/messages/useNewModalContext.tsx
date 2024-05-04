import { useContext } from 'react';
import { ModalContext } from './ModalContext';
import { ModalStateContext } from './ModalContext';


export const useNewModalContext = () => {
  const context = useContext(ModalStateContext);
  if (!context) {
    throw new Error(
      'Este context no puede ser llamado fuera del ContextProvider',
    );
  }
  return context;
};


