import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import Fonts from '../../../constants/Fonts';
import { SvgXml } from 'react-native-svg';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { ReactNode, useContext, useEffect } from 'react';
import { ThemeContext } from '../../contexts/theme/ThemeContext';
import { CustomText } from '../text/CustomText';
import { useStatusBar } from '../../contexts/statusBar/StatusBarContext';
import ic_left_arrow_outline from '../../../../../assets/svg/ic_left_arrow_outline';

interface Props {
  text: string;
  showArrowBack?: boolean;
  setIconEnd?: any;
  onPress?: () => void;
  onPressIcoEnd?: () => void;
  children?: ReactNode;
}

const ToolbarView = ({
  text,
  showArrowBack = true,
  onPress,
  setIconEnd: showIconEnd,
  onPressIcoEnd,
  children
}: Props
) => {
  const navigation = useNavigation();
  const statusBar = useStatusBar()

  const {
    theme: { colors },
  } = useContext(ThemeContext);

  const handleBackPress = () => {
    if (onPress != undefined) {
      onPress();
      return;
    }
    navigation.goBack();
  };

  const handleIcoEndBackPress = () => {
    if (onPressIcoEnd != undefined) {
      onPressIcoEnd();
      return;
    }
    navigation.goBack();
  };

  useEffect(() => {
    statusBar.setToolbarStatusBar()
    return () => {
      statusBar.setPrimaryStatusBar()
    }
  })

  const style = StyleSheet.create({
    toolbarContainer: {
      flexDirection: 'row',
      height: 56,
      width: '100%',
      justifyContent: 'center',
      alignItems: "center",
      backgroundColor: colors.accentSecondary
    },
    backButton: {
      marginStart: 20,
      position: 'absolute',
      padding: 10,
      alignSelf: 'center',
      left: 0,
    },
    icoEnd: {
      marginStart: 20,
      position: 'absolute',
      padding: 10,
      marginEnd: 16,
      alignSelf: 'center',
      right: 0,
    },
    title: {
      fontSize: 16,
      fontWeight: '500',
      color: '#1E2227',
      fontFamily: Fonts.PoppinsMedium,
      alignSelf: 'center',
    },
  });

  return (
    <View style={{ flex: 1 }} >
      <View style={style.toolbarContainer}>
        {showArrowBack && (
          <TouchableOpacity onPress={handleBackPress} style={style.backButton}>
            <SvgXml xml={ic_left_arrow_outline} />
          </TouchableOpacity>
        )}
        <CustomText
          text={text} />

        {showIconEnd && (
          <TouchableOpacity onPress={handleIcoEndBackPress} style={style.icoEnd}>
            <SvgXml xml={showIconEnd} />
          </TouchableOpacity>
        )}
      </View>
      {children}
    </View>
  );
};

export default ToolbarView;