import { createContext, useContext, useState } from 'react';
import { View, StyleSheet, StatusBar, ActivityIndicator } from 'react-native';
import { ThemeContext } from '../theme/ThemeContext';
import * as Progress from 'react-native-progress';
import ProgressCircle from 'react-native-progress/Circle';

export const LoadingStateContext = createContext({
  isLoading: false,
  setLoading: (isLoading: boolean) => { },
});

const LoadingStateProvider = ({ children }: any) => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    theme: { colors },
  } = useContext(ThemeContext);

  const setLoading = (isLoading: boolean) => {
    setIsLoading(isLoading);
  };

  return (
    <LoadingStateContext.Provider value={{ isLoading, setLoading }}>
      {isLoading && (
        <View style={style.loadingContainer}>
          {/* <ActivityIndicator
            size="large"
            color={"#8FABFF"} /> */}
          <View
            style={{ position: "absolute" }}>
            <ProgressCircle
              size={45}
              progress={1}
              fill={"transparent"}
              borderWidth={3}
              color={"#D7DAE0"}
              indeterminate={false}
              animated={false} />
          </View>
          <ProgressCircle
            size={45}
            progress={1}
            fill={"transparent"}
            borderWidth={6}
            color={"#8FABFF"}
            endAngle={.25}
            indeterminate={true} />
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
    backgroundColor: 'rgba(38, 49, 55, 0.5)',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
});

export default LoadingStateProvider;
