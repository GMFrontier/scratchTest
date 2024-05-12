import React from 'react';
import { Text, TextStyle, View } from 'react-native';
import Fonts from '../../../constants/Fonts';
import FontsSize from '../../../constants/FontsSize';


interface Props {
  text: string;
  textSize?: number;
  fontFamily?: string
  textColor?: string;
  underline?: boolean;
  marginTop?: number;
  opacity?: number;
  marginBottom?: number;
  textAlign?: 'left' | 'center' | 'right' | 'justify';
}

export const CustomTextBold = ({
  text,
  textSize = FontsSize._16_SIZE,
  fontFamily = Fonts.DMSansRegular,
  textColor = '#3D444F',
  underline = false,
  marginTop = 0,
  marginBottom = 0,
  opacity,
  textAlign,
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

  const parts = text.split('<b>');

  return (
    <View style={{ flexDirection: "row", opacity: opacity }}>
      <Text>
        {parts.map((part, index) => {
          if (index % 2 === 0) {
            return <Text key={index} style={textStyle}>{part}</Text>;
          } else {
            return <Text key={index} style={[textStyle, { fontFamily: Fonts.DMSansMedium }]}>{part}</Text>;
          }
        })}
      </Text>
    </View>
  )
}