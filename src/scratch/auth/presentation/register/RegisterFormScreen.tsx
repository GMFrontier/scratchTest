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
import ic_calendar_outline from '../../../../../assets/svg/ic_calendar_outline';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import AutoCompleteView from '../../../../core/presentation/components/spinner/AutoCompleteView';
import { countries_es } from '../../../../core/constants/Countries';
import { Country } from '../../../../core/data/models/Country';
import { FlagInput } from '../../../../core/presentation/components/input/FlagInput';
import { KeyboardAvoidingView } from 'react-native-keyboard-controller';
import { ScrollView } from 'react-native-gesture-handler';
import ic_success_check_filled from '../../../../../assets/svg/ic_success_check_filled';
import { SvgXml } from 'react-native-svg';
import DropdownItem from '../../../../core/presentation/components/spinner/DropdownItem';
import ic_arrow_down_dropdown from '../../../../../assets/svg/ic_arrow_down_dropdown';
import ic_arrow_down_dropdown_disabled from '../../../../../assets/svg/ic_arrow_down_dropdown_disabled';
import SelectDropdown from 'react-native-select-dropdown';
import { opacity } from 'react-native-reanimated/lib/typescript/reanimated2/Colors';
import SelectCustomDropdown from '../../../../core/presentation/components/spinner/SelectCustomDropdown';
import { isUserPasswordValid, isValidPhoneCheck } from '../../../../core/data/utils/Utils';
import { useToastContext } from '../../../../core/presentation/contexts/messages/useToastContext';

export const RegisterFormScreen = observer(() => {

  const {
    theme: { colors },
  } = useContext(ThemeContext);
  const { translation } = useTranslation();
  const navigation = useNavigation()

  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  const [password, setPassword] = useState("");
  const [livesInPanama, setLivesInPanama] = useState();
  const [nationality, setNationality] = useState();
  const [email, setEmail] = useState();
  const [isFormValid, setIsFormValid] = useState(false);
  const [date, setDate] = useState("");
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const maximumSelectableDate = new Date();
  const showToast = useToastContext().showYellowToast

  React.useEffect(() => {
    changeNavigationBarColor(colors.accent);
  })

  const showDatePicker = (type: number) => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };


  const handleConfirm = (date: any) => {
    const formattedDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
    setDate(formattedDate)
    hideDatePicker();
  };
  const [country, setCountry] = useState<Country | undefined>(undefined);

  const enhancedCountries = countries_es.map((country, index) => ({
    id: index,
    name: country.name,
    countryCode: country.countryCode,
    title: country.name
  }));

  const [selectedOption, setSelectedOption] = React.useState(
    '\ud83c\uddf5\ud83c\udde6*+507*PA',
  );
  const [phone, setPhone] = React.useState('');

  React.useEffect(() => {
    const isNameValid = /^[a-zA-Z\s]+$/.test(name);
    const isLastNameValid = /^[a-zA-Z\s]+$/.test(lastname);
    const isPhoneValid = isValidPhoneCheck(phone, selectedOption);
    const isLivesInPanamaValid = (livesInPanama && livesInPanama.id === 0)
    const isNationalityValid = country !== undefined
    const isEmailValid = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email);
    const isPasswordValid = isUserPasswordValid(password)
    const isDateValid = date.length > 0

    setIsFormValid(
      isNameValid &&
      isLastNameValid &&
      isPhoneValid &&
      isLivesInPanamaValid &&
      isNationalityValid &&
      isEmailValid &&
      isPasswordValid &&
      isDateValid
    )
    console.log(
      isNameValid + " " + isLastNameValid + " " +
      isPhoneValid + " " +
      isLivesInPanamaValid + " " +
      isNationalityValid + " " +
      isEmailValid + " " +
      isPasswordValid + " " + isDateValid
    )
  }, [
    name,
    lastname,
    phone,
    livesInPanama,
    nationality,
    email,
    password,
    date
  ])

  React.useEffect(() => {
    if (livesInPanama && livesInPanama.id === 0) {
      showToast("Lo sentimos, no podemos procesar tu solicitud. Nuestra tarjeta se encuentra disponible solo para residentes de Panamá.")
    }
  }, [
    livesInPanama,
  ])

  const style = StyleSheet.create({
    containerMain: {
      flex: 1,
      paddingHorizontal: 16,
      paddingTop: 16,
    },
  });

  return (
    <ToolbarView
      text={"Registro de usuario"} >

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={64}
        style={style.containerMain}>
        <ScrollView showsVerticalScrollIndicator={false} >

          <CustomText
            text={"Arranquemos con algunos datos"}
            textColor={colors.secondary}
            fontFamily={Fonts.DMSansBold}
            textSize={FontsSize._32_SIZE} />

          <CustomText
            text='Cuéntanos un poco sobre ti.'
            textSize={FontsSize._16_SIZE}
            marginTop={8} />

          <TextInputMain
            marginTop={16}
            onChangeText={setName}
            labelTitleRequired={true}
            labelTitle={"Nombre"}
            inputType='name'
            maxLength={12}
            errorInfo={"Por favor ingresa tus datos sin caracteres especiales, sólo letras."}
            inputValue={name}
            placeholder={"Ej. Diana Carolina"} />

          <TextInputMain
            marginTop={16}
            inputValue={lastname}
            onChangeText={setLastname}
            maxLength={11}
            labelTitleRequired={true}
            inputType='name'
            labelTitle={"Apellido"}
            errorInfo={"Por favor ingresa tus datos sin caracteres especiales, sólo letras."}
            placeholder={"Ej. Rojas Diaz"} />

          <TouchableOpacity onPress={() => showDatePicker(0)}>
            <TextInputMain
              marginTop={16}
              inputValue={date}
              onChangeText={() => { }}
              placeholder='dd/mm/aaaa'
              editable={false}
              labelTitle={"Fecha de nacimiento"}
              labelTitleRequired={true}
              rightIcon={ic_calendar_outline}
            />
          </TouchableOpacity>

          <SelectCustomDropdown
            labelTitle='¿Vives en Panamá?'
            data={[{ title: "Si", id: 1 }, { title: "No", id: 0 }]}
            marginTop={16}
            setItem={setLivesInPanama} />

          <AutoCompleteView
            setSelectedItem={setCountry}
            data={enhancedCountries}
            marginTop={16}
            labelTitle={"Nacionalidad"}
            clearOnFocus={true} />

          <TextInputMain
            marginTop={16}
            inputType='email'
            inputValue={email}
            onChangeText={setEmail}
            labelTitleRequired={true}
            labelTitle={translation.file.email}
            placeholder={translation.file.email_placeholder} />

          <FlagInput
            phone={phone}
            setPhone={setPhone}
            isEnabled={true}
            marginTop={16}
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption} />

          <TextInputMain
            inputValue={password}
            marginTop={16}
            inputType="password"
            labelTitleRequired={true}
            placeholder="Ingresa tu contraseña"
            labelTitle={"Contraseña"}
            onChangeText={setPassword}
          />

          <View style={{
            marginTop: 4,
            flexDirection: "row",
            marginBottom: 24
          }} >
            {isUserPasswordValid(password) &&
              <SvgXml xml={ic_success_check_filled} height={16} width={16} style={{ marginEnd: 8 }} />
            }
            <CustomText
              textSize={FontsSize._12_SIZE}
              textColor={isUserPasswordValid(password) ? colors.green400 : colors.white}
              text={"Esta debe contener 8 caracteres alfanuméricos y un carácter especial."} />
          </View>

          <Sizebox height={32} />
          <ButtonPrimary
            text={translation.file.next}
            position="relative"
            disabled={!true}
            onPress={() => { navigation.navigate(ROUTES.Auth.RegisterPhoneValidationScreen.name as never) }} />
        </ScrollView>


      </KeyboardAvoidingView>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        date={new Date()}
        onConfirm={handleConfirm}
        is24Hour={true}
        maximumDate={maximumSelectableDate}
        onCancel={hideDatePicker}
      />

    </ToolbarView>
  );
});