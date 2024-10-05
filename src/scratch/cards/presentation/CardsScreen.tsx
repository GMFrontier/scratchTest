import { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native';
import { observer } from 'mobx-react-lite';
import { reaction } from 'mobx';
import { ThemeContext } from '../../../core/presentation/contexts/theme/ThemeContext';
import { useStatusBar } from '../../../core/presentation/contexts/statusBar/StatusBarContext';
import ToolbarView from '../../../core/presentation/components/toolbar/ToolbarView';
import { SvgXml } from 'react-native-svg';
import img_zero_card_item from '../../../../assets/svg/img_zero_card_item';
import ic_delivery_pending from '../../../../assets/svg/ic_delivery_pending';
import { CustomText } from '../../../core/presentation/components/text/CustomText';
import ic_activate_pending from '../../../../assets/svg/ic_activate_pending';
import ic_blocked_card from '../../../../assets/svg/ic_blocked_card';
import ic_blocked_pin_card from '../../../../assets/svg/ic_blocked_pin_card';
import FontsSize from '../../../core/constants/FontsSize';
import Fonts from '../../../core/constants/Fonts';
import { useNavigation } from '@react-navigation/native';
import { ROUTES } from '../../navigation/routes';
import SelectCustomDropdown from '../../../core/presentation/components/spinner/SelectCustomDropdown';
import CardsViewModel from './CardsViewModel';
import { TYPES } from '../../di/types';
import container from '../../di/inversify.config';
import { ButtonPrimary } from '../../../core/presentation/components/button/ButtonPrimary';
import img_zero_card from '../../../../assets/svg/img_zero_card';
import HomeViewModel from '../../home/presentation/HomeViewModel';

export const CardsScreen = observer(() => {
  const viewModel = container.get<CardsViewModel>(TYPES.CardsViewModel);
  const homeViewModel = container.get<HomeViewModel>(TYPES.HomeViewModel);
  // "isActive": false, BLOQUEADA
  // "isActive": true, ACTIVA
  // "isActive": true, ACTIVA
  // "status": "pendingAck",
  //PENDIENTE CONOCER COMO DISTINGUIR PIN BLOQUEADO 

  const {
    theme: { colors },
  } = useContext(ThemeContext);

  const statusBar = useStatusBar()

  const nav = useNavigation()

  const screenWidth = Dimensions.get("window").width

  useEffect(() => {
    viewModel.getZeroCards()
    statusBar.setPrimaryStatusBar()
    return () => {
      statusBar.setHomeStatusBar()
    }
  }, [])

  const ZeroCard = ({ item }: any) => {
    let cardNum
    let title = ""
    let color = ""
    let textColor = ""
    let icon = undefined
    switch (item.zeroStatus) {
      case "DELIVERY":
        title = "Por entregar"
        color = "#FFDAB8"
        textColor = "#753900"
        icon = ic_delivery_pending
        break
      case "ACTIVATE":
        title = "Por activar"
        color = "#CFECFC"
        textColor = "#00238C"
        icon = ic_activate_pending
        break
      case "BLOCKED":
        title = "Bloqueada"
        color = "#F5C5D7"
        textColor = "#972400"
        icon = ic_blocked_card
        break
      case "BLOCKED_PIN":
        title = "PIN bloqueado"
        color = "#FEF3C2"
        textColor = "#A34F00"
        icon = ic_blocked_pin_card
        break
      case "ERROR":
        title = "Pago pendiente"
        color = "#F5C5D7"
        textColor = "#972400"
        icon = ic_blocked_pin_card
        break
      default:
        cardNum = "**** " + (viewModel.card.visibleNum?.slice(-4) ?? "")
        break
    }
    return (
      <TouchableOpacity
        activeOpacity={.8}
        onPress={() => {
          nav.navigate(ROUTES.Cards.CardScreen.name as never)
        }}
        style={{ marginHorizontal: 16, marginTop: 16 }}>
        <SvgXml
          style={{ alignSelf: "center" }}
          xml={img_zero_card_item}
          width={screenWidth - 32}
          height={110 * (screenWidth - 16) / 343} // Maintain the aspect ratio
        />
        <View style={{
          backgroundColor: color,
          borderRadius: 93,
          position: "absolute",
          margin: 16,
          bottom: 0,
          alignItems: "center",
          paddingVertical: 6,
          paddingHorizontal: 8,
          flexDirection: "row"
        }}>
          {icon && <SvgXml xml={icon} style={{ marginEnd: 4 }} />}
          <CustomText
            textColor={textColor}
            text={title} />
          <CustomText
            textSize={FontsSize._20_SIZE}
            fontFamily={Fonts.DMSansMedium}
            textColor={colors.white}
            text={cardNum} />
        </View>
      </TouchableOpacity>
    )
  }

  return (
    <ToolbarView
      text='Tarjetas'
    >
      {homeViewModel.user.kycStatus === "verified" ?
        <View>
          {viewModel.card && <ZeroCard item={viewModel.card} />}
          {(!viewModel.card && (!homeViewModel.user.payOrderComplete && !homeViewModel.user.isCardOrderInit)) && <View style={{ marginHorizontal: 16, marginTop: 72 }}>
            <CustomText
              textSize={FontsSize._20_SIZE}
              textColor={colors.white}
              textAlign='center'
              fontFamily={Fonts.DMSansMedium}
              text='Solicita tu primera tarjeta de crédito fácil y rápido.' />
            <SvgXml
              style={{ alignSelf: "center", marginTop: 48 }}
              xml={img_zero_card}
              width={screenWidth - 200}
              height={246 * (screenWidth - 200) / 159}
            />
            <View style={{ marginHorizontal: 16, marginTop: 48, }}>
              <ButtonPrimary
                text='Solicitar tarjeta'
                position='relative'
                onPress={() => {
                  nav.navigate(ROUTES.Cards.CardsTyCScreen.name as never)
                }} />
            </View>
          </View>}
        </View> :
        <View style={{ marginHorizontal: 16, marginTop: 72 }}>
          <CustomText
            textSize={FontsSize._20_SIZE}
            textColor={colors.white}
            textAlign='center'
            fontFamily={Fonts.DMSansMedium}
            text='Estamos evaluando tu perfil para que puedas solicitar tu tarjeta.' />
          <SvgXml
            style={{ alignSelf: "center", marginTop: 48 }}
            xml={img_zero_card}
            width={screenWidth - 200}
            height={246 * (screenWidth - 200) / 159}
          />
          <View style={{ marginHorizontal: 16, marginTop: 48, }}>
            <CustomText
              textSize={FontsSize._20_SIZE}
              textColor={colors.white}
              textAlign='center'
              fontFamily={Fonts.DMSansMedium}
              text='Intente nuevamente más tarde' />
          </View>
        </View>}


      {/* <View style={{ marginHorizontal: 16, marginTop: 16 }}>
        <SelectCustomDropdown
          setItem={(item) => {
            console.log(item)
            viewModel.setCard({ ...item, zeroStatus: item.title })
          }}
          data={[
            { id: 0, title: "DELIVERY" },
            { id: 1, title: "ACTIVATE" },
            { id: 2, title: "ACTIVATED" },
            { id: 3, title: "BLOCKED" },
            { id: 4, title: "BLOCKED_PIN" }
          ]}
          marginTop={16}
          labelTitle={"Setear status de tarjeta"} />
      </View> */}
    </ToolbarView>
  );
});

const style = StyleSheet.create({
  containerMain: {
    flex: 1
  }, cardContainer: {
    marginStart: 16,
    marginEnd: 16,
    alignItems: 'flex-start',
    flexDirection: 'row',
    backgroundColor: 'white',

    elevation: 10,
    shadowOpacity: 0.2,
    borderRadius: 14,
  },
});