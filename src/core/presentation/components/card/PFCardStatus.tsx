import React, { useContext } from 'react';
import { View } from 'react-native';
import { CustomText } from '../text/CustomText';
import FontsSize from '../../../constants/FontsSize';
import { SvgXml } from 'react-native-svg';
import Fonts from '../../../constants/Fonts';
import { ThemeContext } from '../../contexts/theme/ThemeContext';

interface Props {
  image: any,
  message: string,
  marginStart?: number
}

const PFCardStatus = ({ image, message, marginStart }: Props) => {
  const {
    theme: { colors },
  } = useContext(ThemeContext);

  return (
    <View style={{ position: 'absolute', flexDirection: 'row', width: '100%', height: '100%', alignItems: 'center', paddingStart: marginStart, paddingEnd: '25%' }}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <SvgXml xml={image} width={30} height={30} />
        <View style={{ marginStart: marginStart }}>
          <CustomText textColor={colors.textColor01} text={message} textSize={FontsSize._14_SIZE} fontFamily={Fonts.PoppinsMedium}></CustomText>
        </View>
      </View>
    </View>
  )
};
;

export default PFCardStatus;