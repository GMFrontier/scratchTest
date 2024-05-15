import {
  StackScreenProps,
  createStackNavigator,
} from '@react-navigation/stack';

import { ROUTES } from './routes';
import { View } from 'react-native';
import { ThemeContext } from '../../core/presentation/contexts/theme/ThemeContext';
import { useContext } from 'react';
import { DefaultTheme, NavigationContainer, createNavigationContainerRef } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Stack = createStackNavigator();

const handlers = {
  SplashScreen: () => <ROUTES.Splash.SplashScreen.screen />,
  OnBoardingScreen: () => <ROUTES.OnBoarding.OnBoardingScreen.screen />,
  LoginScreen: () => <ROUTES.Login.LoginScreen.screen />,
  PinScreen: () => <ROUTES.Login.PinScreen.screen />,
  HomeScreen: () => <ROUTES.Home.HomeScreen.screen />,
  BottomTabNavigator: () => <ROUTES.Navigator.BottomTabNavigator.screen />,
};

export type RootParamList = {
  [key: string]: { params: any };
};

export interface NavigationProps extends StackScreenProps<RootParamList> { }

export const StackNavigator = () => {
  const navigationRef = createNavigationContainerRef();

  const {
    theme: { colors },
  } = useContext(ThemeContext);

  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: 'rgb(255, 45, 85)',
      background: colors.accent,
    },
  };


  return (
    <NavigationContainer
      ref={navigationRef}
      theme={MyTheme}
      onReady={() => { }} >
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {Object.entries(handlers).map(([screen, component]) => (
            <Stack.Screen name={screen} key={screen} component={component} />
          ))}
        </Stack.Navigator>
      </SafeAreaView>
    </NavigationContainer>

  );
};
