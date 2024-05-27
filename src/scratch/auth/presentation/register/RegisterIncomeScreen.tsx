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

export const RegisterIncomeScreen = observer(() => {

  const {
    theme: { colors },
  } = useContext(ThemeContext);
  const { translation } = useTranslation();
  const nav = useNavigation()

  React.useEffect(() => {
    changeNavigationBarColor(colors.accent);
  })

  interface JobStatus {
    id: string,
    title: string
  }
  const jobStatusList: Array<JobStatus> = [{ id: '0', title: "Tengo trabajo" }, { id: '1', title: "Tengo un emprendimiento o empresa" }]
  const [jobStatus, setJobStatus] = useState<JobStatus>();

  React.useEffect(() => {
    console.log(jobStatus)
  }, [jobStatus])

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
                onChangeText={() => { }}
                labelTitleRequired={true}
                labelTitle={"¿Dónde trabajas?"}
                placeholder={"Ej: Copa Airlines"} />

              <AutoCompleteView
                setSelectedItem={() => { }}
                data={[{ id: 0, title: "Pendiente a definir" }]}
                marginTop={16}
                labelTitle={"¿Cuál es tu posición?"}
                clearOnFocus={true} />

              <AutoCompleteView
                setSelectedItem={() => { }}
                data={[{ id: 0, title: "Pendiente a definir" }]}
                marginTop={16}
                labelTitle={"Cuánto tiempo tienes en tu trabajo?"}
                clearOnFocus={true} />

              <View>
                <FileInput
                  label='Ficha Caja Seguro Social'
                  isRequired={true}
                  marginTop={16}
                  showInfoModal={false}
                />

                <FileInput
                  label='Movimientos bancarios últimos 3 meses '
                  isRequired={false}
                  marginTop={16}
                  showInfoModal={false}
                  infoText='Al subirlos ayuda a mejorar tu límite de crédito'
                />
              </View>
            </View>
          }

          {jobStatus?.id === "1" &&
            <View>

              <TextInputMain
                marginTop={16}
                onChangeText={() => { }}
                labelTitleRequired={true}
                labelTitle={"¿Cómo se llama tu emprendimiento o empresa?"}
                placeholder={"Ej: Diseños y creaciones BR"} />

              <AutoCompleteView
                setSelectedItem={() => { }}
                data={[{ id: 0, title: "Pendiente a definir" }]}
                marginTop={16}
                labelTitle={"¿Hace cuánto está creada?"}
                clearOnFocus={true} />

              <TextInputMain
                marginTop={16}
                onChangeText={() => { }}
                labelTitleRequired={true}
                labelTitle={"Deja las redes sociales de tu marca"}
                placeholder={"Ej: Instagram@brcreations"} />

              <TextInputMain
                marginTop={16}
                onChangeText={() => { }}
                labelTitleRequired={true}
                labelTitle={"Deja el website de tu marca"}
                placeholder={"Ej: brcreations.com"} />

              <View>
                <FileInput
                  label='Aviso de operación'
                  isRequired={true}
                  marginTop={16}
                  showInfoModal={false}
                />

                <FileInput
                  label='Movimientos bancarios últimos 3 meses'
                  isRequired={false}
                  marginTop={16}
                  showInfoModal={false}
                />

                <FileInput
                  label='Declaración de renta o estados financieros'
                  isRequired={false}
                  marginTop={16}
                  showInfoModal={false}
                  infoText='Al subirlos ayuda a mejorar tu límite de crédito'
                />
              </View>
            </View>
          }

          <Sizebox height={32} />

          <ButtonPrimary
            text={"Reintentar validación"}
            position="relative"
            onPress={() => {
              nav.navigate(ROUTES.Auth.RegisterCompleteScreen.name as never)
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