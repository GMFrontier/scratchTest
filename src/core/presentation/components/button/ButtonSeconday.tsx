import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';
import Fonts from '../../../constants/Fonts';
import FontsSize from '../../../constants/FontsSize';
import { ThemeContext } from '../../contexts/theme/ThemeContext';
import { BaseButton, BaseButtonProps } from './BaseButton'; // Import the BaseButton and BaseButtonProps

interface ButtonSecondaryProps extends BaseButtonProps { }

export const ButtonSecondary = (props: ButtonSecondaryProps) => {
  const { theme: { colors } } = useContext(ThemeContext);
  var height = 56;

  const styles = StyleSheet.create({
    buttonContainer: {
      borderRadius: 8,
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      height: height,
      borderWidth: 1.4,
      borderColor: colors.green07,
      backgroundColor: colors.transparent,
    },
    textStyle: {
      fontFamily: Fonts.PoppinsMedium,
      fontSize: FontsSize._16_SIZE,
      color: colors.green07,
    },
    icoLeft: {
      marginRight: 10,
    },
    icoRight: {
      marginLeft: 10,
    },
  });

  return (
    <BaseButton
      {...props}
      styles={styles}
    />
  );
};
