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
import { getCategory, getColor, getIcon, getStatus } from '../components/MovementsItem';
import ic_share from '../../../../../assets/svg/ic_share';
import ic_edit_outline_blue from '../../../../../assets/svg/ic_edit_outline_blue';
import { ButtonLink } from '../../../../core/presentation/components/button/ButtonLink';
import { useNavigation } from '@react-navigation/native';
import { ROUTES } from '../../../navigation/routes';
import HomeViewModel from '../HomeViewModel';
import container from '../../../di/inversify.config';
import { TYPES } from '../../../di/types';
import { toMoneyFormat, toMoneyNoSymbol } from '../../../../core/data/utils/Utils';

export const DetailsScreen = observer(() => {

  const viewModel = container.get<HomeViewModel>(
    TYPES.HomeViewModel,
  );

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

  const date = new Date(viewModel.movement.created_at)

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
      onPressIconEnd={() => { }}
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
          text={viewModel.movement.detail ?? viewModel.movement.messageSys} />
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
            text={toMoneyNoSymbol(viewModel.movement.amount)} />
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
            <View style={{ backgroundColor: getColor(viewModel.movement.category_id, colors), borderRadius: 8, padding: 8, }}>
              <SvgXml xml={getIcon(viewModel.movement.category_id)} />
            </View>
            <View
              style={{ marginStart: 8 }}>
              <CustomText
                textSize={FontsSize._16_SIZE}
                text={"Categoría:"} />
              <CustomText
                textSize={FontsSize._12_SIZE}
                marginTop={4}
                text={getCategory(viewModel.movement.category_id)} />
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
            <DetailRow title="Fecha:" text={date.toLocaleDateString()} />
            <DetailRow title="Hora:" text={date.toLocaleTimeString()} />
            <DetailRow title="Tipo:" text={viewModel.movement.type ?? "--"} />
            <DetailRow title="Estado:" text={getStatus(viewModel.movement.status)} textColor={getColor(viewModel.movement.status, colors)} />
            <DetailRow title="Puntos ganados:" text={"--"} />
          </View>
          <View style={{ marginTop: 24, backgroundColor: "#D7DAE0", height: 1, borderRadius: 1, width: "100%", }} />
          <DetailRow title="ID del movimiento:" text={viewModel.movement.codOper ?? viewModel.movement._id} />
        </View>
        {
          !viewModel.movement.comment &&
          <View
            style={{ alignSelf: "center", marginTop: 24 }}>
            <ButtonLink
              text='Agregar un comentario'
              onPress={() => {
                navigation.navigate(ROUTES.Home.AddCommentScreen.name as never)
              }} />
          </View>
        }
        {
          viewModel.movement.comment &&
          <View
            style={{ marginTop: 24, justifyContent: "space-between", flexDirection: "row", marginHorizontal: 8 }}>
            <CustomText
              text={viewModel.movement.comment}
              textSize={FontsSize._14_SIZE}
              textColor={colors.white}
            />
            <ButtonLink
              text='Editar comentario'
              onPress={() => {
                navigation.navigate(ROUTES.Home.AddCommentScreen.name as never)
              }} />
          </View>
        }
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