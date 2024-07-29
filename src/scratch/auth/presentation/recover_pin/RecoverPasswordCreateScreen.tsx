import { useContext, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { observer } from 'mobx-react-lite';
import React = require('react');
import { ThemeContext } from '../../../../core/presentation/contexts/theme/ThemeContext';
import { useTranslation } from '../../../../core/presentation/contexts/translations/LanguageProvider';
import { CustomText } from '../../../../core/presentation/components/text/CustomText';
import Fonts from '../../../../core/constants/Fonts';
import FontsSize from '../../../../core/constants/FontsSize';
import { CommonActions, useNavigation } from '@react-navigation/native';
import changeNavigationBarColor from 'react-native-navigation-bar-color';
import ToolbarView from '../../../../core/presentation/components/toolbar/ToolbarView';
import { ROUTES } from '../../../navigation/routes';
import { useNewModalContext } from '../../../../core/presentation/contexts/messages/useNewModalContext';
import ic_success_check_filled from '../../../../../assets/svg/ic_success_check_filled';
import { TextInputMain } from '../../../../core/presentation/components/input/TextInputMain';
import { doesPasswordsMatch, isUserPasswordValid } from '../../../../core/data/utils/Utils';
import { SvgXml } from 'react-native-svg';
import ic_exclamation_error_filled from '../../../../../assets/svg/ic_exclamation_error_filled';
import LoginViewModel from '../login/LoginViewModel';
import container from '../../../di/inversify.config';
import { TYPES } from '../../../di/types';
import { ButtonPrimary } from '../../../../core/presentation/components/button/ButtonPrimary';
import { reaction } from 'mobx';
import { PresentationErrorTypes } from '../../../../core/presentation/utils/PresentationErrors';
import ic_exclamation_error_filled_48 from '../../../../../assets/svg/ic_exclamation_error_filled_48';

export const RecoverPasswordCreateScreen = observer(() => {

  const viewModel = container.get<LoginViewModel>(
    TYPES.LoginViewModel,
  );

  const {
    theme: { colors },
  } = useContext(ThemeContext);
  const PIN_LENGTH = 6
  const { translation } = useTranslation();
  const nav = useNavigation()
  const showStateModal = useNewModalContext().showStateModal

  const [password, setPassword] = useState("");
  const [matchPassword, setMatchPassword] = useState("");

  React.useEffect(() => {
    changeNavigationBarColor(colors.accent);
  })

  const showModal = useNewModalContext().showStateModal

  const goToHome = () => {
    nav.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [
          { name: ROUTES.Navigator.BottomTabNavigator.name },
        ],
      })
    );
  }

  reaction(
    () => viewModel.recoverPasswordSuccess,
    () => {
      showModal({
        title: "Contraseña reestablecida",
        message: "La contraseña ha sido restablecido con éxito, ya puedes acceder a tu cuenta.",
        image: ic_success_check_filled,
        labelButtonPrimary: "Acceder a mi cuenta",
        actionButtonPrimary() { goToHome() },
        actionCloseModal() { goToHome() },
        showIcoClose: true,
        enableOverlayTap: "none"
      })
    }
  )

  const showError = (error: PresentationErrorTypes) => {
    switch (error) {
      case PresentationErrorTypes.SAME_PASSWORD:
        showStateModal({
          title: "Ha ocurrido un problema",
          message: "La contraseña ingresada es igual a alguna de las tres contraseñas anteriores.",
          image: ic_exclamation_error_filled_48,
          showIcoClose: true,
          enableOverlayTap: "none",
        })
        break
      default:
        showStateModal({
          title: "Ha ocurrido un problema",
          message: "Por favor, vuelva a intentarlo nuevamente.",
          image: ic_exclamation_error_filled_48,
          showIcoClose: true,
          enableOverlayTap: "none",
          size: "30%"
        })
        break
    }
  }

  const styles = StyleSheet.create({
    containerMain: {
      flex: 1,
      paddingHorizontal: 16,
    },
  });

  return (
    <ToolbarView
      text='Reestablecimiento de contraseña'>
      <View style={styles.containerMain}>
        <CustomText
          marginTop={20}
          text={"Crea tu nueva contraseña"}
          textColor={colors.secondary}
          fontFamily={Fonts.DMSansBold}
          textSize={FontsSize._32_SIZE} />

        <CustomText
          text={"Este debe ser distinta a al anterior y no debe ser similar a contraseñas anteriores"}
          marginTop={8}
          fontFamily={Fonts.DMSansMedium}
          textSize={FontsSize._16_SIZE} />

        <TextInputMain
          inputValue={password}
          marginTop={48}
          showError={!isUserPasswordValid(password)}
          inputType="password"
          labelTitleRequired={true}
          placeholder="Ingresa tu contraseña"
          labelTitle={"Contraseña nueva"}
          onChangeText={setPassword}
        />
        <View style={{
          marginTop: 4,
          flexDirection: "row",
        }} >
          {isUserPasswordValid(password) &&
            <SvgXml xml={ic_success_check_filled} height={16} width={16} style={{ marginEnd: 8 }} />
          }
          <CustomText
            textSize={FontsSize._12_SIZE}
            textColor={isUserPasswordValid(password) ? colors.green400 : colors.white}
            text={"Esta debe contener 8 caracteres alfanuméricos y un carácter especial."} />
        </View>

        <TextInputMain
          inputValue={matchPassword}
          marginTop={24}
          showError={!doesPasswordsMatch(password, matchPassword)}
          inputType="password"
          labelTitleRequired={true}
          placeholder="Ingresa tu contraseña nuevamente"
          labelTitle={"Reingresa tu contraseña"}
          onChangeText={setMatchPassword}
        />

        {
          matchPassword.length > 0 &&
          <View style={{
            marginTop: 4,
            flexDirection: "row",
          }} >
            {doesPasswordsMatch(password, matchPassword) ?
              <SvgXml xml={ic_success_check_filled} height={16} width={16} style={{ marginEnd: 8 }} />
              :
              <SvgXml xml={ic_exclamation_error_filled} height={16} width={16} style={{ marginEnd: 8 }} />

            }
            <CustomText
              textSize={FontsSize._12_SIZE}
              textColor={doesPasswordsMatch(password, matchPassword) ? colors.green400 : colors.red500}
              text={doesPasswordsMatch(password, matchPassword) ? "Las contraseñas coinciden." : "Las contraseñas no coinciden."} />
          </View>
        }

        <ButtonPrimary
          text={translation.file.next}
          disabled={doesPasswordsMatch(password, matchPassword)}
          onPress={() => {
            viewModel.sendNewPassword(password, showError)
          }}
        />
      </View>
    </ToolbarView>
  );
});