import { useContext, useState } from 'react';
import { StyleSheet, TouchableHighlight, View } from 'react-native';
import Fonts from '../../../constants/Fonts';
import FontsSize from '../../../constants/FontsSize';
import { ThemeContext } from '../../contexts/theme/ThemeContext';
import { BaseButton, BaseButtonProps } from './BaseButton'; // Import the BaseButton and BaseButtonProps
import { TouchableOpacity } from 'react-native-gesture-handler';
import { CustomText } from '../text/CustomText';
import { SvgXml } from 'react-native-svg';

interface ButtonLinkProps extends BaseButtonProps { }

export const ButtonLink = (props: ButtonLinkProps) => {
  const { theme: { colors } } = useContext(ThemeContext);
  const [isPressed, setIsPressed] = useState(false);

  var height = 44;
  const backGroundColor = colors.secondaryBlue03
  const textColor = colors.secondary
  var fontSize = FontsSize._14_SIZE;

  var defaultStyles = StyleSheet.create({
    textStyle: {
      fontFamily: Fonts.DMSansMedium,
      fontSize: FontsSize._14_SIZE,
      color: colors.secondary
    },
  });

  if (isPressed) {
    defaultStyles = {
      ...defaultStyles,
      textStyle: { ...defaultStyles.textStyle, color: "#8FABFF" },
    };
  }

  // if (disabled) {
  //   defaultStyles = {
  //     ...defaultStyles,
  //     buttonContainer: { ...defaultStyles.buttonContainer, backgroundColor: colors.disableText },
  //     textStyle: { ...defaultStyles.textStyle, color: colors.white },
  //   };
  // }

  return (
    <TouchableHighlight
      underlayColor='none'
      onPressIn={() => setIsPressed(true)} // Set isPressed to true when pressed
      onPressOut={() => setIsPressed(false)} // Set isPressed to false when released
      onPress={props.onPress}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center"
        }}>
        {props.imageStart &&
          <SvgXml xml={props.imageStart} style={{ marginEnd: 4 }} height={18} width={18} />
        }
        <CustomText
          text={props.text}
          underline={true}
          textSize={defaultStyles.textStyle.fontSize}
          fontFamily={defaultStyles.textStyle.fontFamily}
          textColor={defaultStyles.textStyle.color}
        />
        {props.imageEnd &&
          <SvgXml xml={props.imageEnd} style={{ marginStart: 4 }} height={18} width={18} />
        }
      </View>
    </TouchableHighlight>
  );
};
