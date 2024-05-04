import { StyleSheet, Image, TouchableOpacity, View, Text } from 'react-native';
import { useContext } from 'react';
import { ThemeContext } from '../../contexts/theme/ThemeContext';
import { SvgXml } from 'react-native-svg';
import FontsSize from '../../../constants/FontsSize';
import { CustomText } from '../text/CustomText';
import Fonts from '../../../constants/Fonts';
import ic_fingerprint from "../../../../../assets/svg/xml/ic_fingerprint"

interface Props {
  text: string;
  onPress: () => void;
}

export const ButtonBiometric = ({ text, onPress }: Props) => {
  const { theme: { colors } } = useContext(ThemeContext);

  const fontSize = FontsSize._16_SIZE;

  const style = StyleSheet.create({

    buttonContainer: {
      borderRadius: 8,
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      height: 48,
      borderWidth: 1.4,
      borderColor: colors.green07,
      backgroundColor: colors.transparent,
    },
    icoLeft: {
      right: 10
    },
    icoRight: {
      marginEnd: 5
    }
  });
  return (
    <TouchableOpacity onPress={onPress} >
      <View style={[style.buttonContainer]}>

        <View style={style.icoRight}>
          <SvgXml xml={ic_fingerprint} />
        </View>

        <CustomText text={text} fontFamily={Fonts.PoppinsMedium} textSize={fontSize} textColor={colors.green07} />

      </View>
    </TouchableOpacity>
  );
};
