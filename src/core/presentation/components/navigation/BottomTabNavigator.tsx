import { useContext } from 'react';
import { View, Dimensions, Platform, StatusBar } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ThemeContext } from '../../contexts/theme/ThemeContext';
import { useTranslation } from '../../contexts/translations/LanguageProvider';
import home_ico_active_content from '../../../../../assets/svg/home_ico_active_content';
import home_ico_content from '../../../../../assets/svg/home_ico_content';
import home_ico_card_active_content from '../../../../../assets/svg/home_ico_card_active_content';
import home_ico_card_content from '../../../../../assets/svg/home_ico_card_content';
import home_ico_activity_content from '../../../../../assets/svg/home_ico_activity_content';
import changeNavigationBarColor from 'react-native-navigation-bar-color';
import React = require('react');
import BottomTabIcon from './BottomTabIcon';
import { useNavigation } from '@react-navigation/native';
import ic_profile_focused from '../../../../../assets/svg/ic_profile_focused';
import ic_profile from '../../../../../assets/svg/ic_profile';
import { ROUTES } from '../../../../scratch/navigation/routes';
import SplashScreen from 'react-native-splash-screen';

const BottomTabNavigator = () => {
  const Tab = createBottomTabNavigator();
  const { theme: { colors } } = useContext(ThemeContext);
  const { translation } = useTranslation();
  const barYAxisSpace = (Dimensions.get('window').width) * (Platform.OS === "android" ? .16 : .22)
  var screenHeight = Dimensions.get('screen').height + (StatusBar.currentHeight || 24) + Dimensions.get('window').height;
  if (Platform.OS === "android") {
    screenHeight *= .075
  } else {
    screenHeight *= .06
  }
  const [bottomDisplay, setBottomDisplay] = React.useState(true)

  React.useEffect(() => {
    changeNavigationBarColor(colors.accentSecondary);
  })

  const nav = useNavigation()

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
        bottom: 0,
      }}>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          headerStyle: {},
          unmountOnBlur: true,
          lazy: true,
          tabBarStyle: {
            backgroundColor: colors.accentSecondary,
            height: barYAxisSpace,
            borderTopWidth: 0,
            position: 'absolute',
            paddingHorizontal: 16,
            display: bottomDisplay ? undefined : "none"
          },
          tabBarItemStyle: {
            justifyContent: "space-between"
          },
          headerShadowVisible: false,
          tabBarBackground: () => {
            return (
              <View />
            );
          },
        }}>
        <Tab.Screen
          name={ROUTES.Home.HomeScreen.name}
          component={ROUTES.Home.HomeScreen.screen}
          options={{
            tabBarIcon: ({ focused }) => (
              <BottomTabIcon
                text={translation.file.bottom_tab_home}
                icon={home_ico_content}
                focusedIcon={home_ico_active_content}
                focused={focused}
              />
            ),
          }}
          listeners={{
            focus: (s) => {
              setBottomDisplay(true)
            }
          }}
        />

        <Tab.Screen
          name={"CardsScreen"}
          component={ROUTES.Cards.CardsScreen.screen}
          options={{
            tabBarIcon: ({ focused }) => (
              <BottomTabIcon
                text={translation.file.bottom_tab_cards}
                icon={home_ico_card_content}
                focusedIcon={home_ico_card_active_content}
                focused={focused}
              />
            ),
          }}
        />

        <Tab.Screen
          name={"PointsScreen"}
          component={ROUTES.Points.PointsScreen.screen}
          options={{
            tabBarIcon: ({ focused }) => (
              <BottomTabIcon
                text={translation.file.bottom_tab_points}
                icon={home_ico_activity_content}
                focusedIcon={home_ico_activity_content}
                focused={focused}
              />
            ),
          }}
          listeners={{
            focus: (s) => {
              setBottomDisplay(false)
            }
          }}
        />

        <Tab.Screen
          name={ROUTES.Settings.ProfileScreen.name}
          component={ROUTES.Settings.ProfileScreen.screen}
          options={{
            tabBarIcon: ({ focused }) => (
              <BottomTabIcon
                text={translation.file.bottom_tab_settings}
                icon={ic_profile}
                focusedIcon={ic_profile_focused}
                focused={focused}
              />
            ),
          }}
          listeners={{
            focus: (s) => {
              // setBottomDisplay(false)
            }
          }}
        />
      </Tab.Navigator>
    </View>
  );
};

export default BottomTabNavigator;
