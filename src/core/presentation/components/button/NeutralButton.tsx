import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';
import Fonts from '../../../constants/Fonts';
import FontsSize from '../../../constants/FontsSize';
import { ThemeContext } from '../../contexts/theme/ThemeContext';
import { BaseButton, BaseButtonProps } from './BaseButton'; // Import the BaseButton and BaseButtonProps

interface ButtonNeutralProps extends BaseButtonProps { }

export const ButtonNeutral = (props: ButtonNeutralProps) => {
  const { theme: { colors } } = useContext(ThemeContext);

  var height = 44;
  const backGroundColor = colors.secondaryBlue03
  const textColor = colors.textColor02
  var fontSize = FontsSize._14_SIZE;

  const styles = StyleSheet.create({
    buttonContainer: {
      borderRadius: 8,
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'center',
      fontFamily: Fonts.PoppinsMedium,
      alignItems: 'center',
      height: height,
      backgroundColor: backGroundColor,
    },
    textStyle: {
      color: textColor,
      fontFamily: Fonts.PoppinsMedium,
      fontSize: fontSize,
    },
    icoRight: {
      left: 10,
    },
    disabledButtonContainer: {
      backgroundColor: colors.disabledBgPrimaryButton,
    },
  });

  return (
    <BaseButton
      {...props}
      styles={styles}
    />
  );
};
