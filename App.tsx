import * as React from 'react';

import ContextProvider from './src/core/presentation/contexts/ContextProvider';
import { StackNavigator } from './src/scratch/navigation/StackNavigator';

const AppState = ({ children }: any) => {
  return <ContextProvider>{children}</ContextProvider>;
};

const App = () => {

  return (
    <AppState>
      <StackNavigator />
    </AppState>
  );
};

export default App;