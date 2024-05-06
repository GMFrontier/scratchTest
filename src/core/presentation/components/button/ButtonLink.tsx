import { useContext } from 'react';
import { StyleSheet } from 'react-native';
import Fonts from '../../../constants/Fonts';
import FontsSize from '../../../constants/FontsSize';
import { ThemeContext } from '../../contexts/theme/ThemeContext';
import { BaseButton, BaseButtonProps } from './BaseButton'; // Import the BaseButton and BaseButtonProps
import { TouchableOpacity } from 'react-native-gesture-handler';
import { CustomText } from '../text/CustomText';

interface ButtonLinkProps extends BaseButtonProps { }

export const ButtonLink = (props: ButtonLinkProps) => {
  const { theme: { colors } } = useContext(ThemeContext);

  var height = 44;
  const backGroundColor = colors.secondaryBlue03
  const textColor = colors.onboardingTitle
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
    <TouchableOpacity onPress={props.onPress}>
      <CustomText
        text={props.text}
        underline={true}
        textSize={FontsSize._14_SIZE}
        fontFamily={Fonts.DMSansMedium}
        textColor={colors.onboardingTitle}
      />
    </TouchableOpacity>
  );
};
