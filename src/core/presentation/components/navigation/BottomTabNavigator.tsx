import React, { useContext, useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Image, Dimensions, LayoutChangeEvent, Platform, StatusBar } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SvgXml } from 'react-native-svg';
import home_ico_content from '../../../../../assets/svg/xml/home_ico_content';
import home_ico_active_content from '../../../../../assets/svg/xml/home_ico_active_content';
import { CustomText } from '../text/CustomText';
import Fonts from '../../../constants/Fonts';
import { ROUTES } from '../../../../scratch/presentation/navigation/routes';
import qr_bottom_ico_content from '../../../../../assets/svg/xml/qr_bottom_ico_content';
import card_ico_content from '../../../../../assets/svg/xml/crypto_ico_content';
import card_ico_active_content from '../../../../../assets/svg/xml/card_ico_active_content';
import activity_ico_content from '../../../../../assets/svg/xml/card_ico_content';
import settings_ico_content from '../../../../../assets/svg/xml/settings_ico_content';
import settings_ico_active_content from '../../../../../assets/svg/xml/settings_ico_active_content';
import activity_ico_active_content from '../../../../../assets/svg/xml/crypto_ico_active_content';
import subtractbottom1 from '../../../../../assets/svg/xml/subtractbottom1';
import FontsSize from '../../../constants/FontsSize';
import { ThemeContext } from '../../contexts/theme/ThemeContext';
import { useTranslation } from '../../contexts/translations/LanguageProvider';
import { TransactionsScreen } from '../../../../paguelo_facil/presentation/modules/logged_in/home/TransactionsScreen';
import home_ico_activity_active_content from '../../../../../assets/svg/xml/home_ico_activity_active_content';
import home_ico_activity_content from '../../../../../assets/svg/xml/home_ico_activity_content';
import home_ico_card_content from '../../../../../assets/svg/xml/home_ico_card_content';
import home_ico_card_active_content from '../../../../../assets/svg/xml/home_ico_card_active_content';


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
        paddingBottom: 30,
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
            backgroundColor: 'transparent',
            height: barYAxisSpace,
            width: '100%',
            borderTopWidth: 0,
            position: 'absolute',
            shadowColor: 'transparent',
            alignSelf: 'center',
          },
          tabBarItemStyle: {
            alignSelf: 'center',
            paddingTop: 25,
          },
          headerShadowVisible: false,
          tabBarBackground: () => {
            return (
              <SvgXml
                xml={subtractbottom1}
                width={'100%'}
                preserveAspectRatio="xMinYMin slice"></SvgXml>
            );
          },
        }}>
        <Tab.Screen
          name="HomeScreen"
          component={ROUTES.Home.HomeScreen.screen}
          options={{
            tabBarIcon: ({ focused }) => (
              <View
                style={{
                  alignContent: 'center',
                  alignItems: 'center',
                }}>
                <SvgXml
                  xml={focused ? home_ico_active_content : home_ico_content}
                />
                <CustomText
                  text={translation.file.bottom_tab_home}
                  fontFamily={Fonts.PoppinsMedium}
                  textColor={focused ? '#30850F' : '#7D889B'}
                  textSize={FontsSize._12_SIZE}
                />
              </View>
            ),
          }}
        />

        <Tab.Screen
          name="CardScreen"
          component={ROUTES.Card.CardScreen.screen}
          options={{
            tabBarIcon: ({ focused }) => (
              <View style={{ alignContent: 'center', alignItems: 'center' }}>
                <SvgXml
                  xml={focused ? home_ico_card_active_content : home_ico_card_content}
                />
                <CustomText
                  text={translation.file.bottom_tab_cards}
                  fontFamily={Fonts.PoppinsMedium}
                  textColor={focused ? '#30850F' : '#7D889B'}
                  textSize={FontsSize._12_SIZE}
                />
              </View>
            ),
          }}
        />

        <Tab.Screen
          name="QRScanScreen"
          component={ROUTES.QR.QRScanScreen.screen}
          options={{
            tabBarButton: props => {
              return <CustomTabBarButton {...props} />;
            },
          }}
        />

        <Tab.Screen
          name={ROUTES.Home.TransactionsScreen.name}
          component={TransactionsScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <View style={{ alignContent: 'center', alignItems: 'center' }}>
                <View style={{ width: 28, height: 28, marginBottom: 3 }}>
                  <SvgXml
                    xml={
                      focused ? home_ico_activity_active_content : home_ico_activity_content
                    }
                  />
                </View>
                <CustomText
                  text={translation.file.activity}
                  fontFamily={Fonts.PoppinsMedium}
                  textColor={focused ? '#30850F' : '#7D889B'}
                  textSize={FontsSize._12_SIZE}
                />
              </View>
            ),
          }}
        />

        <Tab.Screen
          name="SettingScreen"
          component={ROUTES.Setting.SettingScreen.screen}
          options={{
            tabBarIcon: ({ focused }) => (
              <View style={{ alignContent: 'center', alignItems: 'center' }}>
                <SvgXml
                  xml={
                    focused ? settings_ico_active_content : settings_ico_content
                  }
                />
                <CustomText
                  text={translation.file.bottom_tab_settings}
                  fontFamily={Fonts.PoppinsMedium}
                  textColor={focused ? '#30850F' : '#7D889B'}
                  textSize={FontsSize._12_SIZE}
                />
              </View>
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
