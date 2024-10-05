import { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, ScrollView, TouchableOpacity, Image, Dimensions, Animated } from 'react-native';
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
import { FlagInput } from '../../../../core/presentation/components/input/FlagInput';
import { Switch } from 'react-native-switch';
import CardsViewModel from '../CardsViewModel';
import { TYPES } from '../../../di/types';
import container from '../../../di/inversify.config';
import { Delivery } from '../models/Request';
import ic_exclamation_error_filled_48 from '../../../../../assets/svg/ic_exclamation_error_filled_48';

export const EditScreen = observer(() => {
  const viewModel = container.get<CardsViewModel>(TYPES.CardsViewModel);

  const {
    theme: { colors },
  } = useContext(ThemeContext);

  const statusBar = useStatusBar()

  const modal = useNewModalContext().showStateModal
  const nav = useNavigation()

  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [document, setDocument] = useState('');
  const [showMoreOptions, setShowMoreOptions] = useState(false);
  const [selectedOption, setSelectedOption] = useState(
    '\ud83c\uddf5\ud83c\udde6*+507*PA',
  );
  const [fadeAnim] = useState(new Animated.Value(0));

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
              { screen: ROUTES.Card.CardsScreen.name },
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

  return (
    <ToolbarView
      text='Editar entrega'
    >
      <View style={style.containerMain}>
        <CustomText
          text={"Modificar entrega"}
          textColor={colors.secondary}
          fontFamily={Fonts.DMSansBold}
          textSize={FontsSize._32_SIZE} />
        <CustomText
          text='Completa los datos coordinar el envío de tu tarjeta'
          textSize={FontsSize._16_SIZE}
          textColor={colors.white}
          marginTop={8} />

        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TextInputMain
            marginTop={18}
            onChangeText={setAddress}
            labelTitleRequired={true}
            labelTitle={"Dirección de entrega"}
            inputType="alphanumeric"
            maxLength={50}
            flex={1}
            // errorInfo={"Por favor ingresa tus datos sin caracteres especiales, sólo letras."}
            inputValue={address}
            placeholder={"Ingresar dirección de entrega"} />
          <TouchableOpacity
            onPress={() => {
              nav.navigate(ROUTES.Cards.Delivery.MapScreen.name as never)
            }}
            activeOpacity={.8}
            style={{
              padding: 8, borderRadius: 8, backgroundColor: colors.secondaryBlue03, marginStart: 6, alignSelf: "flex-end", height: 56, width: 56, justifyContent: "center"
            }}>
            <SvgXml xml={ic_location_large} style={{ alignSelf: "center", }} />

          </TouchableOpacity>
        </View>

        <FlagInput
          phone={phone}
          marginTop={16}
          setPhone={setPhone}
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption} />

        <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 18 }}>
          <CustomText
            text='¿Recibe otra persona el paquete?' />
          <Switch
            value={showMoreOptions}
            renderActiveText={false}
            renderInActiveText={false}
            onValueChange={(value) => {
              if (!showMoreOptions) {
                Animated.timing(fadeAnim, {
                  toValue: 1,
                  duration: 200,
                  useNativeDriver: true,
                }).start();
              } else {
                Animated.timing(fadeAnim, {
                  toValue: 0,
                  duration: 200,
                  useNativeDriver: true,
                }).start();
              }
              setShowMoreOptions(!showMoreOptions)
            }}
            backgroundActive={colors.blue200}
            backgroundInactive={colors.lightGray04}
            circleBorderWidth={0}
            switchWidthMultiplier={2.5}
            barHeight={24}
            switchRightPx={1.7}
            switchLeftPx={1.7}
            circleSize={20}
          />
        </View>

        {showMoreOptions && <Animated.View
          style={{
            opacity: fadeAnim,
          }}>

          <TextInputMain
            marginTop={16}
            onChangeText={setName}
            labelTitleRequired={true}
            labelTitle={"Nombre y apellido"}
            inputType='name'
            maxLength={30}
            errorInfo={"Por favor ingresa tus datos sin caracteres especiales, sólo letras."}
            inputValue={name}
            placeholder={"Ingresar nombre y apellido"} />
          <TextInputMain
            marginTop={16}
            onChangeText={setDocument}
            labelTitleRequired={true}
            labelTitle={"Documento"}
            inputType='number'
            maxLength={16}
            inputValue={document}
            placeholder={"Ingresar numero de documento"} />
        </Animated.View>}

        <ButtonPrimary
          text={"Guardar datos de entrega"}
          onPress={() => {
            let delivery: Delivery = {
              holderReceipt: !showMoreOptions,
              address: { addressLine1: address },
              ...(showMoreOptions && { nameReceipt: name }),
              telephone: selectedOption.split('*')[1] + phone,
              ...(showMoreOptions && { idReceipt: document }),
            }

            viewModel.sendDeliveryData(delivery)

            // modal({
            //   title: "Datos guardados",
            //   message: "Tus datos de entrega han sido actualizados con éxito.",
            //   image: ic_success_check_filled,
            //   enableOverlayTap: "none",
            //   showIcoClose: true,
            //   actionCloseModal() {
            //     nav.goBack()
            //   },
            //   size: "30%"
            // })
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