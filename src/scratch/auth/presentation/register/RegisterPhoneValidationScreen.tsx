import { useContext, useState } from 'react';
import { View, StyleSheet, Platform, Text } from 'react-native';
import { observer } from 'mobx-react-lite';
import React = require('react');
import { ThemeContext } from '../../../../core/presentation/contexts/theme/ThemeContext';
import { useTranslation } from '../../../../core/presentation/contexts/translations/LanguageProvider';
import { CustomText } from '../../../../core/presentation/components/text/CustomText';
import Fonts from '../../../../core/constants/Fonts';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { ButtonLink } from '../../../../core/presentation/components/button/ButtonLink';
import Sizebox from '../../../../core/presentation/components/item/Sizebox';
import changeNavigationBarColor from 'react-native-navigation-bar-color';
import ToolbarView from '../../../../core/presentation/components/toolbar/ToolbarView';
import { CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell } from 'react-native-confirmation-code-field';
import FontsSize from '../../../../core/constants/FontsSize';
import { useNewModalContext } from '../../../../core/presentation/contexts/messages/useNewModalContext';
import ic_success_check_filled from '../../../../../assets/svg/ic_success_check_filled';
import { ROUTES } from '../../../navigation/routes';
import { formatTime } from '../../../../core/data/utils/Utils';
import RegisterViewModel from './RegisterViewModel';
import container from '../../../di/inversify.config';
import { TYPES } from '../../../di/types';
import { reaction } from 'mobx'
import ic_exclamation_error_filled_48 from '../../../../../assets/svg/ic_exclamation_error_filled_48';

export const RegisterPhoneValidationScreen = observer(() => {
  const viewModel = container.get<RegisterViewModel>(
    TYPES.RegisterViewModel,
  );

  const {
    theme: { colors },
  } = useContext(ThemeContext);
  const { translation } = useTranslation();
  const nav = useNavigation()
  const timeSec = 120
  const [counter, setCounter] = useState(timeSec);
  const [isCounterEnable, setIsCounterEnable] = useState(true);

  const [value, setValue] = useState('');
  const CELL_COUNT = 6;
  const PIN_LENGTH = 6
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  const showModal = useNewModalContext().showStateModal

  React.useEffect(() => {
    if (counter === 0) {
      setIsCounterEnable(false);
      return;
    }

    const interval = setInterval(() => {
      setCounter((currentCounter) => currentCounter - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [counter]);

  React.useEffect(() => {
    changeNavigationBarColor(colors.accent);
  })

  const handleNavigation = () => {
    nav.navigate(ROUTES.Auth.RegisterEmailValidationScreen.name as never)
  }

  React.useEffect(() => {
    if (value.length === PIN_LENGTH) {
      viewModel.sendSMSCode(value)
    }
  }, [value])

  reaction(
    () => viewModel.phoneSuccess,
    () => {
      showModal({
        title: "Teléfono validado",
        message: "Se ha validado tu número con éxito, ahora validaremos tu correo.",
        image: ic_success_check_filled,
        labelButtonPrimary: "Siguiente",
        actionButtonPrimary() { handleNavigation() },
        actionCloseModal() { handleNavigation() },
        showIcoClose: true,
        enableOverlayTap: "none"
      })
    }
  )
  reaction(
    () => viewModel.showError,
    () => {
      showModal({
        title: "Ha ocurrido un problema",
        message: "El código es inválido.",
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
      paddingTop: 16,
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
      text='Validación de teléfono'>
      <View style={styles.containerMain}>
        <CustomText
          marginTop={20}
          text={"Validemos tu número de teléfono"}
          textColor={colors.secondary}
          fontFamily={Fonts.DMSansBold}
          textSize={FontsSize._32_SIZE} />

        <CustomText
          text={"Ingresa el código de 6 dígitos enviado vía SMS al +507 *****0987."}
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
          {!isCounterEnable ?
            <View>
              <Sizebox height={4} />
              <ButtonLink
                text={"Reenviar"}
                onPress={() => {
                  setIsCounterEnable(true)
                  setCounter(timeSec)
                  viewModel.getSMSCode()
                }} />
            </View>
            :
            <CustomText
              textAlign="center"
              fontFamily={Fonts.DMSansMedium}
              textSize={FontsSize._14_SIZE}
              underline={true}
              textColor={"#ADB4C1"}
              marginTop={4}
              text={("Reenviar código en") + " " + formatTime(counter)}></CustomText>}
        </View>
      </View>
    </ToolbarView>
  );
});
