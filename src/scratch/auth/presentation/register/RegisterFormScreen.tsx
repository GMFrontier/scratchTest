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

export const RegisterFormScreen = observer(() => {

  const {
    theme: { colors },
  } = useContext(ThemeContext);

  const [checkbox, setCheckbox] = useState(false);

  const { translation } = useTranslation();

  const navigation = useNavigation()

  const [date, setDate] = useState("");


  React.useEffect(() => {
    changeNavigationBarColor(colors.accent);
  })

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = (type: number) => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const maximumSelectableDate = new Date();

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

  return (
    <ToolbarView
      text={"Registro de usuario"} >

      <View style={style.containerMain}>
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

        <ButtonPrimary
          text={translation.file.next}
          onPress={() => { navigation.navigate(ROUTES.Auth.PinScreen.name as never) }} />

      </View>
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