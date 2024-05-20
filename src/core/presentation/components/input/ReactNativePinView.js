import React, { useEffect, useState } from "react"
import { Text, TouchableOpacity, View } from "react-native"
import PinViewStyle from "./PinViewStyle.js"
import Fonts from '../../../constants/Fonts';
import { CustomText } from '../text/CustomText';
import FontsSize from '../../../constants/FontsSize';
import { SvgXml } from 'react-native-svg';
import ic_info_blue_filled from '../../../../../assets/svg/ic_info_blue_filled';
import Sizebox from '../item/Sizebox';

const ViewButton = ({
  activeOpacity,
  onButtonPress,
  buttonSize = 60,
  text,
  customComponent,
  customViewStyle,
  accessible,
  accessibilityLabel,
  disabled,
  customTextStyle,
}) => {
  return (
    <TouchableOpacity
      accessible={accessible}
      accessibilityRole="keyboardkey"
      accessibilityLabel={customComponent !== undefined ? accessibilityLabel : text}
      activeOpacity={activeOpacity}
      disabled={disabled}
      style={PinViewStyle.buttonContainer}
      onPress={onButtonPress}>
      <View
        style={[
          PinViewStyle.buttonView,
          {
            width: buttonSize,
            height: buttonSize,
            borderRadius: buttonSize / 2,
          },
          customViewStyle,
        ]}>
        {customComponent ? (
          customComponent
        ) : (
          <CustomText
            text={text}
            textColor="white"
            fontFamily={Fonts.DMSansMedium}
            textSize={FontsSize._32_SIZE}
          />
        )}
      </View>
    </TouchableOpacity>
  )
}

const ViewInput = ({
  showInputText = false,
  inputTextStyle,
  size = 40,
  customStyle,
  text,
  inputFilledStyle = { backgroundColor: "#000" },
  inputEmptyStyle = { backgroundColor: "#FFF" },
}) => {
  if (showInputText) {
    return (
      <View
        style={[
          PinViewStyle.inputView,
          {
            width: size,
            height: size,
            borderRadius: size / 2,
            alignItems: "center",
            justifyContent: "center",
          },
          text ? inputFilledStyle : inputEmptyStyle,
          customStyle,
        ]}>
        <Text style={[PinViewStyle.inputText, inputTextStyle]}>{text}</Text>
      </View>
    )
  } else {
    return (
      <View
        style={[
          PinViewStyle.inputView,
          {
            width: size,
            height: size,
            borderRadius: size / 2,
          },
          text ? inputFilledStyle : inputEmptyStyle,
          customStyle,
        ]}
      />
    )
  }
}

const ViewHolder = () => {
  return <View style={PinViewStyle.buttonContainer} />
}

const ReactNativePinView = React.forwardRef(
  (
    {
      buttonTextByKey,
      accessible,
      style,
      onButtonPress,
      onValueChange,
      buttonAreaStyle,
      inputAreaStyle,
      inputViewStyle,
      activeOpacity,
      pinLength,
      buttonSize,
      buttonViewStyle,
      buttonTextStyle,
      inputViewEmptyStyle,
      inputViewFilledStyle,
      showInputText,
      inputTextStyle,
      inputSize,
      disabled,
      customLeftButton,
      customRightButton,
      customRightAccessibilityLabel,
      customLeftAccessibilityLabel,
      customLeftButtonViewStyle,
      customRightButtonViewStyle,
      customLeftButtonDisabled,
      customRightButtonDisabled,
      customLeftButtonSize = 60,
      customRightButtonSize = 60,
      showInfoText,
      showError,
      errorText
    },
    ref,
  ) => {
    const [input, setInput] = useState("")
    ref.current = {
      clear: () => {
        if (input.length > 0) {
          setInput(input.slice(0, -1))
        }
      },
      clearAll: () => {
        if (input.length > 0) {
          setInput("")
        }
      },
    }

    const onButtonPressHandle = (key, value) => {
      onButtonPress(key)
      if (input.length < pinLength) {
        setInput(input + "" + value)
      }
    }

    useEffect(() => {
      if (onValueChange !== undefined) {
        onValueChange(input)
      }
    }, [input])


    return (
      <View style={[PinViewStyle.pinView, style]}>
        <View style={[PinViewStyle.inputContainer, inputAreaStyle]}>
          {Array.apply(null, { length: pinLength }).map((e, i) => (
            <ViewInput
              inputTextStyle={inputTextStyle}
              showInputText={showInputText}
              inputEmptyStyle={inputViewEmptyStyle}
              inputFilledStyle={inputViewFilledStyle}
              text={input[i]}
              customStyle={inputViewStyle}
              size={inputSize}
              key={"input-view-" + i}
            />
          ))}
        </View>
        {(errorText && showError) && <View style={{ alignSelf: "center", marginTop: 0 }} >
          <CustomText
            textColor={"#F33A00"}
            textAlign='center'
            text={errorText} />
        </View>}
        <View style={{
          justifyContent: "flex-end",
          flex: 1
        }} >
          {showInfoText && <View style={{
            flexDirection: "row",
            marginBottom: 24
          }} >
            <SvgXml xml={ic_info_blue_filled} />
            <Sizebox width={8} />
            <CustomText
              textSize={FontsSize._16_SIZE}
              text={"No debe contener números consecutivos \n ni relacionados a tus datos personales."} />
          </View>}

          <View style={[PinViewStyle.buttonAreaContainer, buttonAreaStyle]}>
            <ViewButton
              disabled={disabled}
              accessible={accessible}
              activeOpacity={activeOpacity}
              onButtonPress={() => onButtonPressHandle("one", "1")}
              buttonSize={buttonSize}
              text={buttonTextByKey.one}
              customTextStyle={buttonTextStyle}
              customViewStyle={buttonViewStyle}
            />
            <ViewButton
              disabled={disabled}
              accessible={accessible}
              activeOpacity={activeOpacity}
              onButtonPress={() => onButtonPressHandle("two", "2")}
              buttonSize={buttonSize}
              text={buttonTextByKey.two}
              customTextStyle={buttonTextStyle}
              customViewStyle={buttonViewStyle}
            />
            <ViewButton
              disabled={disabled}
              accessible={accessible}
              activeOpacity={activeOpacity}
              onButtonPress={() => onButtonPressHandle("three", "3")}
              buttonSize={buttonSize}
              text={buttonTextByKey.three}
              customTextStyle={buttonTextStyle}
              customViewStyle={buttonViewStyle}
            />
          </View>
          <View style={[PinViewStyle.buttonAreaContainer, buttonAreaStyle]}>
            <ViewButton
              disabled={disabled}
              accessible={accessible}
              activeOpacity={activeOpacity}
              onButtonPress={() => onButtonPressHandle("four", "4")}
              buttonSize={buttonSize}
              text={buttonTextByKey.four}
              customTextStyle={buttonTextStyle}
              customViewStyle={buttonViewStyle}
            />
            <ViewButton
              disabled={disabled}
              accessible={accessible}
              activeOpacity={activeOpacity}
              onButtonPress={() => onButtonPressHandle("five", "5")}
              buttonSize={buttonSize}
              text={buttonTextByKey.five}
              customTextStyle={buttonTextStyle}
              customViewStyle={buttonViewStyle}
            />
            <ViewButton
              disabled={disabled}
              accessible={accessible}
              activeOpacity={activeOpacity}
              onButtonPress={() => onButtonPressHandle("six", "6")}
              buttonSize={buttonSize}
              text={buttonTextByKey.six}
              customTextStyle={buttonTextStyle}
              customViewStyle={buttonViewStyle}
            />
          </View>
          <View style={[PinViewStyle.buttonAreaContainer, buttonAreaStyle]}>
            <ViewButton
              disabled={disabled}
              accessible={accessible}
              activeOpacity={activeOpacity}
              onButtonPress={() => onButtonPressHandle("seven", "7")}
              buttonSize={buttonSize}
              text={buttonTextByKey.seven}
              customTextStyle={buttonTextStyle}
              customViewStyle={buttonViewStyle}
            />
            <ViewButton
              disabled={disabled}
              accessible={accessible}
              activeOpacity={activeOpacity}
              onButtonPress={() => onButtonPressHandle("eight", "8")}
              buttonSize={buttonSize}
              text={buttonTextByKey.eight}
              customTextStyle={buttonTextStyle}
              customViewStyle={buttonViewStyle}
            />
            <ViewButton
              disabled={disabled}
              accessible={accessible}
              activeOpacity={activeOpacity}
              onButtonPress={() => onButtonPressHandle("nine", "9")}
              buttonSize={buttonSize}
              text={buttonTextByKey.nine}
              customTextStyle={buttonTextStyle}
              customViewStyle={buttonViewStyle}
            />
          </View>
          <View style={[PinViewStyle.buttonAreaContainer, buttonAreaStyle]}>

            {customLeftButton ? (
              <ViewButton
                disabled={customLeftButtonDisabled}
                accessible={accessible}
                activeOpacity={activeOpacity}
                accessibilityLabel={customLeftAccessibilityLabel}
                onButtonPress={() => onButtonPress("custom_left")}
                customViewStyle={customLeftButtonViewStyle}
                customComponent={customLeftButton}
                buttonSize={customRightButtonSize ? customRightButtonSize : buttonSize}
              />
            ) : (
              <ViewHolder />
            )}
            <ViewButton
              disabled={disabled}
              accessible={accessible}
              activeOpacity={activeOpacity}
              onButtonPress={() => onButtonPressHandle("zero", "0")}
              text={buttonTextByKey.zero}
              customTextStyle={buttonTextStyle}
              customViewStyle={[buttonViewStyle, customRightButtonViewStyle]}
              buttonSize={buttonSize}
            />
            {customRightButton ? (
              <ViewButton
                disabled={customRightButtonDisabled}
                accessible={accessible}
                activeOpacity={activeOpacity}
                accessibilityLabel={customRightAccessibilityLabel}
                onButtonPress={() => onButtonPress("custom_right")}
                customViewStyle={customRightButtonViewStyle}
                customComponent={customRightButton}
                buttonSize={customRightButtonSize ? customRightButtonSize : buttonSize}
              />
            ) : (
              <ViewHolder />
            )}
          </View>
        </View>
      </View>
    )
  },
)

ReactNativePinView.defaultProps = {
  buttonTextByKey: {
    one: "1",
    two: "2",
    three: "3",
    four: "4",
    five: "5",
    six: "6",
    seven: "7",
    eight: "8",
    nine: "9",
    zero: "0",
  },
  accessible: false,
  onButtonPress: () => { },
  inputTextStyle: { color: "#FFF" },
  buttonAreaStyle: { marginVertical: 12 },
  inputAreaStyle: { marginVertical: 12 },
  activeOpacity: 0.9,
  buttonTextStyle: {
    color: "#FFF",
    fontSize: 32,
  },
  customRightAccessibilityLabel: "right",
  customLeftAccessibilityLabel: "left",
  disabled: false,
  customLeftButtonDisabled: false,
  customRightButtonDisabled: false,
}
export default ReactNativePinView
