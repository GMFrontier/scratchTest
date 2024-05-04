import * as React from 'react';

import ContextProvider from './src/core/presentation/contexts/ContextProvider';
import { NavigationContainer, createNavigationContainerRef } from '@react-navigation/native';
import { StackNavigator } from './src/scratch/presentation/navigation/StackNavigator';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const AppState = ({ children }: any) => {
  return <ContextProvider>{children}</ContextProvider>;
};

const App = () => {
  const navigationRef = createNavigationContainerRef();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AppState>
        <NavigationContainer
          ref={navigationRef}
          onReady={() => { }} >
          <StackNavigator />
        </NavigationContainer>
      </AppState>
    </GestureHandlerRootView>
  );
};

export default App;