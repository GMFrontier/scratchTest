import { useContext, useState } from 'react';
import { View, StyleSheet, NativeEventEmitter, NativeModules } from 'react-native';
import { observer } from 'mobx-react-lite';
import React = require('react');
import { ThemeContext } from '../../../../core/presentation/contexts/theme/ThemeContext';
import { useTranslation } from '../../../../core/presentation/contexts/translations/LanguageProvider';
import { CustomText } from '../../../../core/presentation/components/text/CustomText';
import Fonts from '../../../../core/constants/Fonts';
import FontsSize from '../../../../core/constants/FontsSize';
import { ButtonPrimary } from '../../../../core/presentation/components/button/ButtonPrimary';
import { useNavigation } from '@react-navigation/native';
import Sizebox from '../../../../core/presentation/components/item/Sizebox';
import changeNavigationBarColor from 'react-native-navigation-bar-color';
import ToolbarView from '../../../../core/presentation/components/toolbar/ToolbarView';
import DocumentPicker from 'react-native-document-picker';
import { ROUTES } from '../../../navigation/routes';
import { reaction } from 'mobx'
import RegisterViewModel from './RegisterViewModel';
import container from '../../../di/inversify.config';
import { TYPES } from '../../../di/types';
import { MetaMapRNSdk } from 'react-native-metamap-sdk';
import LoginViewModel from '../login/LoginViewModel';

export const RegisterIdValidationScreen = observer(() => {

  const viewModel = container.get<RegisterViewModel>(
    TYPES.RegisterViewModel,
  );

  const loginViewModel = container.get<LoginViewModel>(
    TYPES.LoginViewModel,
  );

  const {
    theme: { colors },
  } = useContext(ThemeContext);
  const { translation } = useTranslation();
  const nav = useNavigation()

  // React.useEffect(() => {
  //   changeNavigationBarColor(colors.accent);
  // })

  React.useEffect(() => {
    return reaction(
      () => viewModel.step4Success,
      () => {
        loginViewModel.login(viewModel.user.email, viewModel.user.password)

      }
    )
  }, [])

  React.useEffect(() => {
    return reaction(
      () => loginViewModel.loginSuccess,
      () => {
        nav.navigate(ROUTES.Auth.RegisterFinancial2Screen.name as never)
      }
    )
  })


  React.useEffect(() => {
    const MetaMapVerifyResult = new NativeEventEmitter(NativeModules.MetaMapRNSdk)
    const successListener = MetaMapVerifyResult.addListener('verificationSuccess', () => {
      // viewModel.logIn();
      successListener.remove()
    })

    const canceledListener = MetaMapVerifyResult.addListener('verificationCanceled', (data) => {
      console.log(data)
      canceledListener.remove()
    }
    )
  }, [])


  const handleMetaMapClickButton = () => {
    var metadata = viewModel.getSDKMetadata()
    MetaMapRNSdk.showFlow(viewModel.getClientId(), viewModel.getFlowId(), metadata);
  }



  React.useEffect(() => {
    return reaction(
      () => loginViewModel.loginSuccess,
      () => {
        nav.navigate(ROUTES.Auth.RegisterCompleteScreen.name as never)
      }
    )
  })

  return (
    <ToolbarView
      text={"Validación de identidad"} >

      <View
        style={style.containerMain}>

        <CustomText
          text={"Validemos tu\nidentidad"}
          textColor={colors.secondary}
          fontFamily={Fonts.DMSansBold}
          textSize={FontsSize._32_SIZE} />

        <CustomText
          text='Para garantizar la seguridad de tu cuenta, necesitamos verificar tu identidad.'
          textSize={FontsSize._16_SIZE}
          marginTop={8} />

        <CustomText
          text='Por favor, sigue los pasos a continuación:'
          textSize={FontsSize._16_SIZE}
          marginTop={8} />

        <View style={{ flexDirection: "row", marginTop: 32 }} >
          <CustomText
            text={'1. '}
            textSize={FontsSize._16_SIZE}
            fontFamily={Fonts.DMSansMedium}
          />
          <CustomText
            text={'Haz clic en el botón \"Iniciar validación\" a continuación.'}
            textSize={FontsSize._16_SIZE}
            fontFamily={Fonts.DMSansMedium} />
        </View>

        <View style={{ flexDirection: "row" }} >
          <CustomText
            text={'2. '}
            textSize={FontsSize._16_SIZE}
            fontFamily={Fonts.DMSansMedium} />
          <CustomText
            text={'Asegúrate de tener a mano un documento de identificación válido (DNI, pasaporte, etc.).'}
            textSize={FontsSize._16_SIZE}
            fontFamily={Fonts.DMSansMedium} />
        </View>
        <View style={{ flexDirection: "row" }} >
          <CustomText
            text={'3. '}
            textSize={FontsSize._16_SIZE}
            fontFamily={Fonts.DMSansMedium} />
          <CustomText
            text={'Sigue las instrucciones en pantalla y, en pocos minutos, completaras el proceso.'}
            textSize={FontsSize._16_SIZE}
            fontFamily={Fonts.DMSansMedium} />
        </View>

        <Sizebox height={32} />

        <ButtonPrimary
          text={"Iniciar validación"}
          onPress={() => {
            nav.navigate(ROUTES.Auth.RegisterFinancial2Screen.name as never)
          }} />
      </View>
    </ToolbarView>
  );
});

const style = StyleSheet.create({
  containerMain: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  }
});