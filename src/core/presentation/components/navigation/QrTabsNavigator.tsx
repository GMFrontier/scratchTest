import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SvgXml } from 'react-native-svg';
import home_ico_content from '../../../../../assets/svg/xml/home_ico_content';
import home_ico_active_content from '../../../../../assets/svg/xml/home_ico_active_content';
import { CustomText } from '../text/CustomText';
import Fonts from '../../../constants/Fonts';
import { ROUTES } from '../../../../scratch/presentation/navigation/routes';
import activity_ico_content from '../../../../../assets/svg/xml/card_ico_content';
import activity_ico_active_content from '../../../../../assets/svg/xml/crypto_ico_active_content';
import FontsSize from '../../../constants/FontsSize';
import { ThemeContext } from '../../contexts/theme/ThemeContext';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CryptoStackScreen from '../../../../paguelo_facil/presentation/navigator/CryptoStackScreen';


const QrStack = createNativeStackNavigator();




const QrTabNavigator = () => {
  const Tab = createBottomTabNavigator();
  const { theme: { colors } } = useContext(ThemeContext);


  return (
    <View
      style={{
        flex: 1,
        paddingBottom: 300,
        backgroundColor: 'white',
        top: 0,
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
            height: 70,
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

        }}>
        <Tab.Screen
          name="Escanear QR"
          component={ROUTES.Pay.PayScreen.screen}
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
                  text="Escanear QR"
                  fontFamily={Fonts.PoppinsMedium}
                  textColor={focused ? '#30850F' : '#7D889B'}
                  textSize={FontsSize._12_SIZE}
                />
              </View>
            ),
          }}
        />



        <Tab.Screen
          name="Mi QR"
          component={CryptoStackScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <View style={{ alignContent: 'center', alignItems: 'center' }}>
                <View style={{ width: 28, height: 28 }}>
                  <SvgXml
                    xml={
                      focused ? activity_ico_active_content : activity_ico_content
                    }
                  />
                </View>
                <CustomText
                  text="Mi QR"
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
export default QrTabNavigator;
