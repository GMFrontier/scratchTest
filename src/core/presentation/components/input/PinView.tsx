import { useState, useContext } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { SvgXml } from 'react-native-svg';
import FontsSize from '../../../constants/FontsSize';
import { ThemeContext } from '../../contexts/theme/ThemeContext';
import Fonts from '../../../constants/Fonts';
import { CommonActions, useNavigation } from '@react-navigation/native';
import React = require('react');
import { ROUTES } from '../../../../scratch/navigation/routes';
import ic_delete_pin from '../../../../../assets/svg/ic_delete_pin';
import ic_info_blue_filled from '../../../../../assets/svg/ic_info_blue_filled';
import Sizebox from '../item/Sizebox';
import { CustomText } from '../text/CustomText';
import ReactNativePinView from "./ReactNativePinView"

interface Props {
  showPinInputs?: boolean;
  setValue: any;
  marginTop?: number;
  showError?: boolean
  showInfoText?: boolean
  errorText?: string
}

export const PinView = ({
  showPinInputs = false,
  setValue,
  marginTop = 0,
  showError = false,
  showInfoText = false,
  errorText
}: Props) => {


  const {
    theme: { colors },
  } = useContext(ThemeContext);
  const PIN_LENGTH = 6
  const nav = useNavigation()

  const pinView = React.useRef(null)
  const [showBiometricButton, setShowBiometricButton] = useState(false)
  const [enteredPin, setEnteredPin] = useState("")

  const handleClearPin = () => {
    pinView.current.clearAll()
  };

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
  return (
    <View style={{ alignSelf: "center", marginTop: marginTop, flex: 1, }}>

      <ReactNativePinView
        inputSize={32}
        ref={pinView}
        pinLength={6}
        buttonSize={60}
        errorText={errorText}
        showError={showError}
        showInfoText={showInfoText}
        onValueChange={setValue}
        buttonAreaStyle={{
          // flex: 1,
          // marginBottom: keyboardBottom,
        }}
        inputAreaStyle={{
          marginBottom: 24,
          justifyContent: 'space-between',
          width: "100%",
          paddingHorizontal: 34,
          display: showPinInputs ? undefined : "none"
        }}
        inputViewFilledStyle={{
          // backgroundColor: showError ? colors.red500 : colors.secondary
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
          fontFamily: "DMSans-Medium",
          fontSize: FontsSize._32_SIZE
        }}
        customLeftButtonViewStyle={{ marginTop: -4 }}
        customRightButtonViewStyle={{ marginTop: -4 }}
        customLeftButton={
          <TouchableOpacity
            onPress={() => {
              handleClearPin()
            }}
            activeOpacity={1}
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
          </TouchableOpacity>
        }
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
  );
};