import messaging from '@react-native-firebase/messaging';
import { useEffect } from 'react';
import notifee, { EventType } from '@notifee/react-native';
import { getAuthorizationToken } from './ApiPagueloFacil';
import { ROUTES } from '../../../../scratch/presentation/navigation/routes';
import { APP_ADD_CARD, APP_ADD_CARD_PF, APP_CHARGE_USER, APP_PAY_MERCHANT, APP_PAY_SERVICES, APP_PAY_USER, APP_RECHARGE_BALANCE, INTERNAL_REDIRECT_INTENT, REDIRECT_INTENT } from '../../../constants/NotificationsConstants';
import React from 'react';
import { Linking } from 'react-native';

export const useFirebaseMessaging = (navigationRef: any) => {
  useEffect(() => {
    const requestPermission = async () => {
      try {
        await messaging().requestPermission();
      } catch (error) {
        console.error('Error requesting permission and token:', error);
      }
    };
    requestPermission();
  }, []);

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      await notifee.requestPermission();
      const channelId = await notifee.createChannel({
        id: 'default',
        name: 'Default Channel',
      });
      var clickActionData = ""
      if (remoteMessage.data) {
        clickActionData = remoteMessage.data['click_action_data'].toString() ?? "";
      }
      await notifee.displayNotification({
        title: remoteMessage.notification?.title ?? 'PagueloFacil',
        body: remoteMessage.notification?.body ?? 'Hello again!',
        android: {
          channelId,
          pressAction: {
            id: clickActionData,
          },
        },
        data: remoteMessage.data
      });
    });

    notifee.onForegroundEvent(({ type, detail }) => {
      if ((type === EventType.PRESS || type === EventType.ACTION_PRESS) && detail.pressAction?.id) {
        const clickActionData = (detail.notification?.data?.click_action_data as string)
        handleNotificationClick(navigationRef, clickActionData)
      }
    });

    Linking.addEventListener('url', (event) => {
      console.log("addEventListener")
      console.log("addEventListener")
      console.log("addEventListener")
      console.log("addEventListener")
      console.log("addEventListener")
      console.log("addEventListener")
      console.log("addEventListener")
      console.log("addEventListener")
      console.log("addEventListener")
      console.log("addEventListener")
      console.log(event)
      const pattern = /clickActionData\/(.*)/;
      const match = event.url.match(pattern);
      const clickActionData = match ? match[1] : null;
      handleNotificationClick(navigationRef, clickActionData ?? "")
    });
    return unsubscribe;
  }, []);

  React.useEffect(() => {
    return notifee.onForegroundEvent(({ type, detail }) => {
      switch (type) {
        case EventType.DISMISSED:
          console.log('User dismissed notification', detail.notification);
          break;
        case EventType.PRESS:
          console.log('User pressed notification', detail.notification);
          break;
      }
    });
  }, []);
};

const isUserLoggedIn = (): boolean => {
  if (getAuthorizationToken().includes('|')) {
    return true;
  }
  return false
}

export const handleNotificationClick = (navigationRef: any, clickActionData: string) => {
  var isLoggedIn = isUserLoggedIn();
  if (navigationRef.isReady()) {
    if (isLoggedIn) {
      navigateToAppScreen(navigationRef, clickActionData);
    }
  }
};

export const navigateToAppScreen = (navigationRef: any, clickActionData: string) => {

  console.log(clickActionData);

  switch (clickActionData) {
    case APP_RECHARGE_BALANCE:
      navigationRef.navigate(
        ROUTES.Home.Rechargue.RechargueScreen.name as never,
      );
      break;
    case APP_ADD_CARD_PF:
      navigationRef.navigate(
        ROUTES.Navigator.BottomTabNavigator.name as never,
        { screen: ROUTES.Card.CardScreen.name },
      );
      break;
    case APP_PAY_USER:
      navigationRef.navigate(
        ROUTES.Home.PayScreen.name as never,
      );
      break;
    case APP_PAY_MERCHANT:
      navigationRef.navigate(
        ROUTES.Home.PayScreen.name as never,
        { screen: 'PayShopScreen' },
      );
      break;
    case APP_PAY_SERVICES:
      navigationRef.navigate(
        ROUTES.Home.PayScreen.name as never,
        { screen: 'PayServicesScreen' },
      );
      break;
    case APP_ADD_CARD:
      navigationRef.navigate(
        ROUTES.ExternalCard.ExternalCardFormScreen.name as never,
      );
      break;
    case APP_CHARGE_USER:
      navigationRef.navigate(
        ROUTES.Home.ChargeUserScreen.name as never,
      );
      break;
    default:
      break;
  }
};


