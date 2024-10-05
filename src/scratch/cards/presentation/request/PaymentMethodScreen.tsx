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
import ic_radio_blue_active from '../../../../../assets/svg/ic_radio_blue_active';
import ic_radio_blue_inactive from '../../../../../assets/svg/ic_radio_blue_inactive';
import ic_ach from '../../../../../assets/svg/alert_error_ico_content';
import ic_card_outline from '../../../../../assets/svg/ic_card_outline';
import home_ico_card_content from '../../../../../assets/svg/home_ico_card_content';

interface ZeroCard {
  status: "DELIVERY" | "ACTIVATE"
}

export const PaymentMethodScreen = observer(() => {

  const {
    theme: { colors },
  } = useContext(ThemeContext);

  const statusBar = useStatusBar()

  const showStateModal = useNewModalContext().showStateModal
  const nav = useNavigation()

  const { translation } = useTranslation();

  const options = [
    {
      id: 0,
      title: "Transferencia ACH",
      icon: ic_ach,
    },
    // {
    //   id: 1,
    //   title: "Tarjetas",
    //   icon: home_ico_card_content,
    // }
  ]

  const [option, setOption] = useState(options[0]);

  const handleNavigation = () => {
    if (option.id === 0) {
      nav.navigate(ROUTES.Cards.AchDataScreen.name as never)
    } else {
      nav.navigate(ROUTES.Cards.PaymentDataScreen.name as never)
    }
  }

  useEffect(() => {
    statusBar.setPrimaryStatusBar()
    return () => {
      statusBar.setHomeStatusBar()
    }
  })

  const PaymentMethod = ({ item }: any) => {
    return <TouchableOpacity
      style={{
        marginTop: 16,
        flexDirection: "row",
        borderRadius: 8,
        backgroundColor: colors.accentSecondary,
        paddingVertical: 18,
        paddingHorizontal: 16,
        justifyContent: "space-between",
        alignItems: "center",
      }}
      onPress={() => {
        setOption(item)
      }}
    >
      <View style={{
        flexDirection: "row", alignItems: "center",
      }}>
        <SvgXml xml={item.icon} style={{ marginEnd: 8 }} />
        <CustomText
          text={item.title}
          fontFamily={Fonts.DMSansMedium}
          textColor={colors.white}
          textSize={FontsSize._16_SIZE} />
      </View>
      <SvgXml style={{}} xml={item.id === option.id ? ic_radio_blue_active : ic_radio_blue_inactive} />

    </TouchableOpacity>
  }

  return (
    <ToolbarView
      text='Pago de emisión'
    >
      <View style={style.containerMain}>
        <CustomText
          text={"Selecciona un método de pago"}
          textColor={colors.secondary}
          fontFamily={Fonts.DMSansBold}
          textSize={FontsSize._32_SIZE} />
        <CustomText
          text='Que se ajuste a tus facilidades'
          textSize={FontsSize._16_SIZE}
          textColor={colors.white}
          marginTop={8} />

        <FlatList
          data={options}
          renderItem={PaymentMethod} />

        <ButtonPrimary
          text={translation.file.next}
          disabled={!option}
          onPress={handleNavigation} />


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