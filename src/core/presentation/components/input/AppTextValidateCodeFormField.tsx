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

export const AppTextValidateCodeFormField = ({
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
      backgroundColor: colors.backgroundInputGreen,
      borderRadius: 14,
      fontSize: FontsSize._18_SIZE,
      fontFamily: Fonts.PoppinsRegular,
      borderWidth: 1.6,
      borderColor: colors.primary
    }, input: {
      flex: 1,
      paddingVertical: 5,
      paddingHorizontal: 20,
      backgroundColor: colors.lightGray06,
      fontSize: FontsSize._18_SIZE,
      fontFamily: Fonts.PoppinsRegular,
      borderRadius: 14,
      borderWidth: 1.6,
      borderColor: colors.textColor04

    },
  });

  return (

    <View
      style={{
        borderColor: isFilled ? colors.primary : colors.textColor02,
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
        placeholderTextColor={colors.textColor04}
        onChangeText={handleTextChange}
      />
    </View>
  );
};

