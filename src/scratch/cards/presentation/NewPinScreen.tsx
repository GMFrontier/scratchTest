import { useContext, useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Text, Platform } from 'react-native';
import { observer } from 'mobx-react-lite';
import { reaction } from 'mobx';
import { ThemeContext } from '../../../core/presentation/contexts/theme/ThemeContext';
import { useStatusBar } from '../../../core/presentation/contexts/statusBar/StatusBarContext';
import { useNewModalContext } from '../../../core/presentation/contexts/messages/useNewModalContext';
import ToolbarView from '../../../core/presentation/components/toolbar/ToolbarView';
import { useNavigation } from '@react-navigation/native';
import CardsViewModel from './CardsViewModel';
import { TYPES } from '../../di/types';
import container from '../../di/inversify.config';
import { SvgXml } from 'react-native-svg';
import img_zero_card from '../../../../assets/svg/img_zero_card';
import { CustomText } from '../../../core/presentation/components/text/CustomText';
import ic_arrow_right_white from '../../../../assets/svg/ic_arrow_right_white';
import FontsSize from '../../../core/constants/FontsSize';
import { ic_edit_pin, ic_see_details, ic_show_pin } from '../../../../assets/svg/card_details';
import Fonts from '../../../core/constants/Fonts';
import { formatCardNumber } from '../../../core/data/utils/Utils';
import { ButtonLink } from '../../../core/presentation/components/button/ButtonLink';
import { CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell } from 'react-native-confirmation-code-field';
import Sizebox from '../../../core/presentation/components/item/Sizebox';
import ic_exclamation_error_filled_48 from '../../../../assets/svg/ic_exclamation_error_filled_48';
import { ROUTES } from '../../navigation/routes';
import ic_info_blue_filled from '../../../../assets/svg/ic_info_blue_filled';
import ic_success_check_filled from '../../../../assets/svg/ic_success_check_filled';


export const NewPinScreen = observer(() => {
  const viewModel = container.get<CardsViewModel>(TYPES.CardsViewModel);

  const {
    theme: { colors },
  } = useContext(ThemeContext);

  const nav = useNavigation()
  const modal = useNewModalContext().showStateModal

  const pin = useRef('')
  const [value, setValue] = useState('');
  const CELL_COUNT = 4;
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  useEffect(() => {
    if (value.length === CELL_COUNT) {
      viewModel.changeCardPin(pin.current)
    }
  }, [value])

  useEffect(() => {
    return reaction(
      () => viewModel.zeroChangePinResponse,
      () => {
        modal({
          title: "PIN editado",
          message: "Se ha cambiado tu PIN con éxito. Puedes acceder a el desde el detalle de la tarjeta.",
          image: ic_success_check_filled,
          enableOverlayTap: "none",
          showIcoClose: true,
          actionCloseModal() {
            nav.navigate(
              ROUTES.Navigator.BottomTabNavigator.name as never,
              { screen: ROUTES.Cards.CardsScreen.name },
            );
          },
          size: "30%"
        })
      }
    )
  }, [])


  useEffect(() => {
    return reaction(
      () => viewModel.errorResponse,
      () => {
        modal({
          title: "Ha ocurrido un problema",
          message: "El pin ingresado no es el correcto.",
          labelButtonPrimary: "Intentar nuevamente",
          actionButtonPrimary() { },
          labelButtonSecondary: "Ir a tarjetas",
          actionButtonSecondary() {
            nav.navigate(
              ROUTES.Navigator.BottomTabNavigator.name as never,
              { screen: ROUTES.Cards.CardsScreen.name },
            );
          },
          image: ic_exclamation_error_filled_48,
          enableOverlayTap: "none",
          showIcoClose: true,
          size: "50%"
        })
      }
    )
  }, [])

  const styles = StyleSheet.create({
    containerMain: {
      flex: 1,
      paddingHorizontal: 16,
      paddingTop: 16,
    },
    root: { flex: 1, padding: 20 },
    title: { textAlign: 'center', fontSize: 30 },
    codeFieldRoot: { marginTop: 20, marginHorizontal: 70 },
    cell: {
      width: 47,
      height: 56,
      lineHeight: Platform.OS === "ios" ? 56 : 38,
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
      text='Editar PIN de tarjeta'
    >
      <View style={styles.containerMain}>
        <CustomText
          marginTop={20}
          text={"Ingresa tu nuevo PIN"}
          textColor={colors.secondary}
          fontFamily={Fonts.DMSansBold}
          textSize={FontsSize._32_SIZE} />

        <CustomText
          text={"Este lo usaras para autorizar ciertas operaciones y debe ser de 4 dígitos."}
          marginTop={8}
          marginBottom={72}
          fontFamily={Fonts.DMSansRegular}
          textSize={FontsSize._16_SIZE} />

        <CodeField
          ref={ref}
          {...props}
          // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
          value={value}
          onChangeText={(text) => {
            pin.current = text
            setValue(text)
          }} cellCount={CELL_COUNT}
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

        <View style={{
          flexDirection: "row",
          marginTop: 56
        }} >
          <SvgXml xml={ic_info_blue_filled} />
          <Sizebox width={8} />
          <CustomText
            textSize={FontsSize._16_SIZE}
            text={"No debe contener números consecutivos ni relacionados a tus datos personales."} />
        </View>
      </View>
    </ToolbarView>
  );
});