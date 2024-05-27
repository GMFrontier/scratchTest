import { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, ScrollView, TouchableOpacity, Image } from 'react-native';
import { observer } from 'mobx-react-lite';
import { reaction } from 'mobx';
import { ThemeContext } from '../../../core/presentation/contexts/theme/ThemeContext';
import { useStatusBar } from '../../../core/presentation/contexts/statusBar/StatusBarContext';
import { useNewModalContext } from '../../../core/presentation/contexts/messages/useNewModalContext';
import { useTranslation } from '../../../core/presentation/contexts/translations/LanguageProvider';
import { CustomTextBold } from '../../../core/presentation/components/text/CustomTextBold';
import React = require('react');
import changeNavigationBarColor from 'react-native-navigation-bar-color';
import { CustomText } from '../../../core/presentation/components/text/CustomText';
import { AvatarImage } from '../../../core/presentation/components/image/avatar';
import Sizebox from '../../../core/presentation/components/item/Sizebox';
import FontsSize from '../../../core/constants/FontsSize';
import Fonts from '../../../core/constants/Fonts';
import { SvgXml } from 'react-native-svg';
import info_circle_blue_ico_content from '../../../../assets/svg/info_circle_blue_ico_content';
import ic_info_blue_dark_filled from '../../../../assets/svg/ic_info_blue_dark_filled';
import ic_eye_open_outline from '../../../../assets/svg/ic_eye_open_outline';
import ic_avatar_empty_profile from '../../../../assets/svg/ic_avatar_empty_profile';

export const HomeScreen = observer(() => {

  const {
    theme: { colors },
  } = useContext(ThemeContext);

  const statusBar = useStatusBar()

  const showStateModal = useNewModalContext().showStateModal

  const { translation } = useTranslation();

  return (
    <View style={style.containerMain}>
      <View
        style={{
          backgroundColor: colors.blue400,
          borderRadius: 16,
          paddingVertical: 16,
          paddingStart: 24,
          paddingEnd: 24,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-around"
        }}
      >
        <View>
          <View style={{ flexDirection: "row", alignItems: "center" }} >
            <AvatarImage size={32} svg={ic_avatar_empty_profile} />
            <Sizebox width={8} />
            <CustomText
              textSize={FontsSize._16_SIZE}
              textColor={colors.white}
              text='Hola Gabriela' />
          </View>
          <CustomText
            marginTop={4}
            textSize={FontsSize._16_SIZE}
            textColor={colors.white}
            fontFamily={Fonts.DMSansMedium}
            text='Limite pre-aprobado' />
          <View style={{ flexDirection: "row", alignItems: "center", marginTop: 4 }} >
            <CustomText
              textSize={FontsSize._24_SIZE}
              textColor={colors.white}
              fontFamily={Fonts.DMSansMedium}
              text='$' />
            <Sizebox width={4} />
            <CustomText
              fontFamily={Fonts.DMSansBold}
              textSize={FontsSize._48_SIZE}
              textColor={colors.white}
              text='50.00' />
          </View>
          <View style={{ flexDirection: "row", marginTop: 8, paddingEnd: 16 }} >
            <SvgXml height={16} width={16} xml={ic_info_blue_dark_filled} style={{ marginEnd: 8 }} />
            <CustomText
              textColor={colors.white}
              text={"Estamos en terminando de revisar tu perfil para aprobar el total de tu primera línea de crédito"}
              textSize={FontsSize._12_SIZE} />
          </View>
        </View>
        <SvgXml
          xml={
            true
              ? ic_eye_open_outline
              : ic_eye_open_outline
          }
        />
      </View>
    </View>
  );
});

const style = StyleSheet.create({
  containerMain: {
    flex: 1,
    padding: 16
  },
});