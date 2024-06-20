import { useContext, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { observer } from 'mobx-react-lite';
import React = require('react');
import { ThemeContext } from '../../../../core/presentation/contexts/theme/ThemeContext';
import { useTranslation } from '../../../../core/presentation/contexts/translations/LanguageProvider';
import { CustomText } from '../../../../core/presentation/components/text/CustomText';
import Fonts from '../../../../core/constants/Fonts';
import FontsSize from '../../../../core/constants/FontsSize';
import { TextInputMain } from '../../../../core/presentation/components/input/TextInputMain';
import { Checkbox } from '../../../../core/presentation/components/checkbox/Checkbox';
import { ButtonPrimary } from '../../../../core/presentation/components/button/ButtonPrimary';
import { useNavigation } from '@react-navigation/native';
import { ROUTES } from '../../../navigation/routes';
import { ButtonLink } from '../../../../core/presentation/components/button/ButtonLink';
import Sizebox from '../../../../core/presentation/components/item/Sizebox';
import changeNavigationBarColor from 'react-native-navigation-bar-color';
import ToolbarView from '../../../../core/presentation/components/toolbar/ToolbarView';
import container from '../../../di/inversify.config';
import RegisterViewModel from './RegisterViewModel';
import { TYPES } from '../../../di/types';

export const RegisterScreen = observer(() => {

  const {
    theme: { colors },
  } = useContext(ThemeContext);


  const [checkbox, setCheckbox] = useState(false);

  const { translation } = useTranslation();

  const navigation = useNavigation()

  React.useEffect(() => {
    changeNavigationBarColor(colors.accent);
  })

  return (
    <ToolbarView
      text={"Registro de usuario"} >

      <View style={style.containerMain}>
        <CustomText
          text={"Crea tu cuenta"}
          textColor={colors.secondary}
          fontFamily={Fonts.DMSansBold}
          textSize={FontsSize._32_SIZE} />

        <CustomText
          text='Antes de comenzar asegurate de cumplir con los siguientes requisitos'
          textSize={FontsSize._16_SIZE}
          marginTop={8} />

        <CustomText
          text='Tener tu documento de identidad vigente'
          textSize={FontsSize._16_SIZE}
          fontFamily={Fonts.DMSansMedium}
          textColor={colors.white}
          marginTop={32} />

        <CustomText
          text='Deberás presentar tu documento original, para validar tu identidad. (Este debe haber sido emitido en Panamá)'
          textSize={FontsSize._12_SIZE}
          textAlign='left'
          marginTop={8} />

        <CustomText
          text='Residir en Panamá y tener +18 años'
          textSize={FontsSize._16_SIZE}
          fontFamily={Fonts.DMSansMedium}
          textColor={colors.white}
          marginTop={32} />

        <CustomText
          text='Actualmente nuestros servicios se encuentran disponibles solo para residentes Panameños mayores de 18 años'
          textSize={FontsSize._12_SIZE}
          textAlign='left'
          marginTop={8} />

        <View style={{
          flex: 1,
          justifyContent: "flex-end",
          marginBottom: 120,
          flexWrap: "wrap"
        }} >
          <Checkbox
            opacity={.8}
            marginTop={27}
            checked={checkbox}
            label={"Declaro cumplir con los requisitos realizar la creación de mi cuenta."}
            onToggle={setCheckbox}
          />
        </View>

        <ButtonPrimary
          text={translation.file.next}
          disabled={!checkbox}
          onPress={() => { navigation.navigate(ROUTES.Auth.RegisterFormScreen.name as never) }} />


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