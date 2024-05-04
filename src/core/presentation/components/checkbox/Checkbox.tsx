import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { SvgXml } from 'react-native-svg';
import check_box_active_content from '../../../../../assets/svg/xml/check_box_active_content';
import check_box_inactive_content from '../../../../../assets/svg/xml/check_box_inactive_content';
import { CustomTextEndBold } from '../text/CustomTextBoldEnd';
import Fonts from '../../../constants/Fonts';
import FontsSize from '../../../constants/FontsSize';

interface Props {
  label?: string;
  labelEnd?: string;
  checked: boolean;
  onToggle: (value: boolean) => void;
  uncheckedImage?: any;
  checkedImage?: any;
  space?: number
  size?: number,
  marginEnd?: number;
  fontFamily?: string;
  fontFamilyEnd?: string;
  textSize?: number;
}

export const Checkbox = ({ label, labelEnd, checked, onToggle, uncheckedImage, checkedImage, space = 5, size = 30, marginEnd = 8, fontFamily = Fonts.encodesansBold, fontFamilyEnd, textSize = 14 }: Props) => {
  const handleToggle = () => {
    onToggle(!checked);
  };

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    checkboxContainer: {
      width: 20,
      height: 20,
      marginEnd: marginEnd,
    },
    checkbox: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    checkedImage: {
      width: 30,
      height: 30,

    },
  });

  return (
    <TouchableOpacity style={styles.container} onPress={handleToggle}>
      <View style={{ flexDirection: 'row', alignSelf: 'center', alignItems: "center" }}>
        <View >
          {checked ? (
            checkedImage ? (
              <SvgXml xml={checkedImage} style={styles.checkedImage} width={size} height={size} preserveAspectRatio="xMinYMin slice" />
            ) : (
              <SvgXml xml={check_box_active_content} width={size} height={size} preserveAspectRatio="xMinYMin slice" />
            )
          ) : uncheckedImage ? (
            <SvgXml xml={uncheckedImage} style={styles.checkedImage} width={size} height={size} preserveAspectRatio="xMinYMin slice" />
          ) : (
            <SvgXml xml={check_box_inactive_content} width={size} height={size} preserveAspectRatio="xMinYMin slice" />
          )}
        </View>
        <View style={{ width: space }}></View>
        {label ? (<CustomTextEndBold text={label} textEnd={labelEnd} fontFamily={fontFamily} fontFamilyEnd={fontFamilyEnd} textSize={textSize} />) : null}
      </View>
    </TouchableOpacity>
  );
};
