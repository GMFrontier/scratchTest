import { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native';
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
import { useNavigation } from '@react-navigation/native';
import { ROUTES } from '../../../navigation/routes';
import { ButtonPrimary } from '../../../../core/presentation/components/button/ButtonPrimary';
import { TextInputMain } from '../../../../core/presentation/components/input/TextInputMain';
import SelectCustomDropdown from '../../../../core/presentation/components/spinner/SelectCustomDropdown';
import { ic_id, ic_location, ic_phone } from '../../../../../assets/svg/card_delivery';
import { SvgXml } from 'react-native-svg';
import { ButtonLink } from '../../../../core/presentation/components/button/ButtonLink';
import ic_success_check_filled from '../../../../../assets/svg/ic_success_check_filled';
import container from '../../../di/inversify.config';
import CardsViewModel from '../CardsViewModel';
import { TYPES } from '../../../di/types';
import { Delivery } from '../models/Request';
import ic_exclamation_error_filled_48 from '../../../../../assets/svg/ic_exclamation_error_filled_48';

interface SelectSimpleData {
  id: string;
  title: string;
  data?: string
}

export const DeliveryScreen = observer(() => {
  const viewModel = container.get<CardsViewModel>(TYPES.CardsViewModel);

  const {
    theme: { colors },
  } = useContext(ThemeContext);

  const statusBar = useStatusBar()

  const modal = useNewModalContext().showStateModal
  const nav = useNavigation()

  const { translation } = useTranslation();

  const [accountNumber, setAccountNumber] = useState('');

  useEffect(() => {
    statusBar.setPrimaryStatusBar()
    return () => {
      statusBar.setHomeStatusBar()
    }
  }, [])

  useEffect(() => {
    return reaction(
      () => viewModel.sendDeliveryResponse,
      () => {
        modal({
          title: "Envío coordinado",
          message: "Se ha procesado tu envío con éxito, te notificaremos cuando tu tarjeta este en camino.",
          image: ic_success_check_filled,
          enableOverlayTap: "none",
          showIcoClose: true,
          actionCloseModal() {
            nav.goBack()
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
          message: "No hemos podido procesar tu envío, aguarda unos minutos he inténtalo nuevamente.",
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

  const Item = ({ title, description, icon }: any) => {
    return <View style={{ marginTop: 16 }}>
      <CustomText
        text={title}
        fontFamily={Fonts.DMSansMedium}
        textColor={colors.white}
        textSize={FontsSize._16_SIZE} />
      <View style={{
        flexDirection: "row", alignItems: "center",
        marginTop: 4
      }}>
        {icon && <SvgXml xml={icon} style={{ marginEnd: 4 }} />}

        <CustomText
          text={description} />
      </View>
    </View>
  }

  return (
    <ToolbarView
      text='Coordinar envío'
    >
      <View style={style.containerMain}>
        <CustomText
          text={"Datos de entrega"}
          textColor={colors.secondary}
          fontFamily={Fonts.DMSansBold}
          textSize={FontsSize._32_SIZE} />
        <CustomText
          text='Valida tus datos para coordinar el envío de tu tarjeta.'
          textSize={FontsSize._16_SIZE}
          textColor={colors.white}
          marginTop={8} />

        <View style={{ backgroundColor: colors.accentSecondary, borderRadius: 20, marginTop: 18, padding: 24, paddingTop: 8 }}>
          <Item title={'Dirección registrada:'} description={viewModel.cardOrderResponse.address.addressLine1 ?? "--"} icon={ic_location} />
          <Item title={'Receptor de la entrega:'} description={viewModel.cardOrderResponse.firstName + " " + viewModel.cardOrderResponse.lastName} icon={ic_id} />
          <Item title={'Teléfono celular:'} description={viewModel.cardOrderResponse.telephone} icon={ic_phone} />
        </View>

        <View style={{ alignSelf: "center", marginTop: 16 }}>
          <ButtonLink
            text='Modificar datos'
            onPress={() => {
              nav.navigate(ROUTES.Cards.Delivery.EditScreen.name as never)
            }} />
        </View>

        <TextInputMain
          marginTop={16}
          onChangeText={setAccountNumber}
          optional={true}
          multiline={true}
          heightInput={96}
          counter={true}
          textAlign='top'
          labelTitle={"Detalles adicionales"}
          inputType="alphanumeric"
          maxLength={250}
          // errorInfo={"Por favor ingresa tus datos sin caracteres especiales, sólo letras."}
          inputValue={accountNumber}
          placeholder={"Ej: dejar en portería"} />

        <ButtonPrimary
          text={"Coordinar entrega"}
          onPress={() => {
            let delivery: Delivery = {
              holderReceipt: true,
              comment: accountNumber
            }
            viewModel.sendDeliveryData(delivery)
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