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
import { Checkbox } from '../../../../core/presentation/components/checkbox/Checkbox';
import { ButtonPrimary } from '../../../../core/presentation/components/button/ButtonPrimary';
import { useNavigation } from '@react-navigation/native';
import { ROUTES } from '../../../navigation/routes';
import { ButtonLink } from '../../../../core/presentation/components/button/ButtonLink';
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

export const RegisterFormScreen = observer(() => {

  const {
    theme: { colors },
  } = useContext(ThemeContext);
  const { translation } = useTranslation();
  const navigation = useNavigation()

  const [password, setPassword] = useState("");
  const [date, setDate] = useState("");
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const maximumSelectableDate = new Date();

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

  const livesInPanama = [
    {
      id: 0,
      title: "No"
    },
    {
      id: 1,
      title: "Sí"
    },
  ]
  const [selectedOption, setSelectedOption] = React.useState(
    '\ud83c\uddf5\ud83c\udde6*+507*PA',
  );
  const [phone, setPhone] = React.useState('');

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
            onChangeText={() => { }}
            labelTitleRequired={true}
            labelTitle={"Nombre"}
            placeholder={"Ej. Diana Carolina"} />

          <TextInputMain
            marginTop={16}
            onChangeText={() => { }}
            labelTitleRequired={true}
            labelTitle={"Apellido"}
            placeholder={"Ej. Rojas Diaz"} />

          <TouchableOpacity onPress={() => showDatePicker(0)}>
            <TextInputMain
              marginTop={16}
              regularPhrase={/^[a-zA-Z\s]+$/}
              inputValue={date}
              onChangeText={() => { }}
              placeholder='dd/mm/aaaa'
              editable={false}
              labelTitle={"Fecha de nacimiento"}
              labelTitleRequired={true}
              showIconEnd={true}
              rightIcon={ic_calendar_outline}
            />
          </TouchableOpacity>

          <AutoCompleteView
            setSelectedItem={setCountry}
            data={livesInPanama}
            marginTop={16}
            labelTitle={"¿Vives en Panamá?"}
            clearOnFocus={true} />

          <AutoCompleteView
            setSelectedItem={setCountry}
            data={enhancedCountries}
            marginTop={16}
            labelTitle={"Nacionalidad"}
            clearOnFocus={true} />

          <TextInputMain
            marginTop={16}
            onChangeText={() => { }}
            labelTitleRequired={true}
            labelTitle={translation.file.email}
            placeholder={translation.file.email_placeholder} />

          <FlagInput
            phone={phone}
            setPhone={setPhone}
            isEnabled={false}
            marginTop={16}
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption} />

          <TextInputMain
            regularPhrase={
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/
            }
            inputValue={password}
            marginTop={16}
            labelTitleRequired={true}
            placeholder="Ingresa tu contraseña"
            showHideButton={true}
            labelTitle={"Contraseña"}
            onChangeText={setPassword}
          />

          <View style={{
            marginTop: 4,
            flexDirection: "row",
            marginBottom: 24
          }} >
            {(password.length > 0) &&
              <SvgXml xml={ic_success_check_filled} height={16} width={16} style={{ marginEnd: 8 }} />
            }
            <CustomText
              textSize={FontsSize._12_SIZE}
              textColor={password.length > 0 ? colors.green400 : colors.white}
              text={"Esta debe contener 8 caracteres alfanuméricos y un carácter especial."} />
          </View>

          <Sizebox height={32} />
          <ButtonPrimary
            text={translation.file.next}
            position="relative"
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

const style = StyleSheet.create({
  containerMain: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  }
});