
import BottomTabNavigator from '../../core/presentation/components/navigation/BottomTabNavigator';
import { LoginScreen } from '../auth/presentation/LoginScreen';
import { PinScreen } from '../auth/presentation/PinScreen';
import { HomeScreen } from '../home/presentation/HomeScreen';
import { OnBoardingScreen } from '../onboarding/OnBoardingScreen';
import { SplashScreen } from '../splash/presentation/SplashScreen';
import { CardsScreen } from '../settings/presentation/CardsScreen';
import { SettingsScreen } from '../cards/presentation/SettingsScreen';
import { RecoverPinScreen } from '../auth/presentation/RecoverPinScreen';
import { RecoverPinEmailValidationScreen } from '../auth/presentation/RecoverPinEmailValidationScreen';
import { RecoverPinCreateScreen } from '../auth/presentation/RecoverPinCreateScreen';
import { ProfileScreen } from '../settings/presentation/ProfileScreen';

interface NavRouteModel {
  [key: string]: {
    [key: string]: {
      screen: (() => JSX.Element) | ((() => JSX.Element) & {
        displayName: string;
      })
      name: string;
    };
  };
}

export const ROUTES = {
  Navigator: {
    BottomTabNavigator: { screen: BottomTabNavigator, name: 'BottomTabNavigator' },
  },
  Splash: {
    SplashScreen: { screen: SplashScreen, name: 'SplashScreen' },
  },
  Auth: {
    LoginScreen: { screen: LoginScreen, name: 'LoginScreen' },
    PinScreen: { screen: PinScreen, name: 'PinScreen' },
    RecoverPinScreen: { screen: RecoverPinScreen, name: 'RecoverPinScreen' },
    RecoverPinEmailValidationScreen: { screen: RecoverPinEmailValidationScreen, name: 'RecoverPinEmailValidationScreen' },
    RecoverPinCreateScreen: { screen: RecoverPinCreateScreen, name: 'RecoverPinCreateScreen' },
  },
  OnBoarding: {
    OnBoardingScreen: { screen: OnBoardingScreen, name: 'OnBoardingScreen' },
  },
  Settings: {
    ProfileScreen: { screen: ProfileScreen, name: 'ProfileScreen' },
    SettingsScreen: { screen: SettingsScreen, name: 'SettingsScreen' },
  },
  Home: {
    HomeScreen: { screen: HomeScreen, name: 'HomeScreen' },
  },
  Cards: {
    CardsScreen: { screen: CardsScreen, name: 'CardsScreen' },
  },
  // Login: {
  //   SplashScreen: { screen: BottomTabNavigator, name: 'BottomTabNavigator' },
  //   SplashScreen: { screen: BottomTabNavigator, name: 'BottomTabNavigator' },
  //   SplashScreen: { screen: BottomTabNavigator, name: 'BottomTabNavigator' },
  // },
};
