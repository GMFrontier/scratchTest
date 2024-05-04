import React, { useContext } from 'react';
import { View } from 'react-native';
import Fonts from '../../../constants/Fonts';
import { CustomText } from './CustomText';
import FontsSize from '../../../constants/FontsSize';
import { ThemeContext } from '../../contexts/theme/ThemeContext';


interface Props {
  textstart: string;
  textEnd: string;
  textStartSize?: number
  textEndSize?: number,
  textStartFont?: any,
  textEndFont?: any
  textEndColor?: any
}

export const RowTextComponent = ({
  textstart,
  textEnd,
  textStartSize = FontsSize._14_SIZE,
  textEndSize = FontsSize._14_SIZE,
  textStartFont = Fonts.PoppinsRegular,
  textEndFont = Fonts.PoppinsMedium,
  textEndColor


}: Props) => {


  const { theme: { colors } } = useContext(ThemeContext);

  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 }}>
      <CustomText text={textstart} fontFamily={textStartFont} textSize={textStartSize} textColor={colors.textColor02} />
      <CustomText textAlign='right' text={textEnd} fontFamily={textEndFont} textSize={textEndSize} textColor={textEndColor ? textEndColor : colors.textColor01} numberOfLines={4} />
    </View>
  )
}