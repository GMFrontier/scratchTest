import React, { useContext } from 'react';
import { Text, TextStyle, View } from 'react-native';
import Fonts from '../../../constants/Fonts';
import { ThemeContext } from '../../contexts/theme/ThemeContext';
import CustomToolTip from '../tooltip/CustomToolTip';
import { useTranslation } from '../../contexts/translations/LanguageProvider';

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
  showRequiredIcon?: boolean,
  toolTipText?: string,
  showOptionalTag?: boolean,
}

export const CustomLabelText = ({
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
  lineHeight,
  showRequiredIcon = false,
  showOptionalTag = false,
  toolTipText,
}: Props) => {
  const {
    theme: { colors },
  } = useContext(ThemeContext);
  const { translation } = useTranslation();

  if (text == undefined) text = '';

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
    lineHeight: lineHeight ?? 1.2 * textSize,
  };

  return (
    <View style={{ flexDirection: "row" }}>
      {numberOfLines ? (
        <Text
          ellipsizeMode='tail'
          numberOfLines={numberOfLines}
          style={textStyle}>
          {text}
        </Text>
      ) : (
        <Text style={textStyle}>
          {text}
        </Text>
      )}
      {showRequiredIcon && <Text style={{ color: colors.alertColor, marginStart: 4, marginTop: textStyle.marginTop }}>*</Text>}
      {showOptionalTag && <Text style={{ color: colors.disableText, marginStart: 4, marginTop: textStyle.marginTop, fontFamily: Fonts.DMSansRegular, fontSize: 14 }}> {"(Opcional)"} </Text>}
      {toolTipText &&
        <View style={{ marginTop: textStyle.marginTop }} >
          <CustomToolTip
            text={toolTipText}
          />
        </View>
      }

    </View>
  );
};