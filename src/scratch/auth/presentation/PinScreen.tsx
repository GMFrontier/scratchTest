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

export const PinScreen = observer(() => {

  const {
    theme: { colors },
  } = useContext(ThemeContext);

  const { translation } = useTranslation();

  const [pin, setPin] = useState<string>('');

  const handlePinInput = (input: string) => {
    if (pin.length < 6) {
      setPin(pin + input);
    }
  };

  const handleClearPin = () => {
    pinView.current.clearAll()
  };

  const pinView = React.useRef(null)
  const [showBiometricButton, setShowBiometricButton] = useState(false)
  const [enteredPin, setEnteredPin] = useState("")

  return (
    <View style={style.containerMain}>
      <View style={{ alignSelf: "flex-end", marginTop: 20 }} >
        <ButtonLink
          text={"Acceder a otra cuenta"}
          onPress={() => {
          }} />
      </View>
      <View style={{
        marginTop: 140,
        alignSelf: "center",
        alignItems: "center"
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
          }} />
      </View>

      <View style={{ marginTop: 24 }} >
        <ReactNativePinView
          inputSize={32}
          ref={pinView}
          pinLength={6}
          buttonSize={60}
          onValueChange={value => setEnteredPin(value)}
          buttonAreaStyle={{
            flex: 1,
            marginBottom: 220
          }}
          inputAreaStyle={{
            marginBottom: 24,
            justifyContent: 'space-between',
            width: "100%",
            paddingHorizontal: 34
          }}
          inputViewEmptyStyle={{
            backgroundColor: colors.disableText,
          }}
          inputViewFilledStyle={{
            backgroundColor: colors.secondary
          }}
          buttonViewStyle={{
            width: "92%",
            height: 52,
            marginHorizontal: 4,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 10,
            backgroundColor: '#282828',
            shadowColor: 'white',
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 1,
            shadowRadius: 55,
            elevation: 2,
          }}
          buttonTextStyle={{
            color: "#FFF",
            fontFamily: Fonts.DMSansMedium,
            fontSize: FontsSize._32_SIZE
          }}
          customLeftButton={
            <TouchableOpacity style={{
              width: "192%",
              height: 52,
              marginHorizontal: 4,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 10,
              backgroundColor: '#282828',
              shadowColor: 'white',
              shadowOffset: { width: 0, height: 0 },
              shadowOpacity: 1,
              shadowRadius: 55,
              elevation: 2,
            }} >
            </TouchableOpacity>}
          customRightButton={
            <TouchableOpacity
              onPress={() => {
                handleClearPin()
              }}
              activeOpacity={0.8}
              style={{
                width: "192%",
                height: 52,
                marginHorizontal: 4,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 10,
                backgroundColor: '#282828',
                shadowColor: 'white',
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: 1,
                shadowRadius: 55,
                elevation: 2,
              }} >
              <SvgXml xml={ic_delete_pin} />
            </TouchableOpacity>
          }
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