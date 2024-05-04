import React, { useContext, useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import Fonts from '../../../constants/Fonts';
import { CustomText } from '../text/CustomText';
import FontsSize from '../../../constants/FontsSize';
import { ThemeContext } from '../../contexts/theme/ThemeContext';

interface Props {
  inputValue?: any;
  onChangeText?: any;
  returnKeyType?: 'default' | 'go' | 'google' | 'join' | 'next' | 'route' | 'search' | 'send' | 'yahoo' | 'done',
}

export const InputAmount = ({
  inputValue, onChangeText, returnKeyType = 'default'
}: Props) => {

  const formatAndAddDecimalToNumber = (text: string) => {
    const textWithoutDecimal = '000' + text.replace('.', '').replace(',', '');
    const formattedText =
      textWithoutDecimal.slice(0, -2) + '.' + textWithoutDecimal.slice(-2);

    const numericAmount = parseFloat(formattedText);
    return formatAmount(numericAmount);
  };

  const formatAmount = (amount: any) => {
    return amount !== null && amount !== undefined
      ? amount.toFixed(2)
      : '0.00';
  };




  const handleAmountInputChange = (text: string) => {
    onChangeText(formatAndAddDecimalToNumber(text));
  };


  const {
    theme: { colors },
  } = useContext(ThemeContext);

  return (

    <View style={styles.container}>

      <CustomText text='$' fontFamily={Fonts.PoppinsMedium} textSize={FontsSize._24_SIZE}></CustomText>
      <TextInput
        style={{ ...styles.input, color: colors.textColor02 }}
        keyboardType="numeric"
        placeholder='0.00'
        maxLength={9}
        returnKeyType={returnKeyType}
        placeholderTextColor={colors.textColor04}
        onChangeText={handleAmountInputChange}
        value={inputValue}
      />
    </View>
  );
};

const styles = StyleSheet.create({

  container: {
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  input: {
    fontFamily: Fonts.PoppinsMedium,
    fontSize: FontsSize._48_SIZE,
    paddingHorizontal: 10,
    paddingVertical: 5,
    minWidth: 120
  },
});