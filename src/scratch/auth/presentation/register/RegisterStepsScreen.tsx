import { useContext, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { observer } from 'mobx-react-lite';
import React = require('react');
import { ThemeContext } from '../../../../core/presentation/contexts/theme/ThemeContext';
import { useTranslation } from '../../../../core/presentation/contexts/translations/LanguageProvider';
import { CustomText } from '../../../../core/presentation/components/text/CustomText';
import Fonts from '../../../../core/constants/Fonts';
import FontsSize from '../../../../core/constants/FontsSize';
import { ButtonPrimary } from '../../../../core/presentation/components/button/ButtonPrimary';
import { CommonActions, StackActions, useNavigation } from '@react-navigation/native';
import Sizebox from '../../../../core/presentation/components/item/Sizebox';
import changeNavigationBarColor from 'react-native-navigation-bar-color';
import ToolbarView from '../../../../core/presentation/components/toolbar/ToolbarView';
import DocumentPicker from 'react-native-document-picker';
import { SvgXml } from 'react-native-svg';
import ic_info_blue_filled from '../../../../../assets/svg/ic_info_blue_filled';
import ic_success_check_filled from '../../../../../assets/svg/ic_success_check_filled';
import ic_error_check_filled from '../../../../../assets/svg/ic_error_check_filled';
import ic_empty_check_filled from '../../../../../assets/svg/ic_empty_check_filled';
import { ValidationProgressCard } from './components/ValidationProgressCard';
import { ROUTES } from '../../../navigation/routes';

export const RegisterStepsScreen = observer(() => {

  const {
    theme: { colors },
  } = useContext(ThemeContext);
  const { translation } = useTranslation();
  const nav = useNavigation()

  React.useEffect(() => {
    changeNavigationBarColor(colors.accent);
  })

  const title = "Al parecer no hemos validado tu identidad"

  return (
    <ToolbarView
      text={"Validación de identidad"} >

      <View
        style={style.containerMain}>

        <CustomText
          text={title}
          textColor={colors.secondary}
          fontFamily={Fonts.DMSansBold}
          textSize={FontsSize._32_SIZE} />

        <CustomText
          text='Deberás reintentar el proceso de validación
          para crear tu cuenta.'
          textSize={FontsSize._16_SIZE}
          marginTop={8} />

        <ValidationProgressCard
          step='id_error'
        />

        <View style={{
          flexDirection: "row",
          marginBottom: 24
        }} >
          <SvgXml xml={ic_info_blue_filled} />
          <Sizebox width={8} />
          <CustomText
            textSize={FontsSize._16_SIZE}
            text={"Asegúrate de cumplir con todos los requisitos solicitados, como sostener tu documento de identificación de manera clara y visible."} />
        </View>

        <ButtonPrimary
          text={"Reintentar validación"}
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