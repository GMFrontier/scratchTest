import { useContext, useState } from 'react';
import { StyleSheet, TouchableOpacity, View, Text, TouchableHighlight } from 'react-native';
import { SvgXml } from 'react-native-svg';
import Fonts from '../../../constants/Fonts';
import FontsSize from '../../../constants/FontsSize';
import { ThemeContext } from '../../contexts/theme/ThemeContext';

export interface BaseButtonProps {
  text: string;
  imageStart?: any;
  imageEnd?: any;
  disabled?: boolean;
  marginHorizontal?: number;
  marginBottom?: number;
  size?: "small" | "medium" | "large";
  type?: "default" | "hover" | "disabled" | "active";
  onPress: () => void;
}

export const BaseButton = ({
  text,
  imageEnd,
  imageStart,
  disabled = false, // Default to false for enabled state
  size = "large",
  onPress,
  marginHorizontal,
  marginBottom = 16,
}: BaseButtonProps) => {
  const { theme: { colors } } = useContext(ThemeContext);
  const [isPressed, setIsPressed] = useState(false);

  var height = 56;
  var textSize = FontsSize._16_SIZE;

  var defaultStyles = StyleSheet.create({
    mainContainer: {
      position: "absolute",
      bottom: marginBottom,
      width: "100%",
      alignSelf: "center",
      paddingHorizontal: marginHorizontal,
      backgroundColor: 'rgba(0, 0, 0, 0)',
    },
    buttonContainer: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      height: height,
      borderRadius: 24,
      backgroundColor: colors.secondary,
    },
    textStyle: {
      fontFamily: Fonts.DMSansMedium,
      fontSize: textSize,
      color: colors.white
    },
    icoLeft: {
      marginRight: 10,
    },
    icoRight: {
      marginLeft: 10,
    },
  });

  // Adjust styles based on size
  switch (size) {
    case "small":
      defaultStyles = {
        ...defaultStyles,
        buttonContainer: { ...defaultStyles.buttonContainer, height: 32 },
        textStyle: { ...defaultStyles.textStyle, fontSize: FontsSize._14_SIZE },
      };
      break;
    case "medium":
      defaultStyles = {
        ...defaultStyles,
        buttonContainer: { ...defaultStyles.buttonContainer, height: 48 },
        textStyle: { ...defaultStyles.textStyle, fontSize: FontsSize._16_SIZE },
      };
      break;
    case "large":
      defaultStyles = {
        ...defaultStyles,
        buttonContainer: { ...defaultStyles.buttonContainer, height: 56 },
        textStyle: { ...defaultStyles.textStyle, fontSize: FontsSize._16_SIZE },
      };
      break;
  }

  if (isPressed) {
    defaultStyles = {
      ...defaultStyles,
      mainContainer: { ...defaultStyles.mainContainer, backgroundColor: 'rgba(0, 0, 0, 0)' },
      buttonContainer: { ...defaultStyles.buttonContainer, backgroundColor: colors.blue50 },
      textStyle: { ...defaultStyles.textStyle, color: "#263137" },
    };
  }
  // Override styles if disabled
  if (disabled) {
    defaultStyles = {
      ...defaultStyles,
      buttonContainer: { ...defaultStyles.buttonContainer, backgroundColor: colors.disableText },
      textStyle: { ...defaultStyles.textStyle, color: colors.white },
    };
  }

  return (
    <TouchableHighlight
      underlayColor='none'
      style={defaultStyles.mainContainer}
      onPressIn={() => setIsPressed(true)} // Set isPressed to true when pressed
      onPressOut={() => setIsPressed(false)} // Set isPressed to false when released
      onPress={onPress}
      disabled={disabled}>
      <View style={defaultStyles.buttonContainer}>
        {imageStart && <View style={defaultStyles.icoLeft}><SvgXml xml={imageStart} /></View>}
        <Text style={defaultStyles.textStyle}>{text}</Text>
        {imageEnd && <View style={defaultStyles.icoRight}><SvgXml xml={imageEnd} /></View>}
      </View>
    </TouchableHighlight>
  );
};