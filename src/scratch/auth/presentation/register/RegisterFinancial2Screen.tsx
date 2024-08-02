import { useContext, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
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
import { ROUTES } from '../../../navigation/routes';
import AutoCompleteView from '../../../../core/presentation/components/spinner/AutoCompleteView';
import { TextInputMain } from '../../../../core/presentation/components/input/TextInputMain';
import { FileInput } from '../../../../core/presentation/components/input/FileInput';
import { JobPlace, JobStatus, Salary } from './RegisterFinancialScreen';
import container from '../../../di/inversify.config';
import RegisterViewModel from './RegisterViewModel';
import { TYPES } from '../../../di/types';
import { reaction } from 'mobx'
import LoginViewModel from '../login/LoginViewModel';

export interface JobPosition {
  id: number;
  title: string
}
export interface JobExperience {
  id: number;
  title: string
}

export const RegisterFinancial2Screen = observer(() => {

  const viewModel = container.get<RegisterViewModel>(
    TYPES.RegisterViewModel,
  );
  const loginViewModel = container.get<LoginViewModel>(
    TYPES.LoginViewModel,
  );

  const {
    theme: { colors },
  } = useContext(ThemeContext);
  const { translation } = useTranslation();
  const nav = useNavigation()

  React.useEffect(() => {
    return reaction(
      () => viewModel.step5Success,
      () => {
        loginViewModel.login(viewModel.user.email, viewModel.user.password)

      }
    )
  })

  React.useEffect(() => {
    return reaction(
      () => loginViewModel.loginSuccess,
      () => {
        nav.navigate(ROUTES.Auth.RegisterCompleteScreen.name as never)
      }
    )
  })

  React.useEffect(() => {
    changeNavigationBarColor(colors.accent);
  })

  const jobStatusList: Array<JobStatus> = [{ id: "0", title: "Tengo trabajo" }, { id: "1", title: "Tengo un emprendimiento o empresa" }]
  const [jobStatus, setJobStatus] = useState<JobStatus | undefined>({ id: "0", title: "Tengo trabajo" });
  const [jobPosition, setJobPosition] = useState<JobPosition | undefined>();
  const [workplace, setWorkplace] = useState<string>("");
  const [company, setCompany] = useState<string>("");
  const [companyAge, setCompanyAge] = useState<JobExperience | undefined>();
  const [socialMedia, setSocialMedia] = useState<string>("");
  const [website, setWebsite] = useState<string>("");
  const [jobExperience, setJobExperience] = useState<JobExperience | undefined>();
  const [seguro, setSeguro] = useState<string>();
  const [movements, setMovements] = useState<string>();
  const [operacion, setOperacion] = useState<string>();
  const [renta, setRenta] = useState<string>();
  const [isFormValid, setIsFormValid] = useState(false);

  React.useEffect(() => {

    if (jobStatus.id === "0") {
      const isWorkplaceValid = workplace.length > 0
      const isJobPositionValid = jobPosition !== undefined
      const isJobExperienceValid = jobExperience !== undefined
      // const isSeguroValid = seguro !== undefined
      const isMovementsValid = movements !== undefined

      setIsFormValid(
        isWorkplaceValid &&
        isJobPositionValid &&
        isJobExperienceValid &&
        // isSeguroValid &&
        isMovementsValid
      )
      console.log(
        isWorkplaceValid + " " +
        isJobPositionValid + " " +
        isJobExperienceValid + " " +
        // isSeguroValid + " " +
        isMovementsValid + " "
      )
    } else {
      const isCompanyValid = company.length > 0
      const isCompanyAgeValid = companyAge !== undefined
      const isSocialMediaValid = socialMedia.length > 0
      const isWebsiteValid = website !== undefined
      const isOperationValid = operacion !== undefined
      const isMovementsValid = movements !== undefined
      const isRentaValid = renta !== undefined

      setIsFormValid(
        isCompanyValid &&
        isCompanyAgeValid &&
        isSocialMediaValid &&
        isWebsiteValid &&
        isOperationValid &&
        isMovementsValid &&
        isRentaValid
      )
      console.log(
        isCompanyValid + " " +
        isCompanyAgeValid + " " +
        isSocialMediaValid + " " +
        isWebsiteValid + " " +
        isOperationValid + " " +
        isMovementsValid + " " +
        isRentaValid + " "
      )
    }
  }, [
    jobStatus,
    jobPosition,
    workplace,
    company,
    companyAge,
    socialMedia,
    jobExperience,
    seguro,
    movements,
    operacion,
    renta,
  ])

  return (
    <ToolbarView
      text={"Comprobación de ingresos"} >

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={64}
        style={style.containerMain}>
        <ScrollView showsVerticalScrollIndicator={false} style={{ marginBottom: 64 }}  >


          <CustomText
            text={"Ya casi estamos"}
            textColor={colors.secondary}
            fontFamily={Fonts.DMSansBold}
            textSize={FontsSize._32_SIZE} />

          <CustomText
            text='Completa la información restante a cerca de tu fuente de ingresos'
            textSize={FontsSize._16_SIZE}
            marginTop={8} />

          <View>
            {/* <TouchableOpacity
              activeOpacity={1}
              style={{ position: "absolute", height: "100%", width: "100%", zIndex: 1 }}
              onPress={() => { }}
            /> */}
            <AutoCompleteView
              setSelectedItem={setJobStatus}
              data={jobStatusList}
              marginTop={16}
              disabled={false}
              clearOnFocus={true}
              initialValueId={'0'}
              labelTitle={"Estatus laboral"} />
          </View>

          {jobStatus?.id === "0" &&
            <View>
              <TextInputMain
                marginTop={16}
                inputValue={workplace}
                onChangeText={setWorkplace}
                labelTitleRequired={true}
                inputType="name"
                errorInfo="Por favor, evita caracteres especiales"
                labelTitle={"¿Dónde trabajas?"}
                placeholder={"Ej: Copa Airlines"} />

              <AutoCompleteView
                setSelectedItem={setJobPosition}
                data={[{ id: 0, title: "Pendiente a definir" }]}
                marginTop={16}
                labelTitle={"¿Cuál es tu posición?"}
                clearOnFocus={true} />

              <AutoCompleteView
                setSelectedItem={setJobExperience}
                data={[{ id: 0, title: "Pendiente a definir" }]}
                marginTop={16}
                labelTitle={"Cuánto tiempo tienes en tu trabajo?"}
                clearOnFocus={true} />

              <View>
                <FileInput
                  label='Ficha Caja Seguro Social'
                  isRequired={false}
                  marginTop={16}
                  showInfoModal={false}
                  setFile={setSeguro}
                />

                <FileInput
                  label='Movimientos bancarios últimos 3 meses '
                  isRequired={true}
                  marginTop={16}
                  showInfoModal={false}
                  setFile={setMovements}
                  infoText='Al subirlos ayuda a mejorar tu límite de crédito'
                />
              </View>
            </View>
          }

          {jobStatus?.id === "1" &&
            <View>

              <TextInputMain
                marginTop={16}
                onChangeText={setCompany}
                inputValue={company}
                labelTitleRequired={true}
                labelTitle={"¿Cómo se llama tu emprendimiento o empresa?"}
                placeholder={"Ej: Diseños y creaciones BR"} />

              <AutoCompleteView
                setSelectedItem={setCompanyAge}
                data={[{ id: 0, title: "Pendiente a definir" }]}
                marginTop={16}
                labelTitle={"¿Hace cuánto está creada?"}
                clearOnFocus={true} />

              <TextInputMain
                marginTop={16}
                onChangeText={setSocialMedia}
                inputValue={socialMedia}
                labelTitleRequired={true}
                labelTitle={"Deja las redes sociales de tu marca"}
                placeholder={"Ej: Instagram@brcreations"} />

              <TextInputMain
                marginTop={16}
                inputValue={website}
                onChangeText={setWebsite}
                labelTitleRequired={true}
                labelTitle={"Deja el website de tu marca"}
                placeholder={"Ej: brcreations.com"} />

              <View>
                <FileInput
                  label='Aviso de operación'
                  isRequired={true}
                  marginTop={16}
                  showInfoModal={false}
                  setFile={setOperacion}
                />

                <FileInput
                  label='Movimientos bancarios últimos 3 meses'
                  isRequired={true}
                  marginTop={16}
                  showInfoModal={false}
                  setFile={setMovements}
                />

                <FileInput
                  label='Declaración de renta o estados financieros'
                  isRequired={true}
                  marginTop={16}
                  setFile={setRenta}
                  showInfoModal={false}
                  infoText='Al subirlos ayuda a mejorar tu límite de crédito'
                />
              </View>
            </View>
          }

          <Sizebox height={32} />

          <ButtonPrimary
            text={"Siguiente"}
            position="relative"
            disabled={false}
            onPress={() => {
              viewModel.registerStep5(
                jobPosition.title,
                workplace,
                company,
                companyAge?.title,
                socialMedia,
                website,
                jobExperience?.title,
                seguro,
                movements,
                operacion,
                renta,
              )
            }} />
        </ScrollView>
      </KeyboardAvoidingView>
    </ToolbarView>
  );
});

const style = StyleSheet.create({
  containerMain: {
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingTop: 16,

  }
});