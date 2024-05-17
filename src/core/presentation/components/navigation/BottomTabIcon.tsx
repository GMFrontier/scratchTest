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

interface Props {
  text: string;
  icon: string;
  focused: boolean;
  focusedIcon: string;
}

const BottomTabIcon = ({
  text,
  icon,
  focused,
  focusedIcon,
}: Props) => {
  const Tab = createBottomTabNavigator();
  const { theme: { colors } } = useContext(ThemeContext);
  var screenHeight = Dimensions.get('screen').height + (StatusBar.currentHeight || 24) + Dimensions.get('window').height;
  if (Platform.OS === "android") {
    screenHeight *= .075
  } else {
    screenHeight *= .06
  }

  React.useEffect(() => {
    changeNavigationBarColor(colors.accentSecondary);
  })

  return (
    <View
      style={{
        alignContent: 'center',
        alignItems: 'center',
        flexDirection: "row",
        backgroundColor: focused ? colors.secondary : "transparent",
        paddingVertical: 8,
        paddingHorizontal: 13,
        borderRadius: 24
      }}
    >
      <SvgXml
        xml={focused ? focusedIcon : icon}
      />
      <Sizebox width={4} />
      <CustomText
        text={focused ? text : ""}
        fontFamily={Fonts.DMSansMedium}
        textColor={focused ? colors.defaultTextButton : '#000'}
        textSize={FontsSize._12_SIZE}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  imageIco: {
    height: 100,
  },
});
export default BottomTabIcon;
