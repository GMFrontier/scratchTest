import React, { useEffect, useRef } from 'react';
import {

  StackScreenProps,
  createStackNavigator,
} from '@react-navigation/stack';

import { ROUTES } from './routes';
import { PanResponder, View } from 'react-native';
import { setAuthorizationTokenDefault } from '../../../core/data/sources/remote/ApiPagueloFacil';
import { StackActions, useNavigation } from '@react-navigation/native';
import { useToastContext } from '../../../core/presentation/contexts/messages/useToastContext';
import { delay } from '../../../core/data/utils/Utils';
import { useTranslation } from '../../../core/presentation/contexts/translations/LanguageProvider';

const Stack = createStackNavigator();

const handlers = {
  BottomTabNavigator: () => <ROUTES.Navigator.BottomTabNavigator.screen />
  // SplashScreen: () => <ROUTES.Login.SplashScreen.screen />,
  // OnBoardingScreen: () => <ROUTES.Login.OnBoardingScreen.screen />,
  // LoginScreen: (params: any) => <ROUTES.Login.LoginScreen.screen {...params} />,
};

export type RootParamList = {
  [key: string]: { params: any };
};

export interface NavigationProps extends StackScreenProps<RootParamList> { }

export const StackNavigator = () => {

  return (
    <View style={{ flex: 1 }}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {Object.entries(handlers).map(([screen, component]) => (
          <Stack.Screen name={screen} key={screen} component={component} />
        ))}
      </Stack.Navigator>
    </View>
  );
};
