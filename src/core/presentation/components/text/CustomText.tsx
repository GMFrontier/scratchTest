import { useContext } from 'react';
import { StyleProp, Text, TextStyle } from 'react-native';
import Fonts from '../../../constants/Fonts';
import { ThemeContext } from '../../contexts/theme/ThemeContext';

interface Props {
  text: string;
  textSize?: number;
  fontFamily?: string;
  textColor?: string;
  underline?: boolean;
  marginTop?: number;
  marginBottom?: number;
  textAlign?: 'left' | 'center' | 'right' | 'justify';
  weight?: "normal" | "bold" | "100" | "200" | "300" | "400" | "500" | "600" | "700" | "800" | "900";
  numberOfLines?: number,
  lineHeight?: number,
}

export const CustomText = ({
  text,
  textSize = 14,
  fontFamily = Fonts.DMSansRegular,
  textColor,
  underline = false,
  marginTop = 0,
  marginBottom = 0,
  textAlign,
  weight,
  numberOfLines,
  lineHeight
}: Props) => {
  const {
    theme: { colors },
  } = useContext(ThemeContext);

  if (text == undefined) text = '';

  const parts = text.split('<b>');

  const textStyle: TextStyle = {
    fontSize: textSize,
    color: textColor ?? colors.secondaryText,
    opacity: textColor ? 1 : .8,
    fontFamily,
    textDecorationLine: underline ? 'underline' : 'none',
    textDecorationColor: textColor,
    marginTop,
    fontWeight: weight,
    marginBottom,
    textAlign: textAlign,
    lineHeight: lineHeight ?? 1.2 * textSize
  };

  const renderTextParts = (parts: string[], textStyle: StyleProp<TextStyle>, numberOfLines?: number) => {
    const textParts = parts.map((part, index) => (
      <Text key={index} style={[textStyle, index % 2 !== 0 && { fontFamily: Fonts.DMSansMedium }]}>
        {part}
      </Text>
    ));

    return numberOfLines ? (
      <Text ellipsizeMode='tail' numberOfLines={numberOfLines} style={textStyle}>
        {textParts}
      </Text>
    ) : (
      <Text style={textStyle}>
        {textParts}
      </Text>
    );
  };

  return renderTextParts(parts, textStyle, numberOfLines);
};
