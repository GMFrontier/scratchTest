import { useContext, useState } from 'react';
import { View, StyleSheet, Platform, TouchableOpacity } from 'react-native';
import { observer } from 'mobx-react-lite';
import React = require('react');
import { ThemeContext } from '../../../../core/presentation/contexts/theme/ThemeContext';
import { useTranslation } from '../../../../core/presentation/contexts/translations/LanguageProvider';
import { CustomText } from '../../../../core/presentation/components/text/CustomText';
import Fonts from '../../../../core/constants/Fonts';
import FontsSize from '../../../../core/constants/FontsSize';
import { ButtonPrimary } from '../../../../core/presentation/components/button/ButtonPrimary';
import { useNavigation } from '@react-navigation/native';
import { ROUTES } from '../../../navigation/routes';
import Sizebox from '../../../../core/presentation/components/item/Sizebox';
import changeNavigationBarColor from 'react-native-navigation-bar-color';
import ToolbarView from '../../../../core/presentation/components/toolbar/ToolbarView';
import AutoCompleteView from '../../../../core/presentation/components/spinner/AutoCompleteView';
import { KeyboardAvoidingView } from 'react-native-keyboard-controller';
import { ScrollView } from 'react-native-gesture-handler';
import RadioGroup from 'react-native-radio-buttons-group';
import { CustomLabelText } from '../../../../core/presentation/components/text/CustomLabelText';
import { FileInput } from '../../../../core/presentation/components/input/FileInput';
import SelectCustomDropdown from '../../../../core/presentation/components/spinner/SelectCustomDropdown';

export interface JobStatus {
  id: string;
  title: string
}
export interface JobPlace {
  id: number;
  title: string
}
export interface Salary {
  id: number;
  title: string
}

export const RegisterFinancialScreen = observer(() => {

  const {
    theme: { colors },
  } = useContext(ThemeContext);
  const { translation } = useTranslation();
  const nav = useNavigation()

  React.useEffect(() => {
    changeNavigationBarColor(colors.accent);
  })

  const [jobStatus, setJobStatus] = useState<JobStatus | undefined>(undefined);
  const [jobPlace, setJobPlace] = useState<JobPlace | undefined>(undefined);
  const [salary, setSalary] = useState<Salary | undefined>(undefined);
  const [exposedPerson, setExposedPerson] = useState();
  const [comprobante, setComprobante] = useState<string | undefined>();
  const [apc, setAPC] = useState();
  const [canVerify, setCanVerify] = useState();
  const [isFormValid, setIsFormValid] = useState(false);

  React.useEffect(() => {
    const isJobStatusValid = jobStatus !== undefined
    const isJobPlaceValid = jobPlace !== undefined
    const isSalaryValid = salary !== undefined
    const isExposedPersonValid = exposedPerson !== undefined
    const isFileValid = comprobante !== undefined
    const isAPCValid = apc !== undefined
    const isCanVerifyValid = canVerify !== undefined

    setIsFormValid(
      isJobStatusValid &&
      isJobPlaceValid &&
      isSalaryValid &&
      isExposedPersonValid &&
      isFileValid &&
      isAPCValid &&
      isCanVerifyValid
    )
    console.log(
      isJobStatusValid + " " +
      isJobPlaceValid + " " +
      isSalaryValid + " " +
      isExposedPersonValid + " " +
      isFileValid + " " +
      isAPCValid + " " +
      isCanVerifyValid + " "
    )
  }, [
    jobStatus,
    jobPlace,
    salary,
    exposedPerson,
    comprobante,
    apc,
    canVerify,
  ])

  return (
    <ToolbarView
      text={"Cuéntanos de tus finanzas"} >

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={64}
        style={style.containerMain}>
        <ScrollView showsVerticalScrollIndicator={false} >

          <CustomText
            text={"Cuéntanos de tus finanzas"}
            textColor={colors.secondary}
            fontFamily={Fonts.DMSansBold}
            textSize={FontsSize._32_SIZE} />

          <CustomText
            text='De donde vienen tus fuentes de ingresos.'
            textSize={FontsSize._16_SIZE}
            marginTop={8} />

          <AutoCompleteView
            setSelectedItem={setJobStatus}
            data={[{ id: '0', title: "Tengo trabajo" }, { id: '1', title: "Tengo un emprendimiento o empresa" }]}
            marginTop={16}
            clearOnFocus={true}
            labelTitle={"Estatus laboral"} />

          <AutoCompleteView
            setSelectedItem={setJobPlace}
            data={[{ id: "0", title: "Empleado privado" }, { id: "1", title: "Empleado público" }]}
            marginTop={16}
            labelTitle={"Lugar de trabajo"}
            clearOnFocus={true} />

          <SelectCustomDropdown
            setItem={setSalary}
            data={[{ id: "0", title: "Entre $0 y $700" }, { id: "1", title: "Entre $700 y $1000" }, { id: "2", title: "Entre $1500 y $2500" }, { id: "2", title: "Más de $2500" }]}
            marginTop={16}
            labelTitle={"Rango salarial"} />

          <CustomLabelText
            text='Eres una persona políticamente expuesta'
            marginTop={16}
            textColor={colors.white}
            showRequiredIcon={true} />
          <View style={{ flexDirection: "row" }} >
            <RadioGroup
              radioButtons={
                [
                  {
                    id: '1',
                    label: 'Sí',
                    value: "true",
                    color: exposedPerson === "1" ? colors.white : undefined,
                    borderSize: exposedPerson === "1" ? 8 : 2.5,
                    borderColor: exposedPerson === "1" ? colors.blue200 : colors.disableText
                  },
                  {
                    id: '2',
                    label: 'No',
                    value: "false",
                    color: exposedPerson === "2" ? colors.white : undefined,
                    borderSize: exposedPerson === "2" ? 8 : 2.5,
                    borderColor: exposedPerson === "2" ? colors.blue200 : colors.disableText
                  }
                ]
              }
              onPress={setExposedPerson}
              layout='row'
              selectedId={exposedPerson}
              containerStyle={{
                flex: 1,
                justifyContent: "space-between",
                marginHorizontal: 66,
              }}
              labelStyle={{
                color: colors.white
              }}
            />
          </View>

          <FileInput
            label='Comprobante de ingresos'
            isRequired={false}
            marginTop={16}
            setFile={setComprobante}
            showInfoModal={true}
          />

          <SelectCustomDropdown
            data={[]}
            dropdownType='boolean'
            marginTop={16}
            labelTitle={"¿Ya cuentas con APC?"}
            setItem={setAPC} />

          <SelectCustomDropdown
            data={[]}
            dropdownType='boolean'
            marginTop={16}
            labelTitle={"¿Podemos verificar?"}
            setItem={setCanVerify} />

          <Sizebox height={32} />
          <ButtonPrimary
            text={translation.file.next}
            position="relative"
            disabled={!isFormValid}
            onPress={() => {
              nav.navigate(ROUTES.Auth.RegisterIdValidationScreen.name as never)
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