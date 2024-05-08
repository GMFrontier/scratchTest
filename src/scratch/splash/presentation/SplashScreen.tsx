import { useContext, useEffect, useLayoutEffect } from 'react';
import { Alert, Linking, PermissionsAndroid, Platform, View } from 'react-native';
import { CommonActions, useFocusEffect, useNavigation } from '@react-navigation/native';
import { reaction } from 'mobx';
import { ThemeContext } from '../../../core/presentation/contexts/theme/ThemeContext';
import { useStatusBar } from '../../../core/presentation/contexts/statusBar/StatusBarContext';
import { ROUTES } from '../../navigation/routes';

export const SplashScreen = () => {
  const navigation = useNavigation();
  const { theme: { colors } } = useContext(ThemeContext);

  useEffect(() => {
    navigation.navigate(ROUTES.OnBoarding.OnBoardingScreen.screen.name as never)
  }, []);
  return (
    <View />
  );
}

