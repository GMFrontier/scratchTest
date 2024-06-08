import {
  StackScreenProps,
  createStackNavigator,
} from '@react-navigation/stack';
import { ROUTES } from './routes';
import { ThemeContext } from '../../core/presentation/contexts/theme/ThemeContext';
import { useContext } from 'react';
import { DefaultTheme, NavigationContainer, createNavigationContainerRef } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

const handlers = {
  SplashScreen: () => <ROUTES.Splash.SplashScreen.screen />,
  OnBoardingScreen: () => <ROUTES.OnBoarding.OnBoardingScreen.screen />,

  LoginScreen: () => <ROUTES.Auth.LoginScreen.screen />,
  PinScreen: () => <ROUTES.Auth.PinScreen.screen />,
  RecoverPinScreen: () => <ROUTES.Auth.RecoverPinScreen.screen />,
  RecoverPinEmailValidationScreen: () => <ROUTES.Auth.RecoverPinEmailValidationScreen.screen />,
  RecoverPinCreateScreen: () => <ROUTES.Auth.RecoverPinCreateScreen.screen />,
  RegisterScreen: () => <ROUTES.Auth.RegisterScreen.screen />,
  RegisterFormScreen: () => <ROUTES.Auth.RegisterFormScreen.screen />,
  RegisterPhoneValidationScreen: () => <ROUTES.Auth.RegisterPhoneValidationScreen.screen />,
  RegisterEmailValidationScreen: () => <ROUTES.Auth.RegisterEmailValidationScreen.screen />,
  RegisterAddressScreen: () => <ROUTES.Auth.RegisterAddressScreen.screen />,
  RegisterFinancialScreen: () => <ROUTES.Auth.RegisterFinancialScreen.screen />,
  RegisterIdValidationScreen: () => <ROUTES.Auth.RegisterIdValidationScreen.screen />,
  RegisterStepsScreen: () => <ROUTES.Auth.RegisterStepsScreen.screen />,
  RegisterIncomeScreen: () => <ROUTES.Auth.RegisterIncomeScreen.screen />,
  RegisterCompleteScreen: () => <ROUTES.Auth.RegisterCompleteScreen.screen />,
  SelectPhoneFlagScreen: (params: any) => <ROUTES.Auth.SelectPhoneFlagScreen.screen {...params} />,

  BottomTabNavigator: () => <ROUTES.Navigator.BottomTabNavigator.screen />,
  HomeScreen: () => <ROUTES.Home.HomeScreen.screen />,
};

export type RootParamList = {
  [key: string]: { params: any };
};

const Stack = createStackNavigator<RootParamList>();

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
  // const config: TransitionSpec = {
  //   animation: 'spring',
  //   config: {
  //     stiffness: 1000,
  //     damping: 500,
  //     mass: 2,
  //     overshootClamping: true,
  //     restDisplacementThreshold: 0.01,
  //     restSpeedThreshold: 0.01,
  //   },
  // };
  return (
    <NavigationContainer
      ref={navigationRef}
      theme={MyTheme}
      onReady={() => { }} >
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
        <Stack.Navigator
          screenOptions={{
            headerShown: false, animationTypeForReplace: "pop",
            // transitionSpec: {
            //   open: config,
            //   close: config,
            // },
          }}>
          {Object.entries(handlers).map(([screen, component]) => (
            <Stack.Screen name={screen} key={screen} component={component} />
          ))}
        </Stack.Navigator>
      </SafeAreaView>
    </NavigationContainer>

  );
};
