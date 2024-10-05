import { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, Text, Animated, Platform } from 'react-native';
import { observer } from 'mobx-react-lite';
import { reaction } from 'mobx';
import { ThemeContext } from '../../../../core/presentation/contexts/theme/ThemeContext';
import { useStatusBar } from '../../../../core/presentation/contexts/statusBar/StatusBarContext';
import { useNewModalContext } from '../../../../core/presentation/contexts/messages/useNewModalContext';
import { useTranslation } from '../../../../core/presentation/contexts/translations/LanguageProvider';
import ToolbarView from '../../../../core/presentation/components/toolbar/ToolbarView';
import { CustomText } from '../../../../core/presentation/components/text/CustomText';
import FontsSize from '../../../../core/constants/FontsSize';
import Fonts from '../../../../core/constants/Fonts';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { ROUTES } from '../../../navigation/routes';
import { ButtonPrimary } from '../../../../core/presentation/components/button/ButtonPrimary';
import { TextInputMain } from '../../../../core/presentation/components/input/TextInputMain';
import SelectCustomDropdown from '../../../../core/presentation/components/spinner/SelectCustomDropdown';
import { ic_id, ic_location, ic_location_large, ic_phone, ic_switch_active, ic_switch_inactive } from '../../../../../assets/svg/card_delivery';
import { SvgXml } from 'react-native-svg';
import { ButtonLink } from '../../../../core/presentation/components/button/ButtonLink';
import ic_success_check_filled from '../../../../../assets/svg/ic_success_check_filled';
import { CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell } from 'react-native-confirmation-code-field';
import ic_info_blue_filled from '../../../../../assets/svg/ic_info_blue_filled';
import CardsViewModel from '../CardsViewModel';
import { TYPES } from '../../../di/types';
import container from '../../../di/inversify.config';

export const PinInputScreen = observer(() => {
  const viewModel = container.get<CardsViewModel>(TYPES.CardsViewModel);

  const {
    theme: { colors },
  } = useContext(ThemeContext);

  const statusBar = useStatusBar()

  const modal = useNewModalContext().showStateModal
  const nav = useNavigation()

  const [value, setValue] = useState('');
  const CELL_COUNT = 4;
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  useEffect(() => {
    statusBar.setPrimaryStatusBar()
    return () => {
      statusBar.setHomeStatusBar()
    }
  })

  useEffect(() => {
    if (value.length === CELL_COUNT) {
      viewModel.setCard({ zeroStatus: "ACTIVATED" })
      modal({
        title: "Tarjeta activada",
        message: "Hemos activado tu tarjeta con éxito, y esta lista para usar.",
        image: ic_success_check_filled,
        enableOverlayTap: "none",
        showIcoClose: true,
        actionCloseModal() {
          nav.goBack()
          nav.goBack()
        },
        size: "30%"
      })
    }
  }, [value])



  const styles = StyleSheet.create({
    containerMain: {
      flex: 1,
      paddingHorizontal: 16,
      paddingTop: 16,
    },
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
      text='Activar tarjeta'
    >
      <View style={styles.containerMain}>
        <CustomText
          text={"Por último crea tu PIN de tarjeta"}
          textColor={colors.secondary}
          fontFamily={Fonts.DMSansBold}
          textSize={FontsSize._32_SIZE} />
        <CustomText
          text='Este lo usaras para autorizar ciertas operaciones y debe ser de 4 dígitos..'
          textSize={FontsSize._16_SIZE}
          textColor={colors.white}
          marginTop={8} />

        <CodeField
          ref={ref}
          {...props}
          // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
          value={value}
          onChangeText={setValue}
          cellCount={CELL_COUNT}
          rootStyle={{ marginTop: 72, marginHorizontal: 70 }}
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
          marginTop: 72
        }} >
          <SvgXml xml={ic_info_blue_filled} style={{ marginEnd: 16 }} />
          <CustomText
            textSize={FontsSize._16_SIZE}
            text={"No debe contener números consecutivos \n ni relacionados a tus datos personales."} />
        </View>
      </View>
    </ToolbarView>
  );
});