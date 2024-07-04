import { useContext, useEffect, useLayoutEffect } from 'react';
import { Alert, Linking, PermissionsAndroid, Platform, View } from 'react-native';
import { CommonActions, useFocusEffect, useNavigation } from '@react-navigation/native';
import { reaction } from 'mobx';
import { ThemeContext } from '../../../core/presentation/contexts/theme/ThemeContext';
import { useStatusBar } from '../../../core/presentation/contexts/statusBar/StatusBarContext';
import { ROUTES } from '../../navigation/routes';
import LoginViewModel, { SplashLoginNav } from '../../auth/presentation/login/LoginViewModel';
import container from '../../di/inversify.config';
import { TYPES } from '../../di/types';

export const SplashScreen = () => {
  const viewModel = container.get<LoginViewModel>(
    TYPES.LoginViewModel,
  );

  const navigation = useNavigation();
  const { theme: { colors } } = useContext(ThemeContext);

  const handleNav = (data: SplashLoginNav) => {
    console.log(JSON.stringify(data))
    switch (data) {
      case SplashLoginNav.EmptyUser:
        navigation.navigate(ROUTES.OnBoarding.OnBoardingScreen.screen.name as never)
        break;
      case SplashLoginNav.SavedUser:
        navigation.navigate(ROUTES.Auth.LoginScreen.name as never)
        break;
      case SplashLoginNav.RememberUser:
        navigation.navigate(ROUTES.Auth.PasswordScreen.name as never)
        break;
    }
  }
  useEffect(() => {
    viewModel.handleFirstLoginScreen(handleNav)
  }, []);
  return (
    <View />
  );
}

