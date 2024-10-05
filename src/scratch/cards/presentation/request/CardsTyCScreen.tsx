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

interface ZeroCard {
  status: "DELIVERY" | "ACTIVATE"
}

export const CardsTyCScreen = observer(() => {

  const {
    theme: { colors },
  } = useContext(ThemeContext);

  const statusBar = useStatusBar()

  const showStateModal = useNewModalContext().showStateModal
  const nav = useNavigation()

  const { translation } = useTranslation();

  const [checkbox, setCheckbox] = useState(false);

  useEffect(() => {
    statusBar.setPrimaryStatusBar()
    return () => {
      statusBar.setHomeStatusBar()
    }
  })

  const TyCItem = ({ title, description }: any) => {
    return <View style={{ marginTop: 16 }}>
      <CustomText
        text={title}
        fontFamily={Fonts.DMSansMedium}
        textColor={colors.white}
        textSize={FontsSize._16_SIZE} />
      <CustomText
        text={description}
        marginTop={4} />
    </View>
  }

  return (
    <ToolbarView
      text='Solicita tu tarjeta'
    >
      <View style={style.containerMain}>
        <CustomText
          text={"Antes de continuar"}
          textColor={colors.secondary}
          fontFamily={Fonts.DMSansBold}
          textSize={FontsSize._32_SIZE} />
        <CustomText
          text='Lee detalladamente y acepta nuestros términos de uso.'
          textSize={FontsSize._16_SIZE}
          marginTop={8} />

        <View style={{ backgroundColor: colors.accentSecondary, borderRadius: 20, marginTop: 18, paddingHorizontal: 16, paddingVertical: 8 }}>

          <View style={{ flexDirection: "row", alignItems: "center", alignSelf: "center", }}>
            <CustomText
              text='$'
              fontFamily={Fonts.DMSansMedium}
              textSize={FontsSize._24_SIZE} />
            <Sizebox width={4} />
            <CustomText
              text='25.00'
              textColor={colors.white}
              fontFamily={Fonts.DMSansMedium}
              textSize={FontsSize._48_SIZE} />
          </View>
          <CustomText
            text='Costo total de emisión'
            textAlign='center'
            marginTop={16}
            textSize={FontsSize._12_SIZE} />
        </View>
        <View style={{ backgroundColor: colors.accentSecondary, borderRadius: 20, marginTop: 18, padding: 24, paddingTop: 8 }}>
          <TyCItem title={'Es de uso personal:'} description={'No la puedes prestar o transferir a otra persona.'} />
          <TyCItem title={'Sin mensualidades:'} description={'Nuestra tarjeta no tiene mensualidad ni costos de mantenimiento.'} />
          <TyCItem title={'Suma de puntos:'} description={'Por cada compra sumas puntos mientras mas, puntos acumules mas beneficios obtendrás.'} />
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
            label={"Declaro haber leído los términos y condiciones de uso de la tarjeta."}
            onToggle={setCheckbox}
          />
        </View>

        <ButtonPrimary
          text={translation.file.next}
          disabled={!checkbox}
          onPress={() => { nav.navigate(ROUTES.Cards.PaymentMethodScreen.name as never) }} />


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