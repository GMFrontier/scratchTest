

import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { SvgXml } from 'react-native-svg';
import Fonts from '../../../constants/Fonts';
import FontsSize from '../../../constants/FontsSize';
import { CustomText } from '../text/CustomText';
import close_ico_black_content from '../../../../../assets/svg/close_ico_black_content';

interface Props {
  title: string;
  subtitle: string;
  ico: any;

  onClosePress: () => void;

}

export const ModalBasicContent = ({ title, subtitle, ico, onClosePress }: Props) => {


  return (
    <View style={style.contentBottomSheetContainer}>
      <TouchableOpacity style={{ position: 'absolute', right: 0, marginEnd: 26 }} onPress={onClosePress}>
        <SvgXml xml={close_ico_black_content}></SvgXml>
      </TouchableOpacity>
      <View style={{ marginTop: 30 }}>
        <SvgXml xml={ico}></SvgXml>
      </View>
      <CustomText text={title} fontFamily={Fonts.encodesansBold} marginTop={24} textSize={FontsSize._16_SIZE}></CustomText>
      <View style={{ marginStart: 40, marginEnd: 40, marginBottom: 30 }}>
        <CustomText textAlign="center" text={subtitle} fontFamily={Fonts.PoppinsRegular} marginTop={24} textSize={FontsSize._16_SIZE}></CustomText>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  contentBottomSheetContainer: {
    flex: 1,
    flexDirection: 'column',
    alignContent: 'center',
    alignItems: 'center'
  }
});
