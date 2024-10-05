import { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native';
import { observer } from 'mobx-react-lite';
import { reaction } from 'mobx';
import { ThemeContext } from '../../../../core/presentation/contexts/theme/ThemeContext';
import { useStatusBar } from '../../../../core/presentation/contexts/statusBar/StatusBarContext';
import { useNewModalContext } from '../../../../core/presentation/contexts/messages/useNewModalContext';
import { useTranslation } from '../../../../core/presentation/contexts/translations/LanguageProvider';
import { CustomTextBold } from '../../../../core/presentation/components/text/CustomTextBold';
import ToolbarView from '../../../../core/presentation/components/toolbar/ToolbarView';
import { SvgXml } from 'react-native-svg';
import img_zero_card_item from '../../../../../assets/svg/img_zero_card_item';
import ic_delivery_pending from '../../../../../assets/svg/ic_delivery_pending';
import { CustomText } from '../../../../core/presentation/components/text/CustomText';
import ic_activate_pending from '../../../../../assets/svg/ic_activate_pending';
import ic_blocked_card from '../../../../../assets/svg/ic_blocked_card';
import ic_blocked_pin_card from '../../../../../assets/svg/ic_blocked_pin_card';
import FontsSize from '../../../../core/constants/FontsSize';
import Fonts from '../../../../core/constants/Fonts';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { ROUTES } from '../../../navigation/routes';
import Sizebox from '../../../../core/presentation/components/item/Sizebox';
import { Checkbox } from '../../../../core/presentation/components/checkbox/Checkbox';
import { ButtonPrimary } from '../../../../core/presentation/components/button/ButtonPrimary';
import { FileInput } from '../../../../core/presentation/components/input/FileInput';
import ic_success_check_filled from '../../../../../assets/svg/ic_success_check_filled';
import CardsViewModel from '../CardsViewModel';
import { TYPES } from '../../../di/types';
import container from '../../../di/inversify.config';
import ic_error_check_filled from '../../../../../assets/svg/ic_error_check_filled';
import ic_exclamation_error_filled_48 from '../../../../../assets/svg/ic_exclamation_error_filled_48';

export const AchReceiptScreen = observer(() => {
  const viewModel = container.get<CardsViewModel>(TYPES.CardsViewModel);

  const {
    theme: { colors },
  } = useContext(ThemeContext);

  const showStateModal = useNewModalContext().showStateModal
  const nav = useNavigation()

  const { translation } = useTranslation();
  const modal = useNewModalContext().showStateModal

  const [comprobante, setComprobante] = useState<string | undefined>();

  const handleNavigation = () => {
    nav.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [
          { name: ROUTES.Navigator.BottomTabNavigator.name },
        ],
      })
    );
  }

  useEffect(() => {
    return reaction(
      () => viewModel.requestPaymentResponse,
      () => {
        modal({
          title: "Pago realizado",
          message: "Te recordamos que validada tu transferencia, podras coordinar el envio de tu tarjeta entre 3 a 5 días hábiles.",
          labelButtonPrimary: "Ir al inicio",
          actionButtonPrimary() { handleNavigation() },
          image: ic_success_check_filled,
          enableOverlayTap: "none"
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
          message: "No hemos podido procesar el pago correctamente, el sistema está teniendo inconvenientes, aguarda unos minutos.",
          labelButtonPrimary: "Intentar nuevamente",
          actionButtonPrimary() { },
          labelButtonSecondary: "Ir al inicio",
          actionButtonSecondary() { handleNavigation() },
          image: ic_exclamation_error_filled_48,
          enableOverlayTap: "none",
          showIcoClose: true,
          size: "50%"
        })
      }
    )
  }, [])


  return (
    <ToolbarView
      text='Solicita tu tarjeta'
    >
      <View style={style.containerMain}>
        <CustomText
          text={"Cargar el\ncomprobante"}
          textColor={colors.secondary}
          fontFamily={Fonts.DMSansBold}
          textSize={FontsSize._32_SIZE} />
        <CustomText
          text='Para procesar tu pago por favor adjunta el comprobante de la transferencia ACH..'
          textSize={FontsSize._16_SIZE}
          marginTop={8}
          textColor={colors.white} />

        <FileInput
          label='Comprobante'
          isRequired={true}
          marginTop={16}
          flex={0}
          showError={true}
          setFile={setComprobante}
          showInfoModal={false}
        />

        <ButtonPrimary
          disabled={!comprobante}
          text={translation.file.next}
          onPress={() => {
            viewModel.setRequestPayment({ ...viewModel.requestPayment, payInfo: comprobante })
            viewModel.sendRequestPayment()
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