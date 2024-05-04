import React from 'react';
import { Text, TextStyle, View } from 'react-native';
import Fonts from '../../../constants/Fonts';


interface Props {
  text?: string;
  textEnd?: string;
  textSize?: number;
  fontFamily?: string
  fontFamilyEnd?: string;
  textColor?: string;
  underline?: boolean;
  marginTop?: number;
  marginBottom?: number;
  textAlign?: 'left' | 'center' | 'right' | 'justify';
  colorTextEnd?: string;
  underlineEnd?: boolean;
  onPressTextEnd?: () => void;

}

export const CustomTextEndBold = ({
  text,
  textSize = 14,
  fontFamily,
  fontFamilyEnd = Fonts.PoppinsMedium,
  textColor = '#3D444F',
  underline = false,
  marginTop = 0,
  marginBottom = 0,
  textAlign,
  textEnd,
  underlineEnd = false,
  onPressTextEnd,
  colorTextEnd = "#3D444F"
}: Props) => {
  const textStyle: TextStyle = {
    fontSize: textSize,
    color: textColor,
    fontFamily,
    textDecorationLine: underline ? 'underline' : 'none',
    textDecorationColor: textColor,
    marginTop,
    marginBottom,
    textAlign,
  };


  const textStyleEnd: TextStyle = {
    fontSize: textSize,
    color: colorTextEnd,
    fontFamily: fontFamilyEnd,
    textDecorationLine: underlineEnd ? 'underline' : 'none',
    textDecorationColor: textColor,
  };


  return (
    <View style={{ flexDirection: "row" }}>
      <Text style={textStyle}>
        {text + " "}
        <Text style={textStyleEnd} disabled={onPressTextEnd == null} onPress={onPressTextEnd}>
          {textEnd}
        </Text>
      </Text>

    </View>
  )
}