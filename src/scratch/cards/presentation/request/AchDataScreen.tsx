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
import { useNavigation } from '@react-navigation/native';
import { ROUTES } from '../../../navigation/routes';
import Sizebox from '../../../../core/presentation/components/item/Sizebox';
import { Checkbox } from '../../../../core/presentation/components/checkbox/Checkbox';
import { ButtonPrimary } from '../../../../core/presentation/components/button/ButtonPrimary';
import { TextInputMain } from '../../../../core/presentation/components/input/TextInputMain';
import SelectCustomDropdown from '../../../../core/presentation/components/spinner/SelectCustomDropdown';
import CardsViewModel from '../CardsViewModel';
import { TYPES } from '../../../di/types';
import container from '../../../di/inversify.config';

interface SelectSimpleData {
  id: string;
  title: string;
  data?: string
}


export const AchDataScreen = observer(() => {
  const viewModel = container.get<CardsViewModel>(TYPES.CardsViewModel);

  const {
    theme: { colors },
  } = useContext(ThemeContext);

  const statusBar = useStatusBar()

  const showStateModal = useNewModalContext().showStateModal
  const nav = useNavigation()

  const { translation } = useTranslation();

  const banks: SelectSimpleData[] = [
    { id: "0", title: "Banco 1", },
    { id: "1", title: "Banco 2", },
    { id: "2", title: "Banco 3", },
  ]

  const accountTypes: SelectSimpleData[] = [
    { id: "0", title: "Corriente", },
    { id: "1", title: "Ahorro", },
  ]

  const [accountNumber, setAccountNumber] = useState('');
  const [bank, setBank] = useState<SelectSimpleData | undefined>(undefined);
  const [accountType, setAccountType] = useState<SelectSimpleData | undefined>(undefined);
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    const isNameValid = bank !== undefined
    const isLastNameValid = accountType !== undefined
    const isPhoneValid = accountNumber.length > 0

    setIsFormValid(
      isNameValid &&
      isLastNameValid &&
      isPhoneValid
    )
    console.log(
      isNameValid + " " + isLastNameValid + " " +
      isPhoneValid + " "
    )
  }, [
    bank,
    accountType,
    accountNumber,
  ])

  useEffect(() => {
    statusBar.setPrimaryStatusBar()
    return () => {
      statusBar.setHomeStatusBar()
    }
  })

  return (
    <ToolbarView
      text='Pago con ACH'
    >
      <View style={style.containerMain}>
        <CustomText
          text={"Ingresa los datos bancarios"}
          textColor={colors.secondary}
          fontFamily={Fonts.DMSansBold}
          textSize={FontsSize._32_SIZE} />
        <CustomText
          text='Asegúrate que correspondan a la cuenta bancaria desde donde realizará la transferencia.'
          textSize={FontsSize._16_SIZE}
          textColor={colors.white}
          marginTop={8} />

        <SelectCustomDropdown
          setItem={setBank}
          data={banks}
          marginTop={16}
          labelTitle={"Banco emisor"} />

        <SelectCustomDropdown
          setItem={setAccountType}
          data={accountTypes}
          marginTop={16}
          labelTitle={"Tipo de cuenta"} />

        <TextInputMain
          marginTop={16}
          onChangeText={setAccountNumber}
          labelTitleRequired={true}
          labelTitle={"Número de cuenta"}
          inputType="number"
          maxLength={30}
          // errorInfo={"Por favor ingresa tus datos sin caracteres especiales, sólo letras."}
          inputValue={accountNumber}
          placeholder={"Ingresar número de cuenta"} />

        <ButtonPrimary
          text={translation.file.next}
          disabled={!isFormValid}
          onPress={() => {
            viewModel.setRequestPayment({
              type: "ach",
              userId: "",
              amount: 0,
              bank: bank.title ?? "",
              account_type: accountType.title ?? "",
              account_number: accountNumber,
            })
            nav.navigate(ROUTES.Cards.AchTransferScreen.name as never)

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