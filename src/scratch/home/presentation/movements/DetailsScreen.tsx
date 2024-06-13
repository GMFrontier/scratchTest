import { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, ScrollView, TouchableOpacity, Image } from 'react-native';
import { observer } from 'mobx-react-lite';
import { reaction } from 'mobx';
import { ThemeContext } from '../../../../core/presentation/contexts/theme/ThemeContext';
import { useStatusBar } from '../../../../core/presentation/contexts/statusBar/StatusBarContext';
import { useTranslation } from '../../../../core/presentation/contexts/translations/LanguageProvider';
import Sizebox from '../../../../core/presentation/components/item/Sizebox';
import { CustomText } from '../../../../core/presentation/components/text/CustomText';
import LinearGradient from 'react-native-linear-gradient';
import ToolbarView from '../../../../core/presentation/components/toolbar/ToolbarView';
import FontsSize from '../../../../core/constants/FontsSize';
import Fonts from '../../../../core/constants/Fonts';
import { SvgXml } from 'react-native-svg';
import { Movements, getCategory, getColor, getIcon } from '../components/MovementsItem';
import ic_share from '../../../../../assets/svg/ic_share';
import ic_edit_outline_blue from '../../../../../assets/svg/ic_edit_outline_blue';
import { ButtonLink } from '../../../../core/presentation/components/button/ButtonLink';
import { useNavigation } from '@react-navigation/native';
import { ROUTES } from '../../../navigation/routes';

export const DetailsScreen = observer(() => {

  const item: Movements = { id: "854123452", title: "Factura Claro Panamá", type: "none", status: "approved", amount: 23.31 }


  const { title, status, type, amount } = item

  const {
    theme: { colors },
  } = useContext(ThemeContext);
  const statusBar = useStatusBar()
  const navigation = useNavigation()

  useEffect(() => {
    statusBar.setHomeStatusBar()
    return () => {
      statusBar.setPrimaryStatusBar()
    }
  })

  const { translation } = useTranslation();

  const DetailRow = ({ title, text, textColor }: any) => {
    return (
      <View
        style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 24 }}>
        <CustomText
          textSize={FontsSize._14_SIZE}
          fontFamily={Fonts.DMSansMedium}
          text={title} />
        <CustomText
          textSize={FontsSize._14_SIZE}
          fontFamily={Fonts.DMSansMedium}
          textColor={textColor}
          text={text} />
      </View>
    )
  }

  return (
    <ToolbarView
      type='blue'
      setIconEnd={ic_share}
      onPressIcoEnd={() => { }}
      text='Detalle del movimiento'>
      <LinearGradient colors={[colors.blueHome, '#282828A6']} style={styles.linearGradient} />

      <View
        style={{
          padding: 16,
        }}>
        <CustomText
          textColor={colors.white}
          textSize={FontsSize._20_SIZE}
          textAlign='center'
          text='Factura Claro Panamá' />
        <View style={{ flexDirection: "row", alignItems: "center", marginTop: 8, alignSelf: "center" }} >
          <CustomText
            textSize={FontsSize._24_SIZE}
            textColor={colors.white}
            fontFamily={Fonts.DMSansMedium}
            text='$' />
          <Sizebox width={4} />
          <CustomText
            fontFamily={Fonts.DMSansBold}
            textSize={FontsSize._48_SIZE}
            textColor={colors.white}
            text='200.00' />
        </View>
        <View
          style={{
            backgroundColor: colors.accentSecondary,
            padding: 16,
            borderRadius: 16,
            marginTop: 92
          }}
        >
          <View
            style={{ flexDirection: "row", alignItems: "center", alignContent: "center" }}
          >
            <View style={{ backgroundColor: getColor(type, colors), borderRadius: 8, padding: 8, }}>
              <SvgXml xml={getIcon(type)} />
            </View>
            <View
              style={{ marginStart: 8 }}>
              <CustomText
                textSize={FontsSize._16_SIZE}
                text={"Categoría:"} />
              <CustomText
                textSize={FontsSize._12_SIZE}
                marginTop={4}
                text={getCategory(type)} />
            </View>
            <TouchableOpacity
              activeOpacity={.8}
              onPress={() => {
                navigation.navigate(ROUTES.Home.EditCategoryScreen.name as never)
              }}
              style={{ flex: 1, alignItems: "flex-end", }}>
              <SvgXml xml={ic_edit_outline_blue} />
            </TouchableOpacity>
          </View>
          <View style={{ marginTop: 24, backgroundColor: "#D7DAE0", height: 1, borderRadius: 1, width: "100%", }} />
          <View>
            <DetailRow title="Fecha:" text="DD/MM/AAAA" />
            <DetailRow title="Hora:" text="00:15 AM" />
            <DetailRow title="Tipo:" text="Compra" />
            <DetailRow title="Estado:" text="Aprobado" textColor={colors.green400} />
            <DetailRow title="Puntos ganados:" text="45 pts" />
          </View>
          <View style={{ marginTop: 24, backgroundColor: "#D7DAE0", height: 1, borderRadius: 1, width: "100%", }} />
          <DetailRow title="ID del movimiento:" text="85412345" />
        </View>
        <View
          style={{ alignSelf: "center", marginTop: 24 }}>
          <ButtonLink
            text='Agregar un comentario'
            onPress={() => {
              navigation.navigate(ROUTES.Home.AddCommentScreen.name as never)
            }} />
        </View>
        <Sizebox height={150} />
        <Sizebox height={150} />
        <Sizebox height={150} />
        <Sizebox height={150} />
        <Sizebox height={150} />
      </View>
    </ToolbarView>
  );
});

const styles = StyleSheet.create({
  containerMain: {
    flex: 1,
  },
  linearGradient: {
    top: 56,
    height: 184,
    width: "100%",
    position: "absolute",
    zIndex: -1
  }
});