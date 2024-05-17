import { useContext, useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { observer } from 'mobx-react-lite';
import React = require('react');
import { ThemeContext } from '../../../core/presentation/contexts/theme/ThemeContext';
import { useTranslation } from '../../../core/presentation/contexts/translations/LanguageProvider';
import { CustomText } from '../../../core/presentation/components/text/CustomText';
import Fonts from '../../../core/constants/Fonts';
import FontsSize from '../../../core/constants/FontsSize';
import { ButtonLink } from '../../../core/presentation/components/button/ButtonLink';
import { SvgXml } from 'react-native-svg';
import ic_delete_pin from '../../../../assets/svg/ic_delete_pin';
import ReactNativePinView from 'react-native-pin-view';
import { AvatarImage } from '../../../core/presentation/components/image/avatar';
import { CommonActions, StackActions, useNavigation } from '@react-navigation/native';
import { ROUTES } from '../../navigation/routes';
import ic_biometric_pin from '../../../../assets/svg/ic_biometric_pin';
import changeNavigationBarColor from 'react-native-navigation-bar-color';
import { PinView } from '../../../core/presentation/components/input/PinView';

export const PinScreen = observer(() => {

  const {
    theme: { colors },
  } = useContext(ThemeContext);
  const PIN_LENGTH = 6
  const { translation } = useTranslation();
  const nav = useNavigation()

  const [enteredPin, setEnteredPin] = useState("")
  const [user, setUser] = useState<boolean>(false);

  React.useEffect(() => {
    setUser(false)
  })

  React.useEffect(() => {
    if (enteredPin.length === PIN_LENGTH) {
      nav.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [
            { name: ROUTES.Navigator.BottomTabNavigator.name },
          ],
        })
      );
    }
  }, [enteredPin])

  React.useEffect(() => {
    changeNavigationBarColor(colors.accent);
  })

  return (
    <View style={style.containerMain}>
      <View style={{ alignSelf: "flex-end", marginTop: 20 }} >
        <ButtonLink
          text={"Acceder a otra cuenta"}
          onPress={() => {
            nav.dispatch(StackActions.replace(ROUTES.Auth.LoginScreen.name))
            CommonActions.reset({
              index: 0,
              routes: [
                { name: ROUTES.Auth.LoginScreen.name },
              ],
            })
          }} />
      </View>
      <View style={{
        marginTop: 140,
        alignSelf: "center",
        alignItems: "center",
      }} >
        <AvatarImage size={56} />

        <CustomText
          text={"Hola, Gabriela Carolina"}
          marginTop={16}
          textSize={FontsSize._16_SIZE}
          fontFamily={Fonts.DMSansMedium}
          textColor={colors.blue50} />
      </View>

      <CustomText
        text={"ejemplo@mail.com.ar"}
        marginTop={10}
        textSize={FontsSize._16_SIZE}
        fontFamily={Fonts.DMSansMedium}
        textColor={colors.blue50} />

      <CustomText
        text={"Ingresa tu PIN"}
        marginTop={24}
        textSize={FontsSize._24_SIZE}
        fontFamily={Fonts.DMSansBold}
        textColor={colors.white} />

      <View style={{ position: "absolute", alignSelf: "center", bottom: 406, alignItems: "center" }} >
        <CustomText
          text={"PIN invalido inténtalo nuevamente"}
          textSize={FontsSize._12_SIZE}
          fontFamily={Fonts.DMSansMedium}
          textColor={colors.red500} />
      </View>

      <View style={{ position: "absolute", alignSelf: "center", bottom: 325, alignItems: "center" }} >
        <ButtonLink
          text={"¿Olvidaste tu PIN?"}
          onPress={() => {
            nav.navigate(ROUTES.Auth.RecoverPinScreen.name as never)
          }} />
      </View>

      <View style={{ marginTop: 24 }} >

        <PinView
          setValue={setEnteredPin}
          keyboardBottom={220}
          showPinInputs={true}
        />

      </View>
    </View>
  );
});


const style = StyleSheet.create({
  containerMain: {
    flex: 1,
    paddingHorizontal: 16,
    alignSelf: "center",
    alignContent: "center",
    alignItems: "center",
  },
  keyboardContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
});