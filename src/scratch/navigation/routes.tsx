
import BottomTabNavigator from '../../core/presentation/components/navigation/BottomTabNavigator';
import { LoginScreen } from '../auth/presentation/LoginScreen';
import { PinScreen } from '../auth/presentation/PinScreen';
import { HomeScreen } from '../home/HomeScreen';
import { OnBoardingScreen } from '../onboarding/OnBoardingScreen';
import { SplashScreen } from '../splash/presentation/SplashScreen';

export const ROUTES = {
  Navigator: {
    BottomTabNavigator: { screen: BottomTabNavigator, name: 'BottomTabNavigator' },
  },
  Splash: {
    SplashScreen: { screen: SplashScreen, name: 'SplashScreen' },
  },
  Login: {
    LoginScreen: { screen: LoginScreen, name: 'LoginScreen' },
    PinScreen: { screen: PinScreen, name: 'PinScreen' },
  },
  // Splash: {
  //   SplashScreen: { screen: SplashScreen, name: 'SplashScreen' },
  // },
  OnBoarding: {
    OnBoardingScreen: { screen: OnBoardingScreen, name: 'OnBoardingScreen' },
  },
  Settings: {
    SettingsScreen: { screen: HomeScreen, name: 'SettingsScreen' },
  },
  Home: {
    HomeScreen: { screen: HomeScreen, name: 'HomeScreen' },
  },
  Cards: {
    CardsScreen: { screen: HomeScreen, name: 'CardsScreen' },
  },
  // Login: {
  //   SplashScreen: { screen: BottomTabNavigator, name: 'BottomTabNavigator' },
  //   SplashScreen: { screen: BottomTabNavigator, name: 'BottomTabNavigator' },
  //   SplashScreen: { screen: BottomTabNavigator, name: 'BottomTabNavigator' },
  // },
};
