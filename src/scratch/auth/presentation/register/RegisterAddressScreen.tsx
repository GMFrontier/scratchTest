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
import RegisterViewModel from './RegisterViewModel';
import container from '../../../di/inversify.config';
import { TYPES } from '../../../di/types';
import { countries_es } from '../../../../core/constants/Countries';
import { AddressRegisterModel } from './model/RegistrationModel';

export interface City {
  id: number;
  title: string
  code: string
}

export const RegisterAddressScreen = observer(() => {

  const viewModel = container.get<RegisterViewModel>(
    TYPES.RegisterViewModel,
  );

  const {
    theme: { colors },
  } = useContext(ThemeContext);
  const { translation } = useTranslation();
  const navigation = useNavigation()

  React.useEffect(() => {
    changeNavigationBarColor(colors.accent);
  })

  const states = (countryCities.find(item => item.code2 === viewModel.user.nationality))?.states.map(item => item)
  var cities = states.map((state: any, index: any) => ({
    id: index,
    title: state.name,
    code: state.code
  }));

  const [city, setCity] = useState<City | undefined>(undefined);
  const [region, setRegion] = useState<string>(undefined);
  const [address1, setAddress1] = useState<string>(undefined);
  const [address2, setAddress2] = useState<string>(undefined);
  const [postalCode, setPostalCode] = useState<string>(undefined);
  const [isFormValid, setIsFormValid] = useState(false);

  const getCountry = (): string => {
    const enhancedCountries = countries_es.map((country, index) => ({
      id: index,
      name: country.name,
      countryCode: country.countryCode,
      title: country.name
    }));
    return enhancedCountries.find(item => item.countryCode === viewModel.user.nationality).name ?? viewModel.user.nationality
  }

  React.useEffect(() => {
    const isCityValid = city !== undefined
    const isRegionValid = /^[a-zA-Z0-9\s]+$/.test(region);
    const isAddress1Valid = /^[a-zA-Z0-9\s]+$/.test(address1);
    const isPostalCodeValid = /^[0-9\s]+$/.test(postalCode);

    setIsFormValid(
      isCityValid &&
      isRegionValid &&
      isAddress1Valid &&
      isPostalCodeValid
    )
    console.log(
      isCityValid + " " +
      isRegionValid + " " +
      isAddress1Valid + " " +
      isPostalCodeValid + " "
    )
  }, [
    city,
    region,
    address1,
    postalCode,
  ])

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
              data={[{ id: '0', title: { getCountry } }]}
              marginTop={16}
              disabled={true}
              initialValueId={'0'}
              labelTitle={"País de residencia"} />
          </View>

          <TextInputMain
            marginTop={16}
            onChangeText={setRegion}
            labelTitleRequired={true}
            labelTitle={"Región"}
            inputType='name'
            errorInfo='Por favor, ingrese la región sin caracteres especiales para poder continuar'
            inputValue={region}
            placeholder={"Ingresar región"} />

          <AutoCompleteView
            setSelectedItem={setCity}
            data={cities}
            marginTop={16}
            labelTitle={"Ciudad"}
            clearOnFocus={true} />

          <TextInputMain
            marginTop={16}
            onChangeText={setAddress1}
            inputValue={address1}
            inputType='alphanumeric'
            errorInfo='Por favor, ingrese la dirección 1 sin caracteres especiales para poder continuar'
            labelTitleRequired={true}
            labelTitle={"Dirección 1"}
            placeholder={"Ingresar dirección"} />

          <TextInputMain
            marginTop={16}
            labelTitleRequired={false}
            onChangeText={setAddress2}
            inputValue={address2}
            labelTitle={"Dirección 2"}
            placeholder={"Ingresar dirección"} />

          <TextInputMain
            marginTop={16}
            onChangeText={setPostalCode}
            inputValue={postalCode}
            labelTitleRequired={true}
            inputType='number'
            errorInfo='Por favor, utilice sólo números'
            labelTitle={"Código postal"}
            placeholder={"Ej: 0000"} />

          <Sizebox height={32} />
          <ButtonPrimary
            text={translation.file.next}
            position="relative"
            disabled={!true}
            onPress={() => {
              const addressModel: AddressRegisterModel = {
                region,
                city: city.code,
                addressLine1: address1,
                addressLine2: address2,
                postalCode
              }
              const args = {
                addressModel: addressModel
              }
              navigation.navigate(
                ROUTES.Auth.RegisterFinancialScreen.name as never, args)
            }} />
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