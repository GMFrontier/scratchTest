import { useContext, useState } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { observer } from 'mobx-react-lite';
import React = require('react');
import { ThemeContext } from '../../../../core/presentation/contexts/theme/ThemeContext';
import { useTranslation } from '../../../../core/presentation/contexts/translations/LanguageProvider';
import { CustomText } from '../../../../core/presentation/components/text/CustomText';
import Fonts from '../../../../core/constants/Fonts';
import FontsSize from '../../../../core/constants/FontsSize';
import { ButtonPrimary } from '../../../../core/presentation/components/button/ButtonPrimary';
import { CommonActions, useNavigation } from '@react-navigation/native';
import Sizebox from '../../../../core/presentation/components/item/Sizebox';
import changeNavigationBarColor from 'react-native-navigation-bar-color';
import ToolbarView from '../../../../core/presentation/components/toolbar/ToolbarView';
import DocumentPicker from 'react-native-document-picker';
import { ROUTES } from '../../../navigation/routes';

export const RegisterCompleteScreen = observer(() => {

  const {
    theme: { colors },
  } = useContext(ThemeContext);
  const { translation } = useTranslation();
  const nav = useNavigation()

  React.useEffect(() => {
    changeNavigationBarColor(colors.accent);
  })

  return (
    <ToolbarView
      text={"Registro completado"} >

      <View
        style={style.containerMain}>

        <CustomText
          text={"Tu crédito ha sido pre-aprobado"}
          textColor={colors.secondary}
          fontFamily={Fonts.DMSansBold}
          textSize={FontsSize._32_SIZE} />

        <CustomText
          text='Este esta sujeto a revisión de nuestro equipo.'
          textSize={FontsSize._16_SIZE}
          marginTop={8} />

        <Image
          source={{ uri: "" }}
          style={{ height: 259, width: "100%", marginTop: 16, backgroundColor: colors.darkGray02 }} />

        <CustomText
          marginTop={24}
          applySubstringColor={true}
          text={'Nos complace informarte que has sido pre-aprobado para obtener una tarjeta de crédito con un límite <b>equivalente al 25% de tus ingresos.<b>\n\nEn un plazo máximo de 48 horas hábiles, recibirás una notificación con los detalles.'}
          textSize={FontsSize._16_SIZE}
          fontFamily={Fonts.DMSansMedium} />

        <Sizebox height={32} />

        <ButtonPrimary
          text={"Ir al home"}
          onPress={() => {
            nav.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [
                  { name: ROUTES.Navigator.BottomTabNavigator.name },
                ],
              })
            );
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