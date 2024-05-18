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
// import ImagePicker from 'react-native-image-crop-picker';

export const ProfileScreen = observer(() => {

  const {
    theme: { colors },
  } = useContext(ThemeContext);

  const statusBar = useStatusBar()

  const { translation } = useTranslation();

  const size = 88
  const uri = "https://img.freepik.com/foto-gratis/colores-arremolinados-interactuan-danza-fluida-sobre-lienzo-que-muestra-tonos-vibrantes-patrones-dinamicos-que-capturan-caos-belleza-arte-abstracto_157027-2892.jpg?w=2000&t=st=1715983346~exp=1715983946~hmac=7dbb319bf1e44315e8c43853f017c5cea35f8a970d66fb232c4213352dccba59"

  return (
    <ToolbarView
      text={"Perfil"}
      textSize={FontsSize._16_SIZE}
      setIconEnd={ic_settings_outline_white}
      onPressIconEnd={() => { }}
      toolbarType='profile'>
      <View
        style={{ backgroundColor: colors.blue400, height: 76, borderBottomEndRadius: 65, borderBottomStartRadius: 65 }} />

      <View
        style={{
          height: size,
          width: size,
          position: "absolute",
          top: 80,
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
                // ImagePicker.openPicker({
                //   width: 300,
                //   height: 400,
                //   cropping: true
                // }).then(image => {
                //   console.log(image);
                // });
              }}
              style={{
                flex: 1
              }} >
              <SvgXml xml={ic_camera_outline} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ToolbarView>
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
});