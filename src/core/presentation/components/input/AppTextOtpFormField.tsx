import React, { useContext, useState } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';

import FontsSize from '../../../constants/FontsSize';
import { ThemeContext } from '../../contexts/theme/ThemeContext';
import Fonts from '../../../constants/Fonts';
import { useTranslation } from '../../contexts/translations/LanguageProvider';



interface Props {
  inputValue?: any;
  onChangeText?: any;
}

export const AppTextOtpFormField = ({
  inputValue, onChangeText
}: Props) => {


  const { translation } = useTranslation();
  const [isFilled, setIsFilled] = useState<boolean>(false);
  const { theme: { colors } } = useContext(ThemeContext);

  const handleTextChange = (text: string) => {
    setIsFilled(text.length === 6);
    if (onChangeText) {
      onChangeText(text);
    }
  };

  const styles = StyleSheet.create({


    filledInput: {
      backgroundColor: '#e8eee0',
      borderRadius: 12,
      fontSize: FontsSize._16_SIZE,
      fontFamily: Fonts.PoppinsRegular,
      borderWidth: 2,
      borderColor: colors.primary
    }, input: {
      flex: 1,
      paddingVertical: 5,
      paddingHorizontal: 10,
      backgroundColor: '#E9EBEE',
      fontSize: FontsSize._16_SIZE,
      fontFamily: Fonts.PoppinsRegular,
      borderRadius: 12,
      borderWidth: 2,
      borderColor: '#7D889B'

      borderColor: '#7D889B'

    },
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
        maxLength={6}
        keyboardType="numeric"
        style={[
          [{ ...styles.input }],
          isFilled && [{ ...styles.filledInput }]
        ]}
        placeholder={translation.file.enter_code}
        value={inputValue}
        placeholderTextColor="#7D889B"
        onChangeText={handleTextChange}
      />
    </View>
  );
};

