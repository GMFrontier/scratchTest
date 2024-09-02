import { useContext, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { observer } from 'mobx-react-lite';
import React = require('react');
import { ThemeContext } from '../../../../core/presentation/contexts/theme/ThemeContext';
import { useTranslation } from '../../../../core/presentation/contexts/translations/LanguageProvider';
import { CustomText } from '../../../../core/presentation/components/text/CustomText';
import Fonts from '../../../../core/constants/Fonts';
import FontsSize from '../../../../core/constants/FontsSize';
import { useNavigation } from '@react-navigation/native';
import changeNavigationBarColor from 'react-native-navigation-bar-color';
import ToolbarView from '../../../../core/presentation/components/toolbar/ToolbarView';
import { TextInputMain } from '../../../../core/presentation/components/input/TextInputMain';
import { ButtonPrimary } from '../../../../core/presentation/components/button/ButtonPrimary';
import { useStatusBar } from '../../../../core/presentation/contexts/statusBar/StatusBarContext';
import { ROUTES } from '../../../navigation/routes';
import { NavigationProps } from '../../../navigation/StackNavigator';
import container from '../../../di/inversify.config';
import LoginViewModel from '../login/LoginViewModel';
import { TYPES } from '../../../di/types';
import { reaction } from 'mobx';
import ic_exclamation_error_filled_48 from '../../../../../assets/svg/ic_exclamation_error_filled_48';

export const RecoverPasswordScreen = observer(({ route }: NavigationProps) => {
  var data = undefined
  if (route.params && route.params.email) data = route.params.email

  const viewModel = container.get<LoginViewModel>(
    TYPES.LoginViewModel,
  );

  const {
    theme: { colors },
  } = useContext(ThemeContext);
  const PIN_LENGTH = 6
  const { translation } = useTranslation();
  const nav = useNavigation()
  const [email, setEmail] = useState('');

  React.useEffect(() => {
    changeNavigationBarColor(colors.accent);
  })
  React.useEffect(() => {
    if (data) setEmail(data)
  }, [data])

  reaction(
    () => viewModel.emailSuccess,
    () => {
      nav.navigate(ROUTES.Auth.RecoverPasswordEmailValidationScreen.name as never)
    }
  )

  reaction(
    () => viewModel.showError,
    () => {
      showStateModal({
        title: "Ha ocurrido un problema",
        message: "Intentelo nuevamente más tarde.",
        image: ic_exclamation_error_filled_48,
        showIcoClose: true,
        size: "30%"
      })
    }
  )

  return (
    <ToolbarView
      text='Restablecimiento de contraseña'>
      <View style={style.containerMain}>
        <CustomText
          marginTop={20}
          text={"Ingresa tu correo electrónico"}
          textColor={colors.secondary}
          fontFamily={Fonts.DMSansBold}
          textSize={FontsSize._32_SIZE} />

        <CustomText
          text={"Te enviaremos un código de verificación para reestablecer tu contraseña"}
          marginTop={8}
          fontFamily={Fonts.DMSansRegular}
          textSize={FontsSize._16_SIZE} />

        <TextInputMain
          marginTop={48}
          inputValue={email}
          inputType='email'
          showError={true}
          onChangeText={setEmail}
          labelTitleRequired={true}
          labelTitle={translation.file.email}
          placeholder={translation.file.email_placeholder} />

        <ButtonPrimary
          text={translation.file.next}
          disabled={email.trim().length <= 0}
          onPress={() => {
            viewModel.recoverPassword(email)
          }}
        />
      </View>
    </ToolbarView>
  );
});


const style = StyleSheet.create({
  containerMain: {
    flex: 1,
    paddingHorizontal: 16,
  },
  keyboardContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
});

function showStateModal(arg0: { title: string; message: string; image: any; showIcoClose: boolean; size: string; }) {
  throw new Error('Function not implemented.');
}
