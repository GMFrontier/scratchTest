

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SvgXml } from 'react-native-svg';
import Fonts from '../../../constants/Fonts';
import FontsSize from '../../../constants/FontsSize';
import { CustomText } from '../text/CustomText';
import { ButtonPrimary } from '../button/ButtonPrimary';
import Sizebox from '../item/Sizebox';
import { ButtonSecondary } from '../button/ButtonSeconday';
import ic_close_outline from '../../../../../assets/svg/ic_close_outline';

interface Props {
  title: string;
  subtitle: string;
  labelButtonPrimary?: string
  icoModal: any
  actionButtonPrimary: () => void;
  labelButtonSecondary?: string
  actionButtonSecondary: () => void;
  showIconClose?: boolean
}

export const ModalContent = ({ title, subtitle, labelButtonPrimary, icoModal, actionButtonPrimary, labelButtonSecondary, actionButtonSecondary, showIconClose = true }: Props) => {


  return (
    <View style={style.contentBottomSheetContainer}>


      {showIconClose ? <View style={{ position: 'absolute', right: 24, top: 32 }}>
        <SvgXml xml={ic_close_outline}></SvgXml>
      </View> : null}
      <Sizebox height={34}></Sizebox>

      {icoModal &&
        <View style={{ alignItems: 'center', marginTop: 24 }}>
          <SvgXml xml={icoModal}></SvgXml>
        </View>
      }

      <Sizebox height={24}></Sizebox>
      <CustomText textAlign='center' fontFamily={Fonts.PoppinsMedium} textSize={FontsSize._20_SIZE} text={title}></CustomText>
      <Sizebox height={8}></Sizebox>

      <CustomText textSize={FontsSize._16_SIZE} fontFamily={Fonts.PoppinsRegular} textAlign='center' text={subtitle}></CustomText>

      <Sizebox height={24}></Sizebox>


      {labelButtonPrimary ? <ButtonPrimary text={labelButtonPrimary} onPress={actionButtonPrimary}></ButtonPrimary> : null}

      <Sizebox height={16}></Sizebox>

      {labelButtonSecondary ? <ButtonSecondary text={labelButtonSecondary} onPress={actionButtonSecondary}></ButtonSecondary> : null}

      <Sizebox height={18}></Sizebox>


    </View>
  );
};

const style = StyleSheet.create({
  contentBottomSheetContainer: {


    paddingHorizontal: 24
  }
});
