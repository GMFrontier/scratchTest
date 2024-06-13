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
import { CommonActions, StackActions, useNavigation } from '@react-navigation/native';
import { ROUTES } from '../../../navigation/routes';
import changeNavigationBarColor from 'react-native-navigation-bar-color';
import { TextInputMain } from '../../../../core/presentation/components/input/TextInputMain';
import { ButtonPrimary } from '../../../../core/presentation/components/button/ButtonPrimary';
import { ButtonSecondary } from '../../../../core/presentation/components/button/ButtonSecondary';
import Sizebox from '../../../../core/presentation/components/item/Sizebox';
import { Translations } from '../../../../core/presentation/contexts/translations/Translations';
import { useBiometrics } from '../../../../core/presentation/utils/biometric/BiometricUtils';

export const PasswordScreen = observer(() => {

  const {
    theme: { colors },
  } = useContext(ThemeContext);
  const { translation } = useTranslation();
  const nav = useNavigation()

  const { isBiometricAvailable, biometricPrompt } = useBiometrics()

  const [user, setUser] = useState<boolean>(false);
  const [password, setPassword] = useState<string>();
  const [backendError, setBackendError] = useState<string>();
  const [showBiometricButton, setShowBiometricButton] = useState(true);

  React.useEffect(() => {
    setUser(false)
    // setBackendError("Contraseña inválida, inténtalo nuevamente")
  })

  React.useEffect(() => {
    changeNavigationBarColor(colors.accent);
  })

  isBiometricAvailable(
    () => { setShowBiometricButton(true) },
    () => { setShowBiometricButton(false) }
  )

  const handleBiometricLogin = (translationFile: Translations) => {
    biometricPrompt(
      "translationFile.file.biometric_unlocking",
      "translationFile.file.your_biometric_is_not_associated_with_any_account",
      () => {
        //  viewModel.biometricsLogin() 
      })
  }

  return (
    <View style={style.containerMain}>
      <View style={{ alignSelf: "flex-end", marginTop: 20 }} >
        <ButtonLink
          text={"Acceder a otra cuenta"}
          onPress={() => {
            nav.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [
                  { name: ROUTES.Home.HomeScreen.name },
                ],
              })
            )
          }} />
      </View>
      <View style={{
        marginTop: 140,
        alignSelf: "center",
        alignItems: "center",
      }} >
        <AvatarImage size={56} />

        <CustomText
          text={"Hola, Gabriela Carolina"}
          marginTop={16}
          textSize={FontsSize._16_SIZE}
          fontFamily={Fonts.DMSansMedium}
          textColor={colors.blue50} />
      </View>

      <CustomText
        text={"ejemplo@mail.com.ar"}
        marginTop={10}
        textSize={FontsSize._16_SIZE}
        fontFamily={Fonts.DMSansMedium}
        textColor={colors.blue50} />

      <TextInputMain
        marginTop={32}
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
          nav.navigate(ROUTES.Auth.RecoverPasswordScreen.name as never)
        }} />

      <View style={{ position: "absolute", width: "100%", bottom: 32 }}  >

        <ButtonPrimary
          text={"Acceder"}
          position='relative'
          onPress={() => {
            nav.navigate(ROUTES.Home.HomeScreen.name as never)
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