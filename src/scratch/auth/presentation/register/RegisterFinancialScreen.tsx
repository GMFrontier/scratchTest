import { useContext, useState } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { observer } from 'mobx-react-lite';
import React = require('react');
import { ThemeContext } from '../../../../core/presentation/contexts/theme/ThemeContext';
import { useTranslation } from '../../../../core/presentation/contexts/translations/LanguageProvider';
import { CustomText } from '../../../../core/presentation/components/text/CustomText';
import Fonts from '../../../../core/constants/Fonts';
import FontsSize from '../../../../core/constants/FontsSize';
import { ButtonPrimary } from '../../../../core/presentation/components/button/ButtonPrimary';
import { useNavigation } from '@react-navigation/native';
import Sizebox from '../../../../core/presentation/components/item/Sizebox';
import changeNavigationBarColor from 'react-native-navigation-bar-color';
import ToolbarView from '../../../../core/presentation/components/toolbar/ToolbarView';
import AutoCompleteView from '../../../../core/presentation/components/spinner/AutoCompleteView';
import { KeyboardAvoidingView } from 'react-native-keyboard-controller';
import { ScrollView } from 'react-native-gesture-handler';
import RadioGroup, { RadioButtonProps } from 'react-native-radio-buttons-group';
import { CustomLabelText } from '../../../../core/presentation/components/text/CustomLabelText';
import { FileInput } from '../../../../core/presentation/components/input/FileInput';
import SelectCustomDropdown from '../../../../core/presentation/components/spinner/SelectCustomDropdown';
import { NavigationProps } from '../../../navigation/StackNavigator';
import RegisterViewModel from './RegisterViewModel';
import container from '../../../di/inversify.config';
import { TYPES } from '../../../di/types';
import { reaction } from 'mobx'
import { useNewModalContext } from '../../../../core/presentation/contexts/messages/useNewModalContext';
import { ROUTES } from '../../../navigation/routes';
import { FinancialRegisterModel } from './model/RegistrationModel';
import { TextInputMain } from '../../../../core/presentation/components/input/TextInputMain';
import { stringToBoolean } from '../../../../core/data/utils/Utils';

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
  code: string
}

export const RegisterFinancialScreen = observer(({ route }: NavigationProps) => {
  var data = undefined
  if (route.params && route.params.addressModel) data = route.params.addressModel

  const viewModel = container.get<RegisterViewModel>(
    TYPES.RegisterViewModel,
  );

  const {
    theme: { colors },
  } = useContext(ThemeContext);
  const { translation } = useTranslation();
  const nav = useNavigation()
  const showModal = useNewModalContext().showStateModal

  React.useEffect(() => {
    changeNavigationBarColor(colors.accent);
  })

  const [jobPlace, setJobPlace] = useState<JobPlace | undefined>(undefined);
  const [salary, setSalary] = useState<Salary | undefined>(undefined);
  const [occupation, setOccupation] = useState<string>("");
  const [exposedPerson, setExposedPerson] = useState();
  const [comprobante, setComprobante] = useState<string | undefined>();
  const [apc, setAPC] = useState();
  const [canVerify, setCanVerify] = useState();
  const [isFormValid, setIsFormValid] = useState(false);


  const pepData: RadioButtonProps[] = React.useMemo(() => (
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
    ]), [exposedPerson]);

  const apcData: RadioButtonProps[] = React.useMemo(() => (
    [
      {
        id: '1',
        label: 'Sí',
        value: "true",
        color: apc === "1" ? colors.white : undefined,
        borderSize: apc === "1" ? 8 : 2.5,
        borderColor: apc === "1" ? colors.blue200 : colors.disableText
      },
      {
        id: '2',
        label: 'No',
        value: "false",
        color: apc === "2" ? colors.white : undefined,
        borderSize: apc === "2" ? 8 : 2.5,
        borderColor: apc === "2" ? colors.blue200 : colors.disableText
      }
    ]), [apc]);

  const verifyData: RadioButtonProps[] = React.useMemo(() => (
    [
      {
        id: '1',
        label: 'Sí',
        value: "true",
        color: canVerify === "1" ? colors.white : undefined,
        borderSize: canVerify === "1" ? 8 : 2.5,
        borderColor: canVerify === "1" ? colors.blue200 : colors.disableText
      },
      {
        id: '2',
        label: 'No',
        value: "false",
        color: canVerify === "2" ? colors.white : undefined,
        borderSize: canVerify === "2" ? 8 : 2.5,
        borderColor: canVerify === "2" ? colors.blue200 : colors.disableText
      }
    ]), [canVerify]);

  const salaryData = [
    { id: "0", title: "Entre $0 y $700", code: 700 },
    { id: "1", title: "Entre $700 y $1000", code: 1000 },
    { id: "1", title: "Entre $1000 y $1500", code: 1500 },
    { id: "2", title: "Entre $1500 y $2500", code: 2500 },
    { id: "2", title: "Más de $2500", code: 2501 }
  ]

  React.useEffect(() => {
    const isJobPlaceValid = jobPlace !== undefined
    const isSalaryValid = salary !== undefined
    const isOccupationValid = occupation.length > 3
    const isExposedPersonValid = exposedPerson !== undefined
    const isFileValid = comprobante !== undefined
    const isAPCValid = apc !== undefined
    const isCanVerifyValid = canVerify !== undefined

    setIsFormValid(
      isJobPlaceValid &&
      isSalaryValid &&
      isExposedPersonValid &&
      //isFileValid &&
      isAPCValid &&
      isCanVerifyValid &&
      isOccupationValid
    )
    console.log(
      isJobPlaceValid + " " +
      isSalaryValid + " " +
      isExposedPersonValid + " " +
      isFileValid + " " +
      isAPCValid + " " +
      (verifyData.find(item => item.id === canVerify)?.value ?? false) + " " +
      isOccupationValid + " "
    )
  }, [
    jobPlace,
    salary,
    exposedPerson,
    comprobante,
    apc,
    canVerify,
    occupation
  ])

  reaction(
    () => viewModel.step4Success,
    () => {
      nav.navigate(ROUTES.Auth.RegisterFinancial2Screen.name as never)
    }
  )

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
            setSelectedItem={setJobPlace}
            data={[{ id: "0", title: "Empleado privado" }, { id: "1", title: "Empleado público" }]}
            marginTop={16}
            labelTitle={"Lugar de trabajo"}
            clearOnFocus={true} />

          <TextInputMain
            marginTop={16}
            onChangeText={setOccupation}
            inputValue={occupation}
            labelTitleRequired={true}
            labelTitle={"Ocupación"}
            placeholder={"Ej: Developer"} />


          <SelectCustomDropdown
            setItem={setSalary}
            data={salaryData}
            marginTop={16}
            labelTitle={"Rango salarial"} />

          <CustomLabelText
            text='Eres una persona políticamente expuesta'
            marginTop={16}
            textColor={colors.white}
            showRequiredIcon={true} />
          <View style={{ flexDirection: "row" }} >
            <RadioGroup
              radioButtons={pepData}
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

          <CustomLabelText
            text="¿Ya cuentas con APC?"
            marginTop={16}
            textColor={colors.white}
            showRequiredIcon={true} />
          <View style={{ flexDirection: "row" }} >
            <RadioGroup
              radioButtons={apcData}
              onPress={setAPC}
              layout='row'
              selectedId={apc}
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

          <CustomLabelText
            text="¿Podemos verificar?"
            marginTop={16}
            textColor={colors.white}
            showRequiredIcon={true} />
          <View style={{ flexDirection: "row" }} >
            <RadioGroup
              radioButtons={verifyData}
              onPress={setCanVerify}
              layout='row'
              selectedId={canVerify}
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

          <Sizebox height={32} />
          <ButtonPrimary
            text={translation.file.next}
            position="relative"
            disabled={!isFormValid}
            onPress={() => {
              const financialModel: FinancialRegisterModel = {
                placeOfWork: jobPlace.title,
                occupation: occupation,
                salary: salary.code,
                pep: stringToBoolean(pepData.find(item => item.id === exposedPerson)?.value) ?? false,
                apc: stringToBoolean(apcData.find(item => item.id === apc)?.value) ?? false,
                toVerify: stringToBoolean(verifyData.find(item => item.id === canVerify)?.value) ?? false,
                pdfDocument: comprobante
              }
              viewModel.registerStep4(data, financialModel)
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