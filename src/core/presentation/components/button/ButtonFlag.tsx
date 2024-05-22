import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { CustomText } from '../text/CustomText';
import Fonts from '../../../constants/Fonts';
import FontsSize from '../../../constants/FontsSize';
import arrow_down_black_content from '../../../../../assets/svg/arrow_down_black_content';
import { ThemeContext } from '../../contexts/theme/ThemeContext';
import { useContext } from 'react';
import Sizebox from '../item/Sizebox';

interface Props {
  flagCountry: string;
  codePhone: string;
  disabled?: boolean;
  onPress: () => void;
}

export const ButtonFlag = ({ onPress, flagCountry, codePhone, disabled = false }: Props) => {

  const {
    theme: { colors },
  } = useContext(ThemeContext);

  const style = StyleSheet.create({
    viewContainer: {
      flex: 1,
      backgroundColor: colors.blue50,
      flexDirection: 'row',
      alignSelf: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 10,
      padding: 16
    }
  });

  return (
    <TouchableOpacity onPress={onPress} disabled={disabled} >
      <View style={[style.viewContainer]}>
        <View style={{}}>
          <Text>{flagCountry}</Text>
        </View>
        <Sizebox width={8} />
        <CustomText
          text={codePhone}
          fontFamily={Fonts.DMSansMedium}
          textSize={FontsSize._16_SIZE}
          textColor='#121212' />
        <Sizebox width={8} />

        <SvgXml xml={arrow_down_black_content}></SvgXml>
      </View>
    </TouchableOpacity>
  );
};
