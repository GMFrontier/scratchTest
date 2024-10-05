import { useContext, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { observer } from 'mobx-react-lite';
import React = require('react');
import { ThemeContext } from '../../../../core/presentation/contexts/theme/ThemeContext';
import { useTranslation } from '../../../../core/presentation/contexts/translations/LanguageProvider';
import { CustomText } from '../../../../core/presentation/components/text/CustomText';
import Fonts from '../../../../core/constants/Fonts';
import FontsSize from '../../../../core/constants/FontsSize';
import { ButtonLink } from '../../../../core/presentation/components/button/ButtonLink';
import { AvatarImage } from '../../../../core/presentation/components/image/avatar';
import { CommonActions, StackActions, useFocusEffect, useNavigation } from '@react-navigation/native';
import { ROUTES } from '../../../navigation/routes';
import changeNavigationBarColor from 'react-native-navigation-bar-color';
import { TextInputMain } from '../../../../core/presentation/components/input/TextInputMain';
import { ButtonPrimary } from '../../../../core/presentation/components/button/ButtonPrimary';
import Sizebox from '../../../../core/presentation/components/item/Sizebox';
import { Translations } from '../../../../core/presentation/contexts/translations/Translations';
import { useBiometrics } from '../../../../core/presentation/utils/biometric/BiometricUtils';
import { NavigationProps } from '../../../navigation/StackNavigator';
import container from '../../../di/inversify.config';
import LoginViewModel from './LoginViewModel';
import { TYPES } from '../../../di/types';
import { reaction } from 'mobx';
import { useNewModalContext } from '../../../../core/presentation/contexts/messages/useNewModalContext';
import ic_exclamation_error_filled_48 from '../../../../../assets/svg/ic_exclamation_error_filled_48';
import SplashScreen from 'react-native-splash-screen';
import RegisterViewModel from '../register/RegisterViewModel';
import { useStatusBar } from '../../../../core/presentation/contexts/statusBar/StatusBarContext';
import ic_default_avatar from '../../../../../assets/svg/ic_default_avatar';

export const PasswordScreen = observer(({ route }: NavigationProps) => {
  var email = undefined
  if (route.params && route.params.email) email = route.params.email

  const viewModel = container.get<LoginViewModel>(
    TYPES.LoginViewModel,
  );

  const {
    theme: { colors },
  } = useContext(ThemeContext);
  const { translation } = useTranslation();
  const nav = useNavigation()
  const statusBar = useStatusBar()

  const { isBiometricAvailable, biometricPrompt } = useBiometrics()
  const showStateModal = useNewModalContext().showStateModal

  const [password, setPassword] = useState<string>();
  const [backendError, setBackendError] = useState<string>();
  const [showBiometricButton, setShowBiometricButton] = useState(true);

  React.useEffect(() => {
    SplashScreen.hide();
    // setBackendError("Contraseña inválida, inténtalo nuevamente")
  })

  useFocusEffect(() => {
    changeNavigationBarColor(colors.accent);
    statusBar.setPrimaryStatusBar()
  })

  isBiometricAvailable(
    () => { setShowBiometricButton(true) },
    () => { setShowBiometricButton(false) }
  )

  const handleBiometricLogin = (translationFile: Translations) => {
    biometricPrompt(
      "Acceso con biométrico",
      "Tu biométrico no está asociado a ninguna cuenta",
      () => {
        viewModel.biometricsLogin()
      })
  }

  React.useEffect(() => {
    return reaction(
      () => viewModel.loginSuccess,
      () => {
        if (!viewModel.user.isCreateWallet) {
          const registerViewModel = container.get<RegisterViewModel>(
            TYPES.RegisterViewModel,
          );
          registerViewModel.setUser(viewModel.user, password)
          nav.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [
                { name: ROUTES.Auth.RegisterAddressScreen.name },
              ],
            })
          );
          return
        }
        if (!viewModel.user.isCompleteFinancialInfo) {
          const registerViewModel = container.get<RegisterViewModel>(
            TYPES.RegisterViewModel,
          );
          registerViewModel.setUser(viewModel.user, password)
          nav.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [
                { name: ROUTES.Auth.RegisterFinancial2Screen.name },
              ],
            })
          );
          return
        }
        nav.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [
              { name: ROUTES.Navigator.BottomTabNavigator.name },
            ],
          })
        );
      }
    )

  })

  reaction(
    () => viewModel.showError,
    () => {
      showStateModal({
        title: "Ha ocurrido un problema",
        message: "Email o contraseña incorrectos",
        image: ic_exclamation_error_filled_48,
        showIcoClose: true,
        size: "30%"
      })
    }
  )

  return (
    <View style={style.containerMain}>
      {
        true &&
        <View style={{ alignSelf: "flex-end", top: 20, position: "absolute", right: 16 }} >
          <ButtonLink
            text={"Acceder a otra cuenta"}
            onPress={() => {
              nav.dispatch(
                CommonActions.reset({
                  index: 0,
                  routes: [
                    { name: ROUTES.Auth.LoginScreen.name },
                  ],
                })
              )
            }} />
        </View>
      }
      {
        viewModel.user &&
        <View style={{
          marginTop: 130,
          alignSelf: "center",
          alignItems: "center",
        }} >
          <AvatarImage size={56} svg={ic_default_avatar} />

          <CustomText
            text={"Hola, " + viewModel.user.name + " " + viewModel.user.lastName}
            marginTop={16}
            textSize={FontsSize._16_SIZE}
            fontFamily={Fonts.DMSansMedium}
            textColor={colors.blue50} />
        </View>
      }

      {
        !viewModel.user &&
        <View style={{
          marginTop: 201,
          alignSelf: "center",
          alignItems: "center",
        }} >
          <CustomText
            text={email ?? "ejemplo@mail.com.ar"}
            marginTop={10}
            textSize={FontsSize._16_SIZE}
            fontFamily={Fonts.DMSansMedium}
            textColor={colors.blue50} />
        </View>
      }

      <TextInputMain
        marginTop={72}
        inputValue={password}
        onChangeText={setPassword}
        inputType="password"
        backendError={backendError}
        labelTitleRequired={true}
        labelTitle={"Contraseña"}
        placeholder={"Ingresa tu contraseña"} />

      <Sizebox height={72} />

      <ButtonLink
        text={"¿Olvidaste tu contraseña?"}
        onPress={() => {
          const args = {
            email: email ?? viewModel.user.email
          }
          nav.navigate(ROUTES.Auth.RecoverPasswordScreen.name as never, args)
        }} />

      <View style={{ position: "absolute", width: "100%", bottom: 32 }}  >

        <ButtonPrimary
          text={"Acceder"}
          position='relative'
          onPress={() => {
            viewModel.login(email ?? "", password)
          }} />

        <Sizebox height={8} />

        {showBiometricButton && <ButtonPrimary
          text={"Acceder con biométrico"}
          position='relative'
          buttonType='secondary'
          onPress={() => { handleBiometricLogin(translation) }} />}
      </View>

    </View>
  );
});


const style = StyleSheet.create({
  containerMain: {
    flex: 1,
    paddingHorizontal: 16,
    alignSelf: "center",
    alignContent: "center",
    alignItems: "center",
  }
});