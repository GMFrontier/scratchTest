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
import SettingsButtonItem from '../../../core/presentation/components/item/SettingsButtonItem';
import ic_info_blue_filled from '../../../../assets/svg/ic_info_blue_filled';
import ic_settings_star from '../../../../assets/svg/ic_settings_star';
import { CustomText } from '../../../core/presentation/components/text/CustomText';
import FontsSize from '../../../core/constants/FontsSize';
import ToolbarView from '../../../core/presentation/components/toolbar/ToolbarView';
import Sizebox from '../../../core/presentation/components/item/Sizebox';
import ic_settings_id from '../../../../assets/svg/ic_settings_id';
import ic_settings_pass from '../../../../assets/svg/ic_settings_pass';
import ic_settings_about from '../../../../assets/svg/ic_settings_about';
import ic_settings_tyc from '../../../../assets/svg/ic_settings_tyc';
import ic_settings_privacy from '../../../../assets/svg/ic_settings_privacy';
import ic_settings_faq from '../../../../assets/svg/ic_settings_faq';
import ic_settings_support from '../../../../assets/svg/ic_settings_support';

export const SettingsScreen = observer(() => {

  const {
    theme: { colors },
  } = useContext(ThemeContext);

  const showStateModal = useNewModalContext().showStateModal

  const { translation } = useTranslation();

  return (
    <ToolbarView
      text={'Ajustes'}
      showArrowBack={false}
      textSize={FontsSize._16_SIZE}
    >
      <View style={{ paddingHorizontal: 16 }} >
        <Sizebox height={20} />
        <SettingsButtonItem
          text={"Invita y gana"}
          icon={ic_settings_star}
          onPress={() => { }} />
        <SettingsButtonItem
          text={"Mi identificacion"}
          icon={ic_settings_id}
          onPress={() => { }} />
        <SettingsButtonItem
          text={"Cambio de PIN"}
          icon={ic_settings_pass}
          onPress={() => { }} />
        <SettingsButtonItem
          text={"Acerca de nosotros"}
          icon={ic_settings_about}
          onPress={() => { }} />
        <SettingsButtonItem
          text={"Términos y condiciones"}
          icon={ic_settings_tyc}
          onPress={() => { }} />
        <SettingsButtonItem
          text={"Políticas de privacidad"}
          icon={ic_settings_privacy}
          onPress={() => { }} />
        <SettingsButtonItem
          text={"Preguntas frecuentes"}
          icon={ic_settings_faq}
          onPress={() => { }} />
        <SettingsButtonItem
          text={"Contactar a soporte"}
          icon={ic_settings_support}
          onPress={() => { }} />

      </View>
    </ToolbarView>
  );
});

const style = StyleSheet.create({
  containerMain: {
    flex: 1,
    paddingHorizontal: 16
  },
});