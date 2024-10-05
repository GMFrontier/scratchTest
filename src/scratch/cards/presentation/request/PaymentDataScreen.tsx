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
import { TextInputMain } from '../../../../core/presentation/components/input/TextInputMain';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import ic_calendar_outline from '../../../../../assets/svg/ic_calendar_outline';
import ic_success_check_filled from '../../../../../assets/svg/ic_success_check_filled';

interface ZeroCard {
  status: "DELIVERY" | "ACTIVATE"
}

export const PaymentDataScreen = observer(() => {

  const {
    theme: { colors },
  } = useContext(ThemeContext);

  const statusBar = useStatusBar()

  const showStateModal = useNewModalContext().showStateModal
  const nav = useNavigation()

  const { translation } = useTranslation();
  const modal = useNewModalContext().showStateModal

  const [number, setNumber] = useState();
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [date, setDate] = useState('');

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

  // useEffect(() => {
  //   statusBar.setPrimaryStatusBar()
  //   return () => {
  //     statusBar.setHomeStatusBar()
  //   }
  // })

  return (
    <ToolbarView
      text='Solicita tu tarjeta'
    >
      <View style={style.containerMain}>
        <CustomText
          text={"Ingresa los datos de la tarjeta."}
          textColor={colors.secondary}
          fontFamily={Fonts.DMSansBold}
          textSize={FontsSize._32_SIZE} />
        <CustomText
          text='Asegúrate que correspondan al titular que solicita la tarjeta'
          textColor={colors.white}
          textSize={FontsSize._16_SIZE}
          marginTop={8} />

        <TextInputMain
          inputValue={number}
          marginTop={16}
          inputType="number"
          labelTitleRequired={true}
          placeholder="0000 0000 0000 0000"
          labelTitle={"Número de tarjeta"}
          onChangeText={setNumber}
        />

        <TextInputMain
          inputValue={number}
          marginTop={16}
          inputType="name"
          labelTitleRequired={true}
          placeholder="Ingresar nombre y apellido"
          labelTitle={"Nombre del tarjetahabiente"}
          onChangeText={setNumber}
        />

        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

          <View style={{ flex: 1 }}>
            <TextInputMain
              marginTop={16}
              inputValue={date}
              onChangeText={setDate}
              inputType="cardDate"
              placeholder='MM/AA'
              labelTitle={"Fecha de vencimiento"}
              labelTitleRequired={true}
            />
          </View>
          <Sizebox width={16} />
          <View style={{ flex: 1 }}>
            <TextInputMain
              inputValue={number}
              marginTop={16}
              inputType="number"
              labelTitleRequired={true}
              placeholder="123"
              labelTitle={"CVV"}
              onChangeText={setNumber}
            />

          </View>
        </View>

        <ButtonPrimary
          text={translation.file.next}
          onPress={() => {
            modal({
              title: "Pago realizado",
              message: "Te recordamos que validada tu transferencia, podras coordinar el envio de tu tarjeta entre 3 a 5 días hábiles.",
              labelButtonPrimary: "Ir al inicio",
              actionButtonPrimary() { handleNavigation() },
              image: ic_success_check_filled,
              enableOverlayTap: "none"
            })
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