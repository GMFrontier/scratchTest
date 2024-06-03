import { useContext } from 'react';
import { View, TouchableOpacity, StyleSheet, Image, Dimensions, LayoutChangeEvent, Platform, StatusBar } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SvgXml } from 'react-native-svg';
import { CustomText } from '../text/CustomText';
import Fonts from '../../../constants/Fonts';
import { ROUTES } from '../../../../scratch/navigation/routes';
import FontsSize from '../../../constants/FontsSize';
import { ThemeContext } from '../../contexts/theme/ThemeContext';
import { useTranslation } from '../../contexts/translations/LanguageProvider';
import qr_bottom_ico_content from '../../../../../assets/svg/qr_bottom_ico_content';
import subtractbottom1 from '../../../../../assets/svg/subtractbottom1';
import home_ico_active_content from '../../../../../assets/svg/home_ico_active_content';
import home_ico_content from '../../../../../assets/svg/home_ico_content';
import home_ico_card_active_content from '../../../../../assets/svg/home_ico_card_active_content';
import home_ico_card_content from '../../../../../assets/svg/home_ico_card_content';
import home_ico_activity_active_content from '../../../../../assets/svg/home_ico_activity_active_content';
import home_ico_activity_content from '../../../../../assets/svg/home_ico_activity_content';
import settings_ico_active_content from '../../../../../assets/svg/settings_ico_active_content';
import settings_ico_content from '../../../../../assets/svg/settings_ico_content';
import { HomeScreen } from '../../../../scratch/home/presentation/HomeScreen';
import { CardsScreen } from '../../../../scratch/settings/presentation/CardsScreen';
import changeNavigationBarColor from 'react-native-navigation-bar-color';
import React = require('react');
import Sizebox from '../item/Sizebox';
import BottomTabIcon from './BottomTabIcon';


const BottomTabNavigator = () => {
  const Tab = createBottomTabNavigator();
  const { theme: { colors } } = useContext(ThemeContext);
  const { translation } = useTranslation();
  const barYAxisSpace = (Dimensions.get('window').width) * .16
  var screenHeight = Dimensions.get('screen').height + (StatusBar.currentHeight || 24) + Dimensions.get('window').height;
  if (Platform.OS === "android") {
    screenHeight *= .075
  } else {
    screenHeight *= .06
  }

  React.useEffect(() => {
    changeNavigationBarColor(colors.accentSecondary);
  })

  const CustomTabBarButton = ({ onPress }: any) => (

    <TouchableOpacity
      activeOpacity={0.9}
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1,
      }}
      onPress={onPress}>
      <View
        style={{
          shadowColor: '#000',
          shadowOffset: {
            width: 3,
            height: 3,
          },
          shadowOpacity: 0.3,
          shadowRadius: 4,
          marginBottom: screenHeight
        }}>
        <SvgXml
          xml={qr_bottom_ico_content}
          height={(Dimensions.get('window').width) * .28}
          width={(Dimensions.get('window').width) * .28} />
      </View>
    </TouchableOpacity>
  );

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
            paddingHorizontal: 16
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
        />

        <Tab.Screen
          name="CardScreen"
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
          name={ROUTES.Cards.CardsScreen.name}
          component={CardsScreen}
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
        />

        <Tab.Screen
          name="SettingScreen"
          component={ROUTES.Settings.SettingsScreen.screen}
          options={{
            tabBarIcon: ({ focused }) => (
              <BottomTabIcon
                text={translation.file.bottom_tab_settings}
                icon={settings_ico_content}
                focusedIcon={settings_ico_content}
                focused={focused}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </View>
  );
};
const styles = StyleSheet.create({
  imageIco: {
    height: 100,
  },
});
export default BottomTabNavigator;
