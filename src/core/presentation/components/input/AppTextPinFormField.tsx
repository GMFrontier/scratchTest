import React, { useContext, useState } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';

import FontsSize from '../../../constants/FontsSize';
import { ThemeContext } from '../../contexts/theme/ThemeContext';
import Fonts from '../../../constants/Fonts';
import eye_ico_content from '../../../../../assets/svg/xml/eye_ico_black_content';
import eye_ico_hide_content from '../../../../../assets/svg/xml/eye_ico_hide_black_content';
import { SvgXml } from 'react-native-svg';
import { TouchableOpacity } from '@gorhom/bottom-sheet';


interface Props {
  inputValue?: any;
  onChangeText?: any;
  secureText: boolean;
  onPress: () => void;
  onFocus: () => void;
}

export const AppTextPinFormField = ({
  inputValue, onChangeText, secureText, onPress, onFocus
}: Props) => {

  const [isFilled, setIsFilled] = useState<boolean>(false);
  const { theme: { colors } } = useContext(ThemeContext);

  const handleTextChange = (text: string) => {
    const newText = text.replace(/[^0-9]/g, '');

    setIsFilled(text.length === 4);
    if (onChangeText) {
      onChangeText(newText)
    }
  };


  const styles = StyleSheet.create({


    filledInput: {
      backgroundColor: colors.backgroundInputGreen,
      borderRadius: 14,
      fontSize: FontsSize._18_SIZE,
      fontFamily: Fonts.PoppinsRegular,
      borderWidth: 1.6,
      borderColor: colors.green07,

    }, input: {
      flex: 1,
      paddingVertical: 5,
      paddingHorizontal: 10,
      backgroundColor: colors.white,
      fontSize: FontsSize._18_SIZE,
      fontFamily: Fonts.PoppinsRegular,
      borderRadius: 14,
      borderWidth: 1.6,
      borderColor: colors.textColor04,
      paddingStart: 20,

    }, icoBottom: {
      marginEnd: 16,
      width: 25,
      position: 'absolute',
      right: 0,
      bottom: 16,
      justifyContent: 'center',
      resizeMode: 'contain',
      height: 25,
    }
  });

  return (

    <View
      style={{
        borderColor: isFilled ? colors.primary : '#3D444F',
        width: '100%',
        height: 56,
        borderRadius: 14,
      }}>
      <TextInput
        maxLength={4}
        keyboardType="numeric"
        style={[
          [{ ...styles.input }],
          isFilled && [{ ...styles.filledInput }]
        ]}

        value={inputValue}
        onChangeText={handleTextChange}
        secureTextEntry={secureText}
        onFocus={onFocus}
      />
      <View style={styles.icoBottom} >
        <TouchableOpacity onPress={onPress}>
          <SvgXml xml={secureText ? eye_ico_content : eye_ico_hide_content} />

        </TouchableOpacity>
      </View>
    </View>
  );
};

