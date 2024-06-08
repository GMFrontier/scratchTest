
import BottomTabNavigator from '../../core/presentation/components/navigation/BottomTabNavigator';
import { LoginScreen } from '../auth/presentation/login/LoginScreen';
import { PinScreen } from '../auth/presentation/login/PinScreen';
import { HomeScreen } from '../home/presentation/HomeScreen';
import { OnBoardingScreen } from '../onboarding/OnBoardingScreen';
import { SplashScreen } from '../splash/presentation/SplashScreen';
import { CardsScreen } from '../settings/presentation/CardsScreen';
import { SettingsScreen } from '../cards/presentation/SettingsScreen';
import { RecoverPinScreen } from '../auth/presentation/recover_pin/RecoverPinScreen';
import { RecoverPinEmailValidationScreen } from '../auth/presentation/recover_pin/RecoverPinEmailValidationScreen';
import { RecoverPinCreateScreen } from '../auth/presentation/recover_pin/RecoverPinCreateScreen';
import { RegisterScreen } from '../auth/presentation/register/RegisterScreen';
import { RegisterFormScreen } from '../auth/presentation/register/RegisterFormScreen';
import { RegisterPhoneValidationScreen } from '../auth/presentation/register/RegisterPhoneValidationScreen';
import { RegisterEmailValidationScreen } from '../auth/presentation/register/RegisterEmailValidationScreen';
import { RegisterAddressScreen } from '../auth/presentation/register/RegisterAddressScreen';
import { RegisterFinancialScreen } from '../auth/presentation/register/RegisterFinancialScreen';
import { RegisterIdValidationScreen } from '../auth/presentation/register/RegisterIdValidationScreen';
import { RegisterStepsScreen } from '../auth/presentation/register/RegisterStepsScreen';
import { RegisterIncomeScreen } from '../auth/presentation/register/RegisterIncomeScreen';
import { RegisterCompleteScreen } from '../auth/presentation/register/RegisterCompleteScreen';
import SelectPhoneFlagScreen from '../auth/presentation/register/SelectPhoneFlagScreen';

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
    RegisterScreen: { screen: RegisterScreen, name: 'RegisterScreen' },
    RegisterFormScreen: { screen: RegisterFormScreen, name: 'RegisterFormScreen' },
    RegisterPhoneValidationScreen: { screen: RegisterPhoneValidationScreen, name: 'RegisterPhoneValidationScreen' },
    RegisterEmailValidationScreen: { screen: RegisterEmailValidationScreen, name: 'RegisterEmailValidationScreen' },
    RegisterAddressScreen: { screen: RegisterAddressScreen, name: 'RegisterAddressScreen' },
    RegisterFinancialScreen: { screen: RegisterFinancialScreen, name: 'RegisterFinancialScreen' },
    RegisterIdValidationScreen: { screen: RegisterIdValidationScreen, name: 'RegisterIdValidationScreen' },
    RegisterStepsScreen: { screen: RegisterStepsScreen, name: 'RegisterStepsScreen' },
    RegisterIncomeScreen: { screen: RegisterIncomeScreen, name: 'RegisterIncomeScreen' },
    RegisterCompleteScreen: { screen: RegisterCompleteScreen, name: 'RegisterCompleteScreen' },
    SelectPhoneFlagScreen: { screen: SelectPhoneFlagScreen, name: 'SelectPhoneFlagScreen' },
  },
  OnBoarding: {
    OnBoardingScreen: { screen: OnBoardingScreen, name: 'OnBoardingScreen' },
  },
  Settings: {
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
