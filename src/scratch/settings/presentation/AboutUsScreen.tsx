import { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, ScrollView, TouchableOpacity, Image } from 'react-native';
import { observer } from 'mobx-react-lite';
import { reaction } from 'mobx';
import { ThemeContext } from '../../../core/presentation/contexts/theme/ThemeContext';
import { useNewModalContext } from '../../../core/presentation/contexts/messages/useNewModalContext';
import { useTranslation } from '../../../core/presentation/contexts/translations/LanguageProvider';
import SettingsButtonItem from '../../../core/presentation/components/item/SettingsButtonItem';
import ic_settings_star from '../../../../assets/svg/ic_settings_star';
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
import { CustomText } from '../../../core/presentation/components/text/CustomText';

export const AboutUsScreen = observer(() => {

  const {
    theme: { colors },
  } = useContext(ThemeContext);

  const showStateModal = useNewModalContext().showStateModal

  const { translation } = useTranslation();

  return (
    <ToolbarView
      text={'Sobre nosotros'}
    >
      <View style={{ paddingHorizontal: 16, marginTop: 24 }} >
        <CustomText
          text='
        Lorem mollit cupidatat irure. Laborum magna nulla duis ullamco cillum dolor. Voluptate exercitation incididunt aliquip deserunt reprehenderit elit laborum.Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis ullamco cillum dolor. Voluptate exercitation incididunt aliquip deserunt reprehenderit elit laborum. nulla Lorem mollit cupidatat irure. Laborum magna nulla duis ullamco cillum dolor. Voluptate exercitation incididunt aliquip deserunt reprehenderit elit laborum.

Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et. Sunt qui esse pariatur duis deserunt mollit dolore cillum minim tempor enim. Elit aute irure tempor cupidatat incididunt sint deserunt ut voluptate aute id deserunt nisi.'
        />
        <CustomText
          marginTop={24}
          text='
      
nulla Lorem mollit cupidatat irure. Laborum magna nulla duis ullamco cillum dolor. Voluptate exercitation incididunt aliquip deserunt reprehenderit elit laborum.
nulla Lorem mollit cupidatat irure. Laborum magna nulla duis ullamco cillum dolor. Voluptate exercitation incididunt aliquip deserunt reprehenderit elit laborum..

Lorem mollit cupidatat irure. Laborum magna nulla duis ullamco cillum dolor. Voluptate exercitation incididunt aliquip deserunt reprehenderit elit laborum.Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis'
        />

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