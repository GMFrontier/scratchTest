import { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native';
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
import Clipboard from '@react-native-clipboard/clipboard';
import { useToastContext } from '../../../core/presentation/contexts/messages/useToastContext';
import { ROUTES } from '../../navigation/routes';

export const CardDetailsScreen = observer(() => {
  const viewModel = container.get<CardsViewModel>(TYPES.CardsViewModel);

  const {
    theme: { colors },
  } = useContext(ThemeContext);

  const nav = useNavigation()
  const modal = useNewModalContext().showStateModal
  const toast = useToastContext().showInfoToast

  const screenWidth = Dimensions.get("window").width

  const data = [
    {
      id: 0,
      title: "Datos de la tarjeta",
      icon: ic_see_details,
      onPress: () => {
        viewModel.getCardDetails()
      }
    },
    {
      id: 1,
      title: "Mostrar PIN",
      icon: ic_show_pin,
      onPress: () => {
        viewModel.getCardPin()
      }
    },
    {
      id: 2,
      title: "Editar PIN",
      icon: ic_edit_pin,
      onPress: () => {
        nav.navigate(ROUTES.Cards.ChangePinScreen.name as never)
      }
    },
  ]

  useEffect(() => {
    return reaction(
      () => viewModel.zeroCardDetailsResponse,
      () => {
        modal({
          title: "title",
          message: "message",
          image: "ic_alert_triangle_filled",
          enableOverlayTap: "none",
          showIcoClose: true,
          content: (actionCloseModal: any) => {
            return <View  >
              <CustomText
                marginTop={72}
                textColor={colors.blue50}
                text={"Titular de la tarjeta"} />
              <CustomText
                marginTop={4}
                textColor={colors.white}
                textSize={FontsSize._16_SIZE}
                fontFamily={Fonts.DMSansMedium}
                text={viewModel.zeroCardDetailsResponse.cardOwner} />
              <CustomText
                marginTop={8}
                textColor={colors.blue50}
                text={"Número de la tarjeta"} />
              <View style={{ justifyContent: "space-between", flexDirection: "row" }}>
                <CustomText
                  marginTop={4}
                  textColor={colors.white}
                  textSize={FontsSize._16_SIZE}
                  fontFamily={Fonts.DMSansMedium}
                  text={formatCardNumber(viewModel.zeroCardDetailsResponse.pan)} />
                <ButtonLink
                  onPress={() => {
                    Clipboard.setString(viewModel.zeroCardDetailsResponse.pan);
                    toast("Copiado al portapapeles");
                  }}
                  text='Copiar' />
              </View>
              <CustomText
                marginTop={8}
                textColor={colors.blue50}
                text={"Fecha de vencimiento"} />
              <CustomText
                marginTop={4}
                textColor={colors.white}
                textSize={FontsSize._16_SIZE}
                fontFamily={Fonts.DMSansMedium}
                text={viewModel.zeroCardDetailsResponse.expDate.slice(-2) + "/" + viewModel.zeroCardDetailsResponse.expDate.slice(2, 4)} />
              <CustomText
                marginTop={8}
                textColor={colors.blue50}
                text={"CVV"} />
              <CustomText
                marginTop={4}
                textColor={colors.white}
                textSize={FontsSize._16_SIZE}
                fontFamily={Fonts.DMSansMedium}
                text={viewModel.zeroCardDetailsResponse.cvv} />
              <CustomText
                marginTop={8}
                textColor={colors.blue50}
                text={"Dirección de facturación"} />
              <CustomText
                marginTop={4}
                textColor={colors.white}
                textSize={FontsSize._16_SIZE}
                fontFamily={Fonts.DMSansMedium}
                text={viewModel.zeroCardDetailsResponse.address} />
            </View >
          },
          size: "50%"
        })
      }
    )
  }, [])

  useEffect(() => {
    return reaction(
      () => viewModel.zeroCardPinResponse,
      () => {
        modal({
          title: "title",
          message: "message",
          image: "ic_alert_triangle_filled",
          enableOverlayTap: "none",
          showIcoClose: true,
          content: (actionCloseModal: any) => {
            return <View  >
              <CustomText
                marginTop={72}
                textAlign='center'
                textColor={colors.white}
                textSize={FontsSize._32_SIZE}
                fontFamily={Fonts.DMSansMedium}
                text={viewModel.zeroCardPinResponse.pin} />
              <CustomText
                marginTop={2}
                textAlign='center'
                textColor={colors.blue50}
                text={"Vuelve al app si se te olvida"} />
            </View >
          },
          size: "25%"
        })
      }
    )
  }, [])

  const Item = ({ title, icon, onPress }: any) => {
    return <TouchableOpacity
      onPress={onPress}
      activeOpacity={.8}
      style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginHorizontal: 16, marginTop: 16 }}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <View style={{ backgroundColor: colors.blue300, padding: 8, borderRadius: 8, height: 40, width: 40, marginEnd: 4 }}>
          <SvgXml xml={icon} style={{}} />
        </View>
        <CustomText
          textSize={FontsSize._16_SIZE}
          text={title} />
      </View>
      <SvgXml xml={ic_arrow_right_white} height={24} width={24} />

    </TouchableOpacity>
  }
  return (
    <ToolbarView
      text='Ver detalle'
    >

      <View>
        <SvgXml
          style={{ alignSelf: "center", marginTop: 24 }}
          xml={img_zero_card}
          width={screenWidth - 200}
          height={246 * (screenWidth - 200) / 159} // Maintain the aspect ratio
        />

        <View style={{ position: "absolute", bottom: 16, start: (screenWidth / 2 - 200 / 2 + 16) }}>
          <CustomText
            fontFamily={Fonts.DMSansMedium}
            textColor={colors.white}
            text={"**** " + (viewModel.card.visibleNum?.slice(-4) ?? "")} />
        </View>
      </View>

      <FlatList
        data={data}
        keyExtractor={a => a.id.toString()}
        renderItem={(item) => {
          return <Item title={item.item.title} icon={item.item.icon} onPress={item.item.onPress} />
        }}
      />

    </ToolbarView>
  );
});