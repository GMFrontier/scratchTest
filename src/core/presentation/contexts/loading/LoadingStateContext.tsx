import React, {createContext, useContext, useState} from 'react';
import {View, StyleSheet, StatusBar, ActivityIndicator} from 'react-native';
import {ThemeContext} from '../theme/ThemeContext';

export const LoadingStateContext = createContext({
  isLoading: false,
  setLoading: (isLoading: boolean) => {},
});

const LoadingStateProvider = ({children}: any) => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    theme: {colors},
  } = useContext(ThemeContext);

  const setLoading = (isLoading: boolean) => {
    setIsLoading(isLoading);
  };

  return (
    <LoadingStateContext.Provider value={{isLoading, setLoading}}>
      {isLoading && (
        <View style={style.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      )}
      {children}
    </LoadingStateContext.Provider>
  );
};

const style = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
});

export default LoadingStateProvider;
