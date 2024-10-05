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
import { ButtonLink } from '../../../../core/presentation/components/button/ButtonLink';
import Clipboard from '@react-native-clipboard/clipboard';
import { useToastContext } from '../../../../core/presentation/contexts/messages/useToastContext';

export const AchTransferScreen = observer(() => {

  const {
    theme: { colors },
  } = useContext(ThemeContext);

  const statusBar = useStatusBar()

  const showStateModal = useNewModalContext().showStateModal
  const toast = useToastContext().showInfoToast
  const nav = useNavigation()

  const { translation } = useTranslation();

  const [checkbox, setCheckbox] = useState(false);

  useEffect(() => {
    statusBar.setPrimaryStatusBar()
    return () => {
      statusBar.setHomeStatusBar()
    }
  })

  const TyCItem = ({ title, description, buttonText, onPress }: any) => {
    return <View style={{ marginTop: 16 }}>
      <CustomText
        text={title}
        fontFamily={Fonts.DMSansMedium}
        textColor={colors.white}
        textSize={FontsSize._16_SIZE} />

      <View style={{ flexDirection: "row", alignContent: "center", alignItems: "center", justifyContent: "space-between" }}>
        <CustomText
          text={description}
          marginTop={4} />
        {buttonText &&
          <ButtonLink
            text={buttonText}
            onPress={onPress} />}
      </View>
    </View>
  }

  return (
    <ToolbarView
      text='Solicita tu tarjeta'
    >
      <View style={style.containerMain}>
        <CustomText
          text={"Realiza la\ntransferencia"}
          textColor={colors.secondary}
          fontFamily={Fonts.DMSansBold}
          textSize={FontsSize._32_SIZE} />
        <View style={{ flexDirection: "row", marginTop: 8 }}>
          <CustomText
            text='1.'
            textSize={FontsSize._16_SIZE}
            textColor={colors.white} />
          <CustomText
            text=' Ingrese a su cuenta bancaria indicada anteriormente.'
            textSize={FontsSize._16_SIZE}
            textColor={colors.white} />
        </View>
        <View style={{ flexDirection: "row", marginTop: 0 }}>
          <CustomText
            text='2.'
            textSize={FontsSize._16_SIZE}
            textColor={colors.white} />
          <CustomText
            text=' Transfiera el monto a recargar a la siguiente cuenta y guarde el comprobante de pago:'
            textSize={FontsSize._16_SIZE}
            textColor={colors.white} />
        </View>

        <View style={{ backgroundColor: colors.accentSecondary, borderRadius: 20, marginTop: 18, padding: 24, paddingTop: 8 }}>
          <TyCItem title={'Titular de la cuenta:'} description={'Zero Card S.A'} />
          <TyCItem title={'Numero de cuenta:'} description={'03-202-00322-7'} buttonText={"Copiar"} onPress={() => {
            Clipboard.setString("03202003227");
            toast("Copiado al portapapeles");
          }} />
          <TyCItem title={'Tipo de cuenta:'} description={'Corriente'} />
          <TyCItem title={'Monto a pagar:'} description={'$5.51'} />
        </View>
        <View style={{
          flex: 1,
          marginBottom: 120,
          flexWrap: "wrap"
        }} >
          <Checkbox
            opacity={.8}
            marginTop={27}
            checked={checkbox}
            label={"Confirmo que he realizado la transferencia y cuento con el comprobante de la operación"}
            onToggle={setCheckbox}
          />
        </View>

        <ButtonPrimary
          text={translation.file.next}
          disabled={!checkbox}
          onPress={() => { nav.navigate(ROUTES.Cards.AchReceiptScreen.name as never) }} />


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