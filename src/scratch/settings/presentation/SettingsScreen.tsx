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
import { useNavigation } from '@react-navigation/native';
import { ROUTES } from '../../navigation/routes';
import SettingsViewModel from './SettingsViewModel';
import container from '../../di/inversify.config';
import { TYPES } from '../../di/types';
import LoginViewModel from '../../auth/presentation/login/LoginViewModel';

export const SettingsScreen = observer(() => {

  const viewModel = container.get<SettingsViewModel>(
    TYPES.SettingsViewModel,
  );

  const loginViewModel = container.get<LoginViewModel>(
    TYPES.LoginViewModel,
  );

  const {
    theme: { colors },
  } = useContext(ThemeContext);

  const showStateModal = useNewModalContext().showStateModal
  const navigation = useNavigation()

  const { translation } = useTranslation();

  return (
    <ToolbarView
      text={'Ajustes'}
    >
      <View style={{ paddingHorizontal: 16 }} >
        <Sizebox height={20} />
        {/* <SettingsButtonItem
          text={"Invita y gana"}
          icon={ic_settings_star}
          onPress={() => { }} /> */}
        <SettingsButtonItem
          text={"Cambio de contraseña"}
          icon={ic_settings_pass}
          onPress={() => {
            loginViewModel.setComesFromSettings()
            navigation.navigate(ROUTES.Auth.PasswordScreen.name as never)
          }} />
        <SettingsButtonItem
          text={"Acerca de nosotros"}
          icon={ic_settings_about}
          onPress={() => { navigation.navigate(ROUTES.Settings.AboutUsScreen.name as never) }} />
        <SettingsButtonItem
          text={"Términos y condiciones"}
          icon={ic_settings_tyc}
          onPress={() => { navigation.navigate(ROUTES.Settings.TyCScreen.name as never) }} />
        <SettingsButtonItem
          text={"Políticas de privacidad"}
          icon={ic_settings_privacy}
          onPress={() => { navigation.navigate(ROUTES.Settings.PrivactPolicyScreen.name as never) }} />
        <SettingsButtonItem
          text={"Preguntas frecuentes"}
          icon={ic_settings_faq}
          onPress={() => { navigation.navigate(ROUTES.Settings.FAQScreen.name as never) }} />
        <SettingsButtonItem
          text={"Contactar a soporte"}
          icon={ic_settings_support}
          onPress={() => { navigation.navigate(ROUTES.Settings.SupportScreen.name as never) }} />

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