import { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native';
import { observer } from 'mobx-react-lite';
import { reaction } from 'mobx';
import { ThemeContext } from '../../../core/presentation/contexts/theme/ThemeContext';
import { useStatusBar } from '../../../core/presentation/contexts/statusBar/StatusBarContext';
import { useNewModalContext } from '../../../core/presentation/contexts/messages/useNewModalContext';
import { useTranslation } from '../../../core/presentation/contexts/translations/LanguageProvider';
import { CustomTextBold } from '../../../core/presentation/components/text/CustomTextBold';
import ToolbarView from '../../../core/presentation/components/toolbar/ToolbarView';
import { SvgXml } from 'react-native-svg';
import ic_delivery_pending from '../../../../assets/svg/ic_delivery_pending';
import { CustomText } from '../../../core/presentation/components/text/CustomText';
import ic_activate_pending from '../../../../assets/svg/ic_activate_pending';
import ic_blocked_card from '../../../../assets/svg/ic_blocked_card';
import ic_blocked_pin_card from '../../../../assets/svg/ic_blocked_pin_card';
import FontsSize from '../../../core/constants/FontsSize';
import Fonts from '../../../core/constants/Fonts';
import { useNavigation } from '@react-navigation/native';
import { ROUTES } from '../../navigation/routes';
import img_zero_card_inactive from '../../../../assets/svg/img_zero_card_inactive';
import { ic_block_card, ic_block_card_gray, ic_details, ic_details_gray, ic_movements, ic_movements_gray, ic_pay_statement, ic_pay_statement_gray } from '../../../../assets/svg/card_actions';
import { ic_activate_1, ic_activate_2, ic_delivery_1, ic_delivery_2 } from '../../../../assets/svg/ic_steps_card';
import { ButtonPrimary } from '../../../core/presentation/components/button/ButtonPrimary';
import img_zero_card from '../../../../assets/svg/img_zero_card';
import ic_success_check_filled from '../../../../assets/svg/ic_success_check_filled';
import ic_alert_triangle_filled from '../../../../assets/svg/ic_alert_triangle_filled';
import CardsViewModel from './CardsViewModel';
import { TYPES } from '../../di/types';
import container from '../../di/inversify.config';
import ic_radio_blue_active from '../../../../assets/svg/ic_radio_blue_active';
import ic_radio_blue_inactive from '../../../../assets/svg/ic_radio_blue_inactive';

export const CardScreen = observer(() => {
  const viewModel = container.get<CardsViewModel>(TYPES.CardsViewModel);

  const {
    theme: { colors },
  } = useContext(ThemeContext);

  const statusBar = useStatusBar()

  const nav = useNavigation()
  const modal = useNewModalContext().showStateModal

  const screenWidth = Dimensions.get("window").width

  const steps: any[] = [
    {
      title: "Valida tu dirección:",
      description: viewModel.cardOrderResponse?.address?.addressLine1 ?? "--",
      status: "DELIVERY",
      steps: [
        {
          icon: ic_delivery_1,
          title: "Valida tus datos"
        },
        {
          icon: ic_delivery_2,
          title: "Confirma tu envío"
        },
      ]
    },
    {
      title: "Tiempo de entrega estimado:",
      description: "5 a 7 días hábiles",
      status: "ACTIVATE",
      steps: [
        {
          icon: ic_activate_1,
          title: "Recibe tu tarjeta"
        },
        {
          icon: ic_activate_2,
          title: "Establece tu PIN"
        },
      ]
    },
  ]

  useEffect(() => {
    statusBar.setPrimaryStatusBar()
    if (viewModel.card.zeroStatus === "DELIVERY") {
      viewModel.getCardOrder()
    }
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
    let img_zero = img_zero_card_inactive
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
      default:
        cardNum = "**** " + (viewModel.card.visibleNum?.slice(-4) ?? "")
        img_zero = img_zero_card
        break
    }
    return (
      <TouchableOpacity
        activeOpacity={.8}
        onPress={() => {

        }}
        style={{ marginHorizontal: 16, marginTop: 16, }}>
        <SvgXml
          style={{ alignSelf: "center" }}
          xml={img_zero}
          width={screenWidth - 200}
          height={246 * (screenWidth - 200) / 159} // Maintain the aspect ratio
        />
        {icon && <View style={{
          backgroundColor: color,
          borderRadius: 93,
          position: "absolute",
          alignItems: "center",
          alignSelf: "center",
          paddingVertical: 6,
          paddingHorizontal: 8,
          flexDirection: "row",
          top: 140
        }}>
          <SvgXml xml={icon} style={{ marginEnd: 4 }} />
          <CustomText
            textColor={textColor}
            text={title} />
        </View>}


        {cardNum &&
          <View style={{ position: "absolute", bottom: 16, start: (screenWidth / 2 - 200 / 2) }}>
            <CustomText
              fontFamily={Fonts.DMSansMedium}
              textColor={colors.white}
              text={cardNum} />
          </View>
        }
      </TouchableOpacity>
    )
  }

  const CardActions = () => {
    const activated = viewModel.card.zeroStatus === "ACTIVATED"
    const actions = [
      {
        id: 0,
        icon: activated ? ic_details : ic_details_gray,
        title: "Ver\ndetalle"
      },
      {
        id: 1,
        // icon: activated ? ic_movements : ic_movements_gray,
        icon: ic_movements_gray,
        title: "Movimientos\nde tarjeta"
      },
      {
        id: 2,
        // icon: activated ? ic_pay_statement : ic_pay_statement_gray,
        icon: ic_pay_statement_gray,
        title: "Pagar\nresumen"
      },
      {
        id: 3,
        icon: activated ? ic_block_card : ic_block_card_gray,
        title: "Bloquear\ntarjeta"
      },
    ]
    return (
      <FlatList
        data={actions}
        horizontal
        keyExtractor={item => item.title}
        style={{
          marginTop: 32,
          flexGrow: 0,
        }}
        contentContainerStyle={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          flex: 1,
          paddingHorizontal: 24
        }}
        renderItem={(item) => {
          return <TouchableOpacity
            onPress={() => {
              handleActions(item.item.id)
            }}
            activeOpacity={.8}
            style={{ alignContent: "center", alignItems: "center", marginHorizontal: 8, }}>
            <SvgXml xml={item.item.icon} />
            <CustomText
              marginTop={16}
              textAlign='center'
              numberOfLines={2}
              text={item.item.title} />
          </TouchableOpacity>
        }} />
    )
  }

  const StatusSteps = () => {
    return (
      <View style={{ paddingHorizontal: 16, marginTop: 24 }}>
        <CustomText
          textColor={colors.blue200}
          fontFamily={Fonts.DMSansMedium}
          textSize={FontsSize._16_SIZE}
          text='Próximos pasos:' />
        {
          steps.find(item => item.status === viewModel.card.zeroStatus)?.steps.map(item => {
            return <View style={{ alignContent: "center", alignItems: "center", flexDirection: "row", marginTop: 6 }}>
              <SvgXml xml={item.icon} style={{ marginEnd: 6 }} />
              <CustomText
                textAlign='center'
                numberOfLines={2}
                text={item.title} />
            </View>
          })
        }
      </View>
    )
  }

  const StatusDetail = () => {
    const item = steps.find(item => item.status === viewModel.card.zeroStatus)
    return (
      <View>
        {
          item &&
          <View>
            <View style={{
              marginTop: 32,
              marginHorizontal: 16,
              flexDirection: "row",
              borderTopWidth: 1,
              borderBottomWidth: 1,
              borderTopColor: colors.lightGray04,
              borderBottomColor: colors.lightGray04,
              paddingVertical: 8,
              justifyContent: "space-between"
            }}>
              <CustomText
                fontFamily={Fonts.DMSansMedium}
                text={item.title} />
              <CustomText
                text={item.description} />
            </View>
            <StatusSteps />

          </View>
        }
      </View>

    )
  }

  let title = undefined
  switch (viewModel.card.zeroStatus) {
    case "DELIVERY":
      title = "Coordinar envío"
      break
    case "ACTIVATE":
      title = "Activar tarjeta"
      break
    case "BLOCKED":
      title = "Desbloquear tarjeta"
      break
    case "BLOCKED_PIN":
      title = "Desbloquear PIN de tarjeta"
      break
  }

  const handleNavigation = () => {
    switch (viewModel.card.zeroStatus) {
      case "DELIVERY":
        nav.navigate(ROUTES.Cards.Delivery.DeliveryScreen.name as never)
        break
      case "ACTIVATE":
        nav.navigate(ROUTES.Cards.Activation.ActivationScreen.name as never)
        break
      case "BLOCKED":
        askForBLockCard()
        break
    }
  }

  const handleActions = (id: number) => {
    switch (id) {
      case 0:
        if (viewModel.card.zeroStatus === "ACTIVATED") goToDetails()
        // validationModal(goToDetails)
        break
      case 3:
        if (viewModel.card.zeroStatus === "ACTIVATED" || viewModel.card.zeroStatus === "BLOCKED") askForBLockCard()
        break
    }
  }

  const validationModal = (action: () => void) => {
    let title = "Debemos validar tu identidad"
    let message = "Selecciona una opción para validarte"
    let buttonText = "Validar"
    modal({
      title: title,
      message: message,
      image: ic_alert_triangle_filled,
      enableOverlayTap: "none",
      showIcoClose: true,
      content: (actionCloseModal: any) => {
        return <View style={{}}>
          <View style={{ alignItems: 'center', marginTop: 80 }}>
            <SvgXml xml={ic_alert_triangle_filled}></SvgXml>
          </View>
          <CustomText
            marginTop={24}
            textAlign='center'
            fontFamily={Fonts.DMSansBold}
            textSize={FontsSize._24_SIZE}
            text={title} />
          <CustomText
            marginTop={8}
            textSize={FontsSize._16_SIZE}
            textAlign='center'
            text={message} />

          <View style={{ flexDirection: "row", marginTop: 24, alignItems: "center" }}>
            <SvgXml xml={ic_radio_blue_active} style={{ marginEnd: 8 }} />
            <CustomText
              textSize={FontsSize._16_SIZE}
              fontFamily={Fonts.DMSansMedium}
              text='Autenticación por biometría' />
          </View>
          <View style={{ flexDirection: "row", marginTop: 18, alignItems: "center" }}>
            <SvgXml xml={ic_radio_blue_inactive} style={{ marginEnd: 8 }} />
            <CustomText
              textSize={FontsSize._16_SIZE}
              fontFamily={Fonts.DMSansMedium}
              text='Autenticación por correo electrónico' />
          </View>
          <View style={{ marginTop: 32 }}>

            <ButtonPrimary
              text={buttonText}
              onPress={() => {
                actionCloseModal()
                goToDetails()
              }}
              position='relative' />
          </View>
        </View>
      },
      size: "50%"
    })
  }

  const goToDetails = () => {
    nav.navigate(ROUTES.Cards.CardDetailsScreen.name as never)
  }

  const askForBLockCard = () => {
    let title = ""
    let message = ""
    let buttonText = ""
    if (viewModel.card.zeroStatus === "BLOCKED") {
      title = "¿Desbloquear tu tarjeta?"
      message = "Se esta por desbloquear tu tarjeta terminada en **** " + viewModel.card.visibleNum?.slice(-4) + ". ¿Estas seguro de de continuar con esta acción?"
      buttonText = "Desbloquear tarjeta"
    } else {
      title = "¿Bloquear tu tarjeta?"
      message = "Se esta por bloquear tu tarjeta terminada en ****  " + viewModel.card.visibleNum?.slice(-4) + ". ¿Estas seguro de de continuar con esta acción?"
      buttonText = "Bloquear tarjeta"
    }
    modal({
      title: title,
      message: message,
      image: ic_alert_triangle_filled,
      enableOverlayTap: "none",
      showIcoClose: true,
      labelButtonPrimary: buttonText,
      actionButtonPrimary() {
        setTimeout(() => {
          viewModel.blockCard()
        }, 500)

      },
    })
  }

  useEffect(() => {
    return reaction(
      () => viewModel.blockCardResponse,
      () => {
        handleBlockCard()
      }
    )
  }, [])

  useEffect(() => {
    return reaction(
      () => viewModel.unblockCardResponse,
      () => {
        handleBlockCard()
      }
    )
  }, [])

  const handleBlockCard = () => {
    let title = ""
    let message = ""
    if (viewModel.card.zeroStatus === "BLOCKED") {
      title = "Tarjeta desbloqueada"
      message = "Se ha desbloqueado tu tarjeta con éxito."
    } else {
      title = "Tarjeta bloqueada"
      message = "Se ha bloqueado tu tarjeta con éxito."
    }
    modal({
      title: title,
      message: message,
      image: ic_success_check_filled,
      enableOverlayTap: "none",
      showIcoClose: true,
      actionCloseModal() {
      },
      size: "30%"
    })
    // if (isBlocked) {

    // } else {
    //   modal({
    //     title: "Ha ocurrido un problema",
    //     message: "No se ha podido bloquear tu tarjeta aguarda unos minutos he inténtalo nuevamente.",
    //     image: ic_success_check_filled,
    //     enableOverlayTap: "none",
    //     showIcoClose: true,
    //     actionCloseModal() {

    //     },
    //     size: "30%"
    //   })
    // }
    if (viewModel.card.zeroStatus === "BLOCKED") {
      viewModel.setCard({ ...viewModel.card, zeroStatus: "ACTIVATED" })
    } else {
      viewModel.setCard({ ...viewModel.card, zeroStatus: "BLOCKED" })
    }
  }

  return (
    <ToolbarView
      text='Información de la tarjeta'
    >
      <ZeroCard item={viewModel.card} />
      <CardActions />
      <StatusDetail />

      {title &&
        <ButtonPrimary
          marginHorizontal={16}
          text={title}
          onPress={handleNavigation} />}

    </ToolbarView>
  );
});