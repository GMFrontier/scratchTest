import { useContext, useState } from 'react';
import { View, StyleSheet, Platform, Text } from 'react-native';
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
import { CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell } from 'react-native-confirmation-code-field';
import { ButtonLink } from '../../../../core/presentation/components/button/ButtonLink';
import Sizebox from '../../../../core/presentation/components/item/Sizebox';
import { ROUTES } from '../../../navigation/routes';
import LoginViewModel from '../login/LoginViewModel';
import container from '../../../di/inversify.config';
import { TYPES } from '../../../di/types';
import { reaction } from 'mobx';
import { useNewModalContext } from '../../../../core/presentation/contexts/messages/useNewModalContext';
import ic_exclamation_error_filled_48 from '../../../../../assets/svg/ic_exclamation_error_filled_48';
import { maskEmail } from '../../../../core/data/utils/Utils';

export const RecoverPasswordEmailValidationScreen = observer(() => {

  const viewModel = container.get<LoginViewModel>(
    TYPES.LoginViewModel,
  );

  const {
    theme: { colors },
  } = useContext(ThemeContext);
  const PIN_LENGTH = 6
  const { translation } = useTranslation();
  const nav = useNavigation()

  const CELL_COUNT = 6;

  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  const showStateModal = useNewModalContext().showStateModal

  React.useEffect(() => {
    changeNavigationBarColor(colors.accent);
  })

  React.useEffect(() => {
    if (value.length === PIN_LENGTH) {
      viewModel.sendRecoverCode(value)
    }
  }, [value])

  reaction(
    () => viewModel.sendCodeSuccess,
    () => {
      nav.navigate(ROUTES.Auth.RecoverPasswordCreateScreen.name as never);
    }
  )

  reaction(
    () => viewModel.showError,
    () => {
      showStateModal({
        title: "Ha ocurrido un problema",
        message: "Email o contraseña incorrectos.",
        image: ic_exclamation_error_filled_48,
        showIcoClose: true,
        size: "30%"
      })
    }
  )

  const styles = StyleSheet.create({
    containerMain: {
      flex: 1,
      paddingHorizontal: 16,
    },
    keyboardContainer: {
      flex: 1,
      justifyContent: 'flex-end',
    },
    root: { flex: 1, padding: 20 },
    title: { textAlign: 'center', fontSize: 30 },
    codeFieldRoot: { marginTop: 20 },
    cell: {
      width: 47,
      height: 56,
      lineHeight: 38,
      fontSize: 24,
      borderWidth: 1,
      borderRadius: 8,
      borderColor: colors.captionText,
      textAlign: 'center',
      color: colors.captionText,
      fontFamily: Fonts.DMSansMedium,
      textAlignVertical: "center"
    },
    focusCell: {
      borderColor: colors.secondary,
    },
  });

  return (
    <ToolbarView
      text='Restablecimiento de PIN'>
      <View style={styles.containerMain}>
        <CustomText
          marginTop={20}
          text={"Validemos tu correo electrónico"}
          textColor={colors.secondary}
          fontFamily={Fonts.DMSansBold}
          textSize={FontsSize._32_SIZE} />

        <CustomText
          text={"Ingresa el código de 6 digitos enviado a " + maskEmail(viewModel.recoverPasswordEmail)}
          marginTop={8}
          marginBottom={72}
          fontFamily={Fonts.DMSansRegular}
          textSize={FontsSize._16_SIZE} />

        <CodeField
          ref={ref}
          {...props}
          // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
          value={value}
          onChangeText={setValue}
          cellCount={CELL_COUNT}
          rootStyle={styles.codeFieldRoot}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          autoComplete={Platform.select({ android: 'sms-otp', default: 'one-time-code' })}
          testID="my-code-input"
          renderCell={({ index, symbol, isFocused }) => (
            <Text
              key={index}
              style={[styles.cell, isFocused && styles.focusCell]}
              onLayout={getCellOnLayoutHandler(index)}>
              {symbol || (isFocused ? <Cursor /> : null)}
            </Text>
          )}
        />

        <View style={{ alignSelf: "center", marginTop: 72, alignItems: "center" }} >
          <CustomText
            text='¿No recibiste el código?'
            textColor={colors.white} />
          <Sizebox height={4} />
          <ButtonLink
            text={"Reenviar"}
            onPress={() => {
              viewModel.recoverPassword()
            }} />
        </View>
      </View>
    </ToolbarView>
  );
});