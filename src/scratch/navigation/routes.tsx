
import BottomTabNavigator from '../../core/presentation/components/navigation/BottomTabNavigator';
import { LoginScreen } from '../auth/presentation/login/LoginScreen';
import { PasswordScreen } from '../auth/presentation/login/PasswordScreen';
import { HomeScreen } from '../home/presentation/HomeScreen';
import { OnBoardingScreen } from '../onboarding/OnBoardingScreen';
import { SplashScreen } from '../splash/presentation/SplashScreen';
import { CardsScreen } from '../settings/presentation/CardsScreen';
import { SettingsScreen } from '../cards/presentation/SettingsScreen';
import { RecoverPasswordScreen } from '../auth/presentation/recover_pin/RecoverPasswordScreen';
import { RecoverPasswordEmailValidationScreen } from '../auth/presentation/recover_pin/RecoverPasswordEmailValidationScreen';
import { RecoverPasswordCreateScreen } from '../auth/presentation/recover_pin/RecoverPasswordCreateScreen';
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
import { MovementsScreen } from '../home/presentation/movements/MovementsScreen';
import { DetailsScreen } from '../home/presentation/movements/DetailsScreen';
import { EditCategoryScreen } from '../home/presentation/movements/EditCategoryScreen';
import { AddCommentScreen } from '../home/presentation/movements/AddCommentScreen';

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
    PasswordScreen: { screen: PasswordScreen, name: 'PasswordScreen' },
    RecoverPasswordScreen: { screen: RecoverPasswordScreen, name: 'RecoverPasswordScreen' },
    RecoverPasswordEmailValidationScreen: { screen: RecoverPasswordEmailValidationScreen, name: 'RecoverPasswordEmailValidationScreen' },
    RecoverPasswordCreateScreen: { screen: RecoverPasswordCreateScreen, name: 'RecoverPasswordCreateScreen' },
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
    MovementsScreen: { screen: MovementsScreen, name: 'MovementsScreen' },
    DetailsScreen: { screen: DetailsScreen, name: 'DetailsScreen' },
    EditCategoryScreen: { screen: EditCategoryScreen, name: 'EditCategoryScreen' },
    AddCommentScreen: { screen: AddCommentScreen, name: 'AddCommentScreen' },
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
