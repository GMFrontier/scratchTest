
import BottomTabNavigator from '../../../core/presentation/components/navigation/BottomTabNavigator';
import { HomeScreen } from '../modules/logged_in/HomeScreen';
import { OnBoardingScreen } from '../modules/logged_out/OnBoardingScreen';

export const ROUTES = {
  Navigator: {
    BottomTabNavigator: { screen: BottomTabNavigator, name: 'BottomTabNavigator' },
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
