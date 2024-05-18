import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import Fonts from '../../../constants/Fonts';
import { SvgXml } from 'react-native-svg';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { ReactNode, useContext, useEffect } from 'react';
import { ThemeContext } from '../../contexts/theme/ThemeContext';
import { CustomText } from '../text/CustomText';
import { useStatusBar } from '../../contexts/statusBar/StatusBarContext';
import ic_left_arrow_outline from '../../../../../assets/svg/ic_left_arrow_outline';
import ic_left_arrow_outline_white from '../../../../../assets/svg/ic_left_arrow_outline_white';

interface Props {
  text: string;
  showArrowBack?: boolean;
  setIconEnd?: any;
  onPress?: () => void;
  onPressIconEnd?: () => void;
  children?: ReactNode;
  textSize?: number;
  toolbarType?: "profile"
}

const ToolbarView = ({
  text,
  showArrowBack = true,
  onPress,
  setIconEnd: showIconEnd,
  onPressIconEnd,
  children,
  textSize,
  toolbarType
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
    if (onPressIconEnd != undefined) {
      onPressIconEnd();
      return;
    }
    navigation.goBack();
  };

  useEffect(() => {
    switch (toolbarType) {
      case "profile":
        statusBar.setProfileStatusBar()
        break
      default:
        statusBar.setToolbarStatusBar()
        break

    }
    return () => {
      statusBar.setPrimaryStatusBar()
    }
  })

  var style = StyleSheet.create({
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
      color: undefined
    },
  });

  switch (toolbarType) {
    case "profile":
      style = {
        ...style,
        toolbarContainer: { ...style.toolbarContainer, backgroundColor: colors.blue400 },
        title: { ...style.title, color: colors.white },
      };
      break;
  }

  var arrowBack
  switch (arrowBack) {
    case "profile":
      arrowBack = ic_left_arrow_outline
      break;
    default:
      arrowBack = ic_left_arrow_outline_white
  }
  return (
    <View style={{ flex: 1 }} >
      <View style={style.toolbarContainer}>
        {showArrowBack && (
          <TouchableOpacity onPress={handleBackPress} style={style.backButton}>
            <SvgXml xml={arrowBack} />
          </TouchableOpacity>
        )}
        <CustomText
          textSize={textSize}
          textColor={style.title.color}
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