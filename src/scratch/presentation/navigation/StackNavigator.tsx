import React from 'react';
import {

  StackScreenProps,
  createStackNavigator,
} from '@react-navigation/stack';

import { ROUTES } from './routes';
import { View } from 'react-native';

const Stack = createStackNavigator();

const handlers = {
  HomeScreen: () => <ROUTES.Home.HomeScreen.screen />,
  BottomTabNavigator: () => <ROUTES.Navigator.BottomTabNavigator.screen />,
};

export type RootParamList = {
  [key: string]: { params: any };
};

export interface NavigationProps extends StackScreenProps<RootParamList> { }

export const StackNavigator = () => {

  return (
    <View style={{ flex: 1 }}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {Object.entries(handlers).map(([screen, component]) => (
          <Stack.Screen name={screen} key={screen} component={component} />
        ))}
      </Stack.Navigator>
    </View>
  );
};
