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
  PasswordScreen: (params: any) => <ROUTES.Auth.PasswordScreen.screen {...params} />,
  RecoverPasswordScreen: (params: any) => <ROUTES.Auth.RecoverPasswordScreen.screen {...params} />,
  RecoverPasswordEmailValidationScreen: () => <ROUTES.Auth.RecoverPasswordEmailValidationScreen.screen />,
  RecoverPasswordCreateScreen: () => <ROUTES.Auth.RecoverPasswordCreateScreen.screen />,
  RegisterScreen: () => <ROUTES.Auth.RegisterScreen.screen />,
  RegisterFormScreen: () => <ROUTES.Auth.RegisterFormScreen.screen />,
  RegisterPhoneValidationScreen: () => <ROUTES.Auth.RegisterPhoneValidationScreen.screen />,
  RegisterEmailValidationScreen: () => <ROUTES.Auth.RegisterEmailValidationScreen.screen />,
  RegisterAddressScreen: () => <ROUTES.Auth.RegisterAddressScreen.screen />,
  RegisterFinancialScreen: (params: any) => <ROUTES.Auth.RegisterFinancialScreen.screen {...params} />,
  RegisterIdValidationScreen: () => <ROUTES.Auth.RegisterIdValidationScreen.screen />,
  RegisterStepsScreen: () => <ROUTES.Auth.RegisterStepsScreen.screen />,
  RegisterIncomeScreen: () => <ROUTES.Auth.RegisterIncomeScreen.screen />,
  RegisterCompleteScreen: () => <ROUTES.Auth.RegisterCompleteScreen.screen />,
  SelectPhoneFlagScreen: (params: any) => <ROUTES.Auth.SelectPhoneFlagScreen.screen {...params} />,

  BottomTabNavigator: () => <ROUTES.Navigator.BottomTabNavigator.screen />,
  HomeScreen: () => <ROUTES.Home.HomeScreen.screen />,
  MovementsScreen: () => <ROUTES.Home.MovementsScreen.screen />,
  DetailsScreen: () => <ROUTES.Home.DetailsScreen.screen />,
  EditCategoryScreen: () => <ROUTES.Home.EditCategoryScreen.screen />,
  AddCommentScreen: () => <ROUTES.Home.AddCommentScreen.screen />,

  ProfileScreen: () => <ROUTES.Settings.ProfileScreen.screen />,
  SettingsScreen: () => <ROUTES.Settings.SettingsScreen.screen />,
  AboutUsScreen: () => <ROUTES.Settings.AboutUsScreen.screen />,
  PrivactPolicyScreen: () => <ROUTES.Settings.PrivactPolicyScreen.screen />,
  TyCScreen: () => <ROUTES.Settings.TyCScreen.screen />,
  FAQScreen: () => <ROUTES.Settings.FAQScreen.screen />,
  SupportScreen: () => <ROUTES.Settings.SupportScreen.screen />,

  CardsScreen: () => <ROUTES.Cards.CardsScreen.screen />,

  PointsScreen: () => <ROUTES.Points.PointsScreen.screen />,

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
