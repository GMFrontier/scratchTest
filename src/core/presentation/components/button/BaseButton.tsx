import React, { useContext } from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { SvgXml } from 'react-native-svg';
import Fonts from '../../../constants/Fonts';
import FontsSize from '../../../constants/FontsSize';
import { ComponentSize } from '../../../data/enum/ComponentSize';
import { ComponentType } from '../../../data/enum/ComponentType';
import { ThemeContext } from '../../contexts/theme/ThemeContext';

export interface BaseButtonProps {
  text: string;
  imageStart?: any;
  imageEnd?: any;
  isEnabled?: boolean;
  size?: ComponentSize;
  type?: ComponentType;
  styles?: any;
  onPress: () => void;
}

export const BaseButton = ({
  text,
  imageEnd,
  imageStart,
  isEnabled = true,
  size = ComponentSize.large,
  onPress,
  styles = undefined
}: BaseButtonProps) => {
  const { theme: { colors } } = useContext(ThemeContext);

  var height = 56;
  var textSize = FontsSize._16_SIZE;

  if (!styles) {
    styles = StyleSheet.create({
      buttonContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: height,
        borderRadius: 8,
        backgroundColor: colors.primary,
      },
      textStyle: {
        fontFamily: Fonts.PoppinsMedium,
        fontSize: textSize,
        color: isEnabled ? colors.white : colors.textColor04,
      },
      icoLeft: {
        marginRight: 10,
      },
      icoRight: {
        marginLeft: 10,
      },
      disabledButtonContainer: {
        backgroundColor: colors.disabledBgPrimaryButton,
      },
    });
  }

  switch (size) {
    case ComponentSize.small:
      textSize = FontsSize._14_SIZE;
      styles.buttonContainer.height = 32;
      break;
    case ComponentSize.medium:
      textSize = FontsSize._16_SIZE;
      styles.buttonContainer.height = 48;
      break;
    case ComponentSize.large:
      textSize = FontsSize._18_SIZE;
      styles.buttonContainer.height = 56;
      break;
  }

  return (
    <TouchableOpacity onPress={onPress} disabled={!isEnabled}>
      <View style={[styles.buttonContainer, !isEnabled && styles.disabledButtonContainer]}>
        {imageStart && <View style={styles.icoLeft}><SvgXml xml={imageStart} /></View>}
        <Text style={styles.textStyle}>{text}</Text>
        {imageEnd && <View style={styles.icoRight}><SvgXml xml={imageEnd} /></View>}
      </View>
    </TouchableOpacity>
  );
};
