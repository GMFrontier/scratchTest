import { useContext, useState } from 'react';
import { View, StyleSheet, Platform, TouchableOpacity } from 'react-native';
import { observer } from 'mobx-react-lite';
import React = require('react');
import { ThemeContext } from '../../../../core/presentation/contexts/theme/ThemeContext';
import { useTranslation } from '../../../../core/presentation/contexts/translations/LanguageProvider';
import { CustomText } from '../../../../core/presentation/components/text/CustomText';
import Fonts from '../../../../core/constants/Fonts';
import FontsSize from '../../../../core/constants/FontsSize';
import { TextInputMain } from '../../../../core/presentation/components/input/TextInputMain';
import { ButtonPrimary } from '../../../../core/presentation/components/button/ButtonPrimary';
import { useNavigation } from '@react-navigation/native';
import { ROUTES } from '../../../navigation/routes';
import Sizebox from '../../../../core/presentation/components/item/Sizebox';
import changeNavigationBarColor from 'react-native-navigation-bar-color';
import ToolbarView from '../../../../core/presentation/components/toolbar/ToolbarView';
import AutoCompleteView from '../../../../core/presentation/components/spinner/AutoCompleteView';
import { KeyboardAvoidingView } from 'react-native-keyboard-controller';
import { ScrollView } from 'react-native-gesture-handler';
import { countryCities } from '../../../../core/constants/Cities';

export const RegisterAddressScreen = observer(() => {

  const {
    theme: { colors },
  } = useContext(ThemeContext);
  const { translation } = useTranslation();
  const navigation = useNavigation()

  React.useEffect(() => {
    changeNavigationBarColor(colors.accent);
  })

  const states = (countryCities.find(item => item.code2 === "PA"))?.states.map(item => item.name)
  var cities = states.map((state: any, index: any) => ({
    id: index,
    title: state
  }));

  return (
    <ToolbarView
      showArrowBack={false}
      text={"Dirección"} >

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={64}
        style={style.containerMain}>
        <ScrollView showsVerticalScrollIndicator={false} >

          <CustomText
            text={"Ingresa tu dirección"}
            textColor={colors.secondary}
            fontFamily={Fonts.DMSansBold}
            textSize={FontsSize._32_SIZE} />

          <CustomText
            text='A este domicilio te enviaremos tu tarjeta asegúrate completar correctamente los datos.'
            textSize={FontsSize._16_SIZE}
            marginTop={8} />

          <View>
            <TouchableOpacity
              activeOpacity={1}
              style={{ position: "absolute", height: "100%", width: "100%", zIndex: 1 }}
              onPress={() => { }}
            />
            <AutoCompleteView
              setSelectedItem={() => { }}
              data={[{ id: '0', title: "Panamá" }]}
              marginTop={16}
              disabled={true}
              initialValueId={'0'}
              labelTitle={"País de residencia"} />
          </View>

          <TextInputMain
            marginTop={16}
            onChangeText={() => { }}
            labelTitleRequired={true}
            labelTitle={"Región"}
            placeholder={"Ingresar región"} />

          <AutoCompleteView
            setSelectedItem={() => { }}
            data={cities}
            marginTop={16}
            labelTitle={"Ciudad"}
            clearOnFocus={true} />

          <TextInputMain
            marginTop={16}
            onChangeText={() => { }}
            labelTitleRequired={true}
            labelTitle={"Dirección 1"}
            placeholder={"Ingresar dirección"} />

          <TextInputMain
            marginTop={16}
            onChangeText={() => { }}
            labelTitleRequired={true}
            labelTitle={"Dirección 2"}
            placeholder={"Ingresar dirección"} />

          <TextInputMain
            marginTop={16}
            onChangeText={() => { }}
            labelTitleRequired={true}
            labelTitle={"Código postal"}
            placeholder={"Ej: 0000"} />

          <Sizebox height={32} />
          <ButtonPrimary
            text={translation.file.next}
            position="relative"
            onPress={() => { navigation.navigate(ROUTES.Auth.RegisterFinancialScreen.name as never) }} />
        </ScrollView>
      </KeyboardAvoidingView>
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