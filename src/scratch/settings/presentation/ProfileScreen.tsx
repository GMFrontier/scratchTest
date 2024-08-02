import { useContext } from 'react';
import { View, StyleSheet, } from 'react-native';
import { observer } from 'mobx-react-lite';
import { reaction } from 'mobx';
import { ThemeContext } from '../../../core/presentation/contexts/theme/ThemeContext';
import { useStatusBar } from '../../../core/presentation/contexts/statusBar/StatusBarContext';
import { useTranslation } from '../../../core/presentation/contexts/translations/LanguageProvider';
import ToolbarView from '../../../core/presentation/components/toolbar/ToolbarView';
import FontsSize from '../../../core/constants/FontsSize';
import ic_settings_outline_white from '../../../../assets/svg/ic_settings_outline_white';
import Fonts from '../../../core/constants/Fonts';
import FastImage from 'react-native-fast-image';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SvgXml } from 'react-native-svg';
import ic_camera_outline from '../../../../assets/svg/ic_camera_outline';
import ic_success_check_filled from '../../../../assets/svg/ic_success_check_filled';
import React = require('react');
import ImagePicker from 'react-native-image-crop-picker';
import { PERMISSIONS, RESULTS, check, request } from 'react-native-permissions';
import { useToastContext } from '../../../core/presentation/contexts/messages/useToastContext';
import { CustomText } from '../../../core/presentation/components/text/CustomText';
import { TextInputMain } from '../../../core/presentation/components/input/TextInputMain';
import { FlagInput } from '../../../core/presentation/components/input/FlagInput';
import Sizebox from '../../../core/presentation/components/item/Sizebox';
import { ButtonPrimary } from '../../../core/presentation/components/button/ButtonPrimary';
import ic_logout_outline from '../../../../assets/svg/ic_logout_outline';
import { useNavigation } from '@react-navigation/core';
import { ROUTES } from '../../navigation/routes';
import LinearGradient from 'react-native-linear-gradient';
import { CommonActions } from '@react-navigation/native';
import SettingsViewModel from './SettingsViewModel';
import container from '../../di/inversify.config';
import { TYPES } from '../../di/types';

export const ProfileScreen = observer(() => {

  const {
    theme: { colors },
  } = useContext(ThemeContext);

  const viewModel = container.get<SettingsViewModel>(
    TYPES.SettingsViewModel,
  );

  const statusBar = useStatusBar()
  const toastMessage = useToastContext().showMessageToast
  const [phone, setPhone] = React.useState('');
  const [selectedOption, setSelectedOption] = React.useState(
    '\ud83c\uddf5\ud83c\udde6*+507*PA',
  );

  const { translation } = useTranslation();

  React.useEffect(() => {
    statusBar.setHomeStatusBar()
    return () => {
      statusBar.setPrimaryStatusBar()
    }
  })

  const checkAndRequestCameraPermission = async () => {
    const result = await check(PERMISSIONS.ANDROID.CAMERA);
    switch (result) {
      case RESULTS.DENIED:
        requestCameraPermission();
        break;
      case RESULTS.GRANTED:
        openCamera();
        break;
    }
  };

  const requestCameraPermission = async () => {
    const result = await request(PERMISSIONS.ANDROID.CAMERA);
    if (result === RESULTS.GRANTED) {
      openCamera();
    } else {
      toastMessage('Camera permission denied.');
    }
  };

  const openCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      console.log(image);
    });
  }

  const size = 88
  const uri = "https://img.freepik.com/foto-gratis/colores-arremolinados-interactuan-danza-fluida-sobre-lienzo-que-muestra-tonos-vibrantes-patrones-dinamicos-que-capturan-caos-belleza-arte-abstracto_157027-2892.jpg?w=2000&t=st=1715983346~exp=1715983946~hmac=7dbb319bf1e44315e8c43853f017c5cea35f8a970d66fb232c4213352dccba59"

  const nav = useNavigation()

  return (
    <View>
      <LinearGradient colors={[colors.blueHome, '#282828A6']} style={styles.linearGradient} />

      <View
        style={{ flexDirection: "row", width: "100%", height: 56, alignItems: "center" }}>
        <View
          style={{ flex: 1, alignContent: "center" }}>
          <CustomText
            textAlign='center'
            textSize={FontsSize._16_SIZE}
            textColor={colors.white}
            text='Perfil' />

        </View>
        <View
          style={{
            position: "absolute",
            right: 16
          }}>
          <TouchableOpacity
            activeOpacity={.8}
            onPress={() => {
              nav.navigate(ROUTES.Settings.SettingsScreen.name as never)
            }}>
            <SvgXml xml={ic_settings_outline_white} />
          </TouchableOpacity>
        </View>

      </View>
      <View
        style={{
          backgroundColor: colors.white,
          height: 150,
          bottom: 0,
          position: "absolute"
        }}
      />
      <View
        style={{
          backgroundColor: colors.white,
          height: 150,
          bottom: 0,
          position: "absolute"
        }}
      />

      <View
        style={{
          height: size,
          width: size,
          marginTop: 17,
          alignSelf: "center"
        }} >
        <SvgXml
          style={{ position: "absolute", alignSelf: "center", right: 0, zIndex: 1 }}
          height={24}
          width={24}
          xml={ic_success_check_filled}
        />
        <View style={{
          overflow: 'hidden',
          justifyContent: 'center',
          alignItems: 'center',
          width: size,
          paddingTop: 2,
          height: size,
          borderRadius: size / 2,
          borderWidth: 2,
          borderColor: colors.white
        }}>
          <FastImage
            source={{ uri }}
            resizeMode={FastImage.resizeMode.cover}
            style={styles.image}
            onError={() => { }} />
          <View style={{
            position: "absolute",
            backgroundColor: colors.white,
            height: size / 5,
            width: size,
            bottom: 0,
            alignItems: "center"
          }} >
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => {
                checkAndRequestCameraPermission()
              }}
              style={{
                flex: 1
              }} >
              <SvgXml xml={ic_camera_outline} />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={{
        paddingHorizontal: 16
      }} >

        <CustomText
          text={viewModel.user?.name + " " + viewModel.user?.lastName}
          textColor={colors.white}
          textAlign='center'
          textSize={FontsSize._20_SIZE}
          fontFamily={Fonts.DMSansMedium}
          marginTop={50}
        />

        <TextInputMain
          marginTop={16}
          onChangeText={() => { }}
          labelTitleRequired={true}
          labelTitle={"Nombre"}
          placeholder={"Nombre"} />

        <TextInputMain
          marginTop={16}
          onChangeText={() => { }}
          labelTitleRequired={true}
          labelTitle={"Apellido"}
          placeholder={"Apellido"} />

        <TextInputMain
          marginTop={16}
          onChangeText={() => { }}
          editable={false}
          labelTitleRequired={true}
          inputValue={translation.file.email_placeholder}
          labelTitle={translation.file.email}
          placeholder={translation.file.email_placeholder} />

        <Sizebox height={16} />

        <FlagInput
          phone={phone}
          setPhone={setPhone}
          isEnabled={false}
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption} />

        <Sizebox height={20} />

        <ButtonPrimary
          text={"Cerrar sesión"}
          position='relative'
          imageStart={ic_logout_outline}
          textColor={colors.defaultTextButton}
          onPress={() => {
            nav.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [
                  { name: ROUTES.Auth.LoginScreen.name },
                ],
              })
            )
          }} />

        <CustomText
          marginTop={16}
          textAlign='center'
          text='Versión 1.1.1' />

      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {

  },
  image: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white'
  },
  icon: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconText: {

    fontWeight: 'bold',
    fontFamily: Fonts.PoppinsMedium,
    color: 'white',
  },
  linearGradient: {
    top: 0,
    height: 184,
    width: "100%",
    position: "absolute",
    zIndex: -1
  }
});