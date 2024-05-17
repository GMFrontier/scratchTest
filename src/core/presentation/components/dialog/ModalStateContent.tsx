

import React, { useContext } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { SvgXml } from 'react-native-svg';
import Fonts from '../../../constants/Fonts';
import FontsSize from '../../../constants/FontsSize';
import { CustomText } from '../text/CustomText';
import { ButtonPrimary } from '../button/ButtonPrimary';
import Sizebox from '../item/Sizebox';
import { ButtonSecondary } from '../button/ButtonSeconday';
import ic_close_outline from '../../../../../assets/svg/ic_close_outline';
import { ThemeContext } from '../../contexts/theme/ThemeContext';

interface Props {
  title: string;
  subtitle: string;
  labelButtonPrimary?: string
  icoModal: any
  actionButtonPrimary: () => void;
  labelButtonSecondary?: string
  actionButtonSecondary: () => void;
  showIconClose?: boolean,
  actionCloseModal?: () => void;
}

export const ModalContent = ({ title, subtitle, labelButtonPrimary, icoModal, actionButtonPrimary, labelButtonSecondary, actionButtonSecondary, showIconClose = false, actionCloseModal }: Props) => {


  const style = StyleSheet.create({
    contentBottomSheetContainer: {
      paddingHorizontal: 24
    }
  });

  return (
    <View style={style.contentBottomSheetContainer}>
      {showIconClose ?
        <TouchableOpacity onPress={actionCloseModal} style={{ position: 'absolute', right: 24, top: 32 }}>
          <SvgXml xml={ic_close_outline} />
        </TouchableOpacity>
        :
        null
      }
      <Sizebox height={34}></Sizebox>

      {icoModal &&
        <View style={{ alignItems: 'center', marginTop: 24 }}>
          <SvgXml xml={icoModal}></SvgXml>
        </View>
      }

      <Sizebox height={24}></Sizebox>
      <CustomText
        textAlign='center'
        fontFamily={Fonts.DMSansBold}
        textSize={FontsSize._24_SIZE}
        text={title} />
      <Sizebox height={8}></Sizebox>

      <CustomText
        textSize={FontsSize._16_SIZE}
        textAlign='center'
        numberOfLines={2}
        text={subtitle} />

      <Sizebox height={36}></Sizebox>

      {
        labelButtonPrimary ?
          <ButtonPrimary
            text={labelButtonPrimary}
            onPress={actionButtonPrimary}
            position='relative' />
          : null
      }

      <Sizebox height={16}></Sizebox>

      {
        labelButtonSecondary ?
          <ButtonSecondary
            text={labelButtonSecondary}
            onPress={actionButtonSecondary}
            position='relative' />
          : null
      }

      <Sizebox height={18}></Sizebox>


    </View>
  );
};
