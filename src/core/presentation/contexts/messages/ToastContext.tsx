import React, { createContext } from 'react';

import { ToastConfig, ToastConfigParams } from 'react-native-toast-message';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import CustomInfoToast from '../../components/toast/CustomInfoToast';
import CustomAlertToast from '../../components/toast/CustomAlertToast';
import CustomMessageToast from '../../components/toast/CustomMessageToast';
import CustomToastComponent from '../../components/toast/CustomToastComponent';

enum ToastTye {
  INFO = 'customInfo',
  ALERT = 'customAlert',
  MESSAGE = 'customMessage',
  CUSTOM_TOAST = 'customToastComponent',
}

export enum ToastStyleType {
  SUCCESS = 'SUCCESS',
  WARNING = 'WARNING',
  INFORMATIOM = 'INFORMATIOM',
  ERROR = 'ERROR',
  NEUTRAL = 'NEUTRAL',
}


interface ToastContextProps {
  showInfoToast: (message: string) => void;
  showAlertToast: (message: string, onPress?: () => void) => void;
  showMessageToast: (message: string, textClick?: string, onPress?: () => void) => void;
  showCustomToastComponent: (message: string, type?: ToastStyleType) => void;
}

const toastConfig: ToastConfig = {

  customInfo: (params: ToastConfigParams<any>) => (
    <CustomInfoToast label={params.text1 || ''} />
  ),
  customAlert: (params: ToastConfigParams<any>) => (
    <CustomAlertToast
      label={params.text1 || ''}
      onPress={params.onPress}
    />
  ),
  customMessage: (params: ToastConfigParams<any>) => (
    <CustomMessageToast
      label={params.text1 || ''}
      labelClick={params.text2 || ''}
      onPress={params.onPress}
    />
  ),
  customToastComponent: (params: ToastConfigParams<any>) => (



    <CustomToastComponent
      label={params.text1 || ''}
      labelClick={params.text2 || ''}
      params={params.props}
      onPress={params.onPress}
    />
  )
};

export const ToastContext = createContext({} as ToastContextProps);

export const ToastContextProvider = ({ children }: any) => {
  const showInfoToast = (message: string) => {
    Toast.show({ type: ToastTye.CUSTOM_TOAST, text1: message });
  };

  const showAlertToast = (message: string, onPress?: () => void) => {
    Toast.show({ type: ToastTye.ALERT, text1: message, onPress: onPress });
  };

  const showMessageToast = (message: string, textClick?: string, onPress?: () => void) => {
    Toast.show({ type: ToastTye.MESSAGE, text1: message, text2: textClick, onPress: onPress });
  };

  const showCustomToastComponent = (message: string, typeToast?: ToastStyleType) => {
    Toast.show({ type: ToastTye.CUSTOM_TOAST, text1: message, props: typeToast });
  };



  return (
    <ToastContext.Provider
      value={{ showInfoToast, showAlertToast, showMessageToast, showCustomToastComponent }}>
      {children}
      <Toast config={toastConfig} />
    </ToastContext.Provider>
  );
};
