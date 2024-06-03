import React, { createContext, useContext, useState } from 'react';
import { View, StatusBar as RNStatusBar, StatusBarProps, StatusBarStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { ThemeContext } from '../theme/ThemeContext';

interface StatusBarContextType {
  setPrimaryStatusBar: () => void;
  setToolbarStatusBar: () => void;
  setHomeStatusBar: () => void;
}

const StatusBarContext = createContext<StatusBarContextType | undefined>(undefined);

export const StatusBarProvider = ({ children }: any) => {
  const {
    theme: { colors },
  } = useContext(ThemeContext);

  const [statusBarStyle, setStatusBarStyle] = useState<StatusBarStyle>('light-content');
  const [statusBarBackgroundColor, setStatusBarBackgroundColor] = useState<string | undefined>(undefined);

  const setToolbarStatusBar = () => {
    setStatusBarBackgroundColor(colors.accentSecondary)
    setStatusBarStyle("light-content")
  }

  const setPrimaryStatusBar = () => {
    setStatusBarBackgroundColor(colors.primary)
    setStatusBarStyle("light-content")
  }

  const setHomeStatusBar = () => {
    setStatusBarBackgroundColor("#254298")
    setStatusBarStyle("light-content")
  }

  const insets = useSafeAreaInsets();

  const statusBarProps: StatusBarProps = {
    animated: true,
    backgroundColor: statusBarBackgroundColor,
    barStyle: statusBarStyle,
  };

  return (
    <StatusBarContext.Provider value={{ setPrimaryStatusBar, setToolbarStatusBar, setHomeStatusBar }}>
      <View style={{ height: insets.top, backgroundColor: statusBarBackgroundColor }}>
        <RNStatusBar {...statusBarProps} />
      </View>
      {children}
    </StatusBarContext.Provider>
  );
};

export const useStatusBar = () => {
  const context = useContext(StatusBarContext);
  if (!context) {
    throw new Error('useStatusBar must be used within a StatusBarProvider');
  }
  return context;
};