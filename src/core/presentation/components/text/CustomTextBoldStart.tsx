import React, { useContext } from 'react';
import { Text, TextStyle, View } from 'react-native';
import Fonts from '../../../constants/Fonts';
import { ThemeContext } from '../../contexts/theme/ThemeContext';


interface Props {
  text?: string;
  textEnd?: string;
  textSize?: number;
  fontFamilyStart?: string;
  fontFamilyEnd?: string;
  textColor?: string;
  underline?: boolean;
  marginTop?: number;
  marginBottom?: number;
  textAlign?: 'left' | 'center' | 'right' | 'justify';
  colorTextEnd?: string;
  underlineEnd?: boolean;
  onPressTextEnd?: () => void;
  lineHeight?: number;
}

export const CustomTextBoldStart = ({
  text,
  textSize = 14,
  fontFamilyStart = Fonts.PoppinsMedium,
  fontFamilyEnd = Fonts.PoppinsMedium,
  textColor = '#3D444F',
  underline = false,
  marginTop = 0,
  marginBottom = 0,
  textAlign,
  textEnd,
  underlineEnd = false,
  onPressTextEnd,
  colorTextEnd = '#3D444F',
  lineHeight,

}: Props) => {
  const textStyle: TextStyle = {
    fontSize: textSize,
    color: textColor,
    fontFamily: fontFamilyStart,
    textDecorationLine: underline ? 'underline' : 'none',
    textDecorationColor: textColor,
    marginTop,
    marginBottom,
    textAlign,
    lineHeight: lineHeight ?? 1.2 * textSize,
  };


  const textStyleEnd: TextStyle = {
    fontSize: textSize,
    color: colorTextEnd,
    fontFamily: fontFamilyEnd,
    textDecorationLine: underlineEnd ? 'underline' : 'none',
    textDecorationColor: textColor,
    lineHeight: lineHeight ?? 1.2 * textSize,
  };


  return (
    <View style={{ flexDirection: "row", marginTop: marginTop, marginBottom: marginBottom }}>
      <Text style={textStyle} disabled={onPressTextEnd == null} onPress={onPressTextEnd}>
        {text + " "}
        <Text style={textStyleEnd}>
          {textEnd}
        </Text>
      </Text>

    </View>
  )
}