import { useContext, useState } from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { SvgXml } from 'react-native-svg';
import Fonts from '../../../constants/Fonts';
import FontsSize from '../../../constants/FontsSize';
import { ComponentSize } from '../../../data/enum/ComponentSize';
import { ComponentType } from '../../../data/enum/ComponentType';
import { ThemeContext } from '../../contexts/theme/ThemeContext';

export interface BaseButtonProps {
  text: string;
  imageStart?: any;
  imageEnd?: any;
  disabled?: boolean;
  size?: ComponentSize;
  type?: ComponentType;
  onPress: () => void;
}

export const BaseButton = ({
  text,
  imageEnd,
  imageStart,
  disabled = false, // Default to false for enabled state
  size = ComponentSize.large,
  onPress,
  type = ComponentType.default,
}: BaseButtonProps) => {
  const { theme: { colors } } = useContext(ThemeContext);

  var height = 56;
  var textSize = FontsSize._16_SIZE;

  var defaultStyles = StyleSheet.create({
    buttonContainer: {
      position: "absolute",
      bottom: 8,
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
  console.log('Props:', { size, type, disabled });
  console.log('Styles:', defaultStyles); // Log styles for debugging

  // Adjust styles based on size
  switch (size) {
    case ComponentSize.small:
      defaultStyles = {
        ...defaultStyles,
        buttonContainer: { ...defaultStyles.buttonContainer, height: 32 },
        textStyle: { ...defaultStyles.textStyle, fontSize: FontsSize._14_SIZE },
      };
      break;
    case ComponentSize.medium:
      defaultStyles = {
        ...defaultStyles,
        buttonContainer: { ...defaultStyles.buttonContainer, height: 48 },
        textStyle: { ...defaultStyles.textStyle, fontSize: FontsSize._16_SIZE },
      };
      break;
    case ComponentSize.large:
      defaultStyles = {
        ...defaultStyles,
        buttonContainer: { ...defaultStyles.buttonContainer, height: 56 },
        textStyle: { ...defaultStyles.textStyle, fontSize: FontsSize._16_SIZE },
      };
      break;
  }

  // Adjust styles based on type
  switch (type) {
    case ComponentType.default:
    case ComponentType.hover:
    case ComponentType.active:
      // No need to change styles as they remain the same
      break;
    case ComponentType.disabled:
      defaultStyles = {
        ...defaultStyles,
        buttonContainer: { ...defaultStyles.buttonContainer, backgroundColor: colors.disableText },
        textStyle: { ...defaultStyles.textStyle, color: colors.white },
      };
      break;
  }

  // Override styles if disabled
  if (disabled) {
    defaultStyles = {
      ...defaultStyles,
      buttonContainer: { ...defaultStyles.buttonContainer, backgroundColor: colors.disableText },
      textStyle: { ...defaultStyles.textStyle, color: colors.white },
    };
  }
  console.log('Props:2222', { size, type, disabled });

  console.log('Styles:2222', defaultStyles); // Log styles for debugging

  return (
    <TouchableOpacity onPress={onPress} disabled={disabled}>
      <View style={defaultStyles.buttonContainer}>
        {imageStart && <View style={defaultStyles.icoLeft}><SvgXml xml={imageStart} /></View>}
        <Text style={defaultStyles.textStyle}>{text}</Text>
        {imageEnd && <View style={defaultStyles.icoRight}><SvgXml xml={imageEnd} /></View>}
      </View>
    </TouchableOpacity>
  );
};