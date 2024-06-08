import { useState, useEffect, useContext } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, ReturnKeyTypeOptions, Keyboard, KeyboardTypeOptions } from 'react-native';
import { SvgXml } from 'react-native-svg';
import FontsSize from '../../../constants/FontsSize';
import { ThemeContext } from '../../contexts/theme/ThemeContext';
import { CustomText } from '../text/CustomText';
import Fonts from '../../../constants/Fonts';
import Sizebox from '../item/Sizebox';
import ic_eye_closed_outline from '../../../../../assets/svg/ic_eye_closed_outline';
import ic_eye_opened_outline from '../../../../../assets/svg/ic_eye_opened_outline';
import ic_error_check_filled from '../../../../../assets/svg/ic_error_check_filled';
import ic_exclamation_error_filled from '../../../../../assets/svg/ic_exclamation_error_filled';

interface Props {
  placeholder?: string;
  rightIcon?: any;
  leftIcon?: any;
  inputValue?: string;
  onChangeText?: any;
  maxLength?: number;
  showError?: boolean;
  errorInfo?: string;
  heightInput?: number
  multiline?: boolean,
  textAlign?: 'center' | 'auto' | 'bottom' | 'top',
  enableAmountFormatting?: boolean,
  showBottomIco?: boolean,
  marginTop?: number,
  editable?: boolean;
  labelTitle?: string,
  labelTitleRequired?: boolean,
  allowSpaces?: boolean
  returnKeyType?: ReturnKeyTypeOptions
  inputType?: "name" | "password" | "email" | "money" | "alphanumeric" | "all" | "number"
}

export const TextInputMain = ({
  leftIcon,
  rightIcon,
  placeholder,
  inputValue = "",
  onChangeText,
  showError = false,
  maxLength,
  heightInput = 56,
  multiline = false,
  textAlign = 'center',
  marginTop = 0,
  editable = true,
  allowSpaces = true,
  labelTitle,
  returnKeyType = 'done',
  inputType,
  labelTitleRequired = false,
  errorInfo
}: Props) => {
  const [isInputValid, setIsValid] = useState(true);
  const [secureText, setSecureText] = useState(true);
  var regex
  switch (inputType) {
    case "name":
      regex = /[^a-zA-Z ]/g
      break;
    case "password":
      regex = /.*/
      break;
    case "email":
      regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      break;
    case "money":
    case "number":
      regex = /[^0-9]/g;
      break;
    case "alphanumeric":
      regex = /[^a-zA-Z 0-9]/g
      break;
    default:
      regex = /.*/
      break;
  }
  useEffect(() => {
    var isRegexValid = true
    if (inputValue.length > 0)
      isRegexValid = !regex.test(inputValue)
    setIsValid(isRegexValid);
  }, [inputValue]);

  const handleFocus = () => {
    // setIsFocused(true);
  };

  const {
    theme: { colors },
  } = useContext(ThemeContext);


  const formatAmount = (amount: any) => {
    return amount !== null && amount !== undefined
      ? amount.toFixed(2)
      : '0.00';
  };


  const formatAndAddDecimalToNumber = (text: string) => {
    const textWithoutDecimal = '000' + text.replace('.', '').replace(',', '');
    const formattedText =
      textWithoutDecimal.slice(0, -2) + '.' + textWithoutDecimal.slice(-2);

    const numericAmount = parseFloat(formattedText);
    return formatAmount(numericAmount);
  };

  const handleTextChange = (text: string) => {

    // const normalizedText = text.replace(/\s{2,}/g, ' ');
    onChangeText(text);

    if (inputType === "name") {
      // const newText = text.replace(/[^a-zA-Z ]/g, '');
      onChangeText(text);
    }

    if (inputType === "alphanumeric") {
      // const newText = text.replace(/[^a-zA-Z0-9]/g, '');
      onChangeText(text);
    }

    if (inputType === "money") {
      const normalizedText = text.replace(/\s{2,}/g, ' ');
      const formattedAmount = formatAndAddDecimalToNumber(normalizedText);
      onChangeText(formattedAmount);
      return
    }

    if (!allowSpaces) {
      const newText = text.replace(/\s/g, '');
      onChangeText(newText);
    }

  };

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.accentSecondary,
      borderRadius: 12,
      zIndex: -1,
      width: '100%',
      borderColor: colors.captionText,
      borderWidth: 1,
      paddingHorizontal: 10,
      paddingVertical: 5,
    },
    containerError: {
      borderColor: colors.red500,
      borderWidth: 1,
    },
    containerSuccess: {
      borderColor: '#4CA80B',
      borderWidth: 1.6,
    },
    iconoLeft: {
      marginRight: 5,
      marginStart: 20,
      width: 20,
      resizeMode: 'contain',
      height: 20,
    },
    icoRight: {
      marginEnd: 16,
      width: 20,
      justifyContent: 'center',
      resizeMode: 'contain',
      height: 20,
    },
    icoBottom: {
      marginEnd: 16,
      width: 20,
      position: 'absolute',
      right: 0,
      bottom: 16,
      justifyContent: 'center',
      resizeMode: 'contain',
      height: 20,
    },
    input: {
      flex: 1,
      paddingVertical: 5,
      paddingHorizontal: 10,
      fontSize: FontsSize._16_SIZE,
      color: colors.white,
    },
  });

  var keyboardType: KeyboardTypeOptions = "default"
  switch (inputType) {
    case "money":
      keyboardType = "numeric"
      break;
    case "email":
      keyboardType = "email-address"
      break;
    case "password":
      break;
    default:
      keyboardType = "default"
      break;
  }

  return (
    <View style={{ width: '100%', marginTop: marginTop }}>


      {labelTitle ? <View style={{ flexDirection: 'row' }}>
        <CustomText
          text={labelTitle}
          fontFamily={Fonts.DMSansMedium}
          textSize={FontsSize._14_SIZE}
          textColor={colors.white}
          marginBottom={4}></CustomText>
        <Sizebox width={5}></Sizebox>
        {labelTitleRequired ? <CustomText text={"*"} fontFamily={Fonts.DMSansMedium} textSize={FontsSize._14_SIZE} textColor={colors.alertColor} marginBottom={4}></CustomText> : null}
      </View> : null}
      <View
        style={[
          { ...styles.container, height: heightInput },
          (showError || errorInfo) && !isInputValid && styles.containerError,
        ]}
      >
        {leftIcon && (
          <View style={styles.iconoLeft}>
            <SvgXml xml={leftIcon} />
          </View>
        )}

        <TextInput
          placeholder={placeholder}
          keyboardType={keyboardType}
          returnKeyType={returnKeyType}
          style={{ ...styles.input, fontFamily: Fonts.DMSansRegular, height: heightInput, textAlignVertical: textAlign }}
          value={inputValue}
          maxLength={maxLength}
          editable={editable}
          placeholderTextColor={colors.textColor04}
          secureTextEntry={(inputType === "password") ? secureText : false}
          multiline={multiline}
          onChangeText={handleTextChange}
          onFocus={handleFocus}
        />

        <View style={styles.icoRight}>
          {rightIcon && <SvgXml xml={rightIcon} height={24} width={24} preserveAspectRatio="xMinYMin slice" />}
        </View>

        {rightIcon && (inputType === "password") ? <Sizebox width={10}></Sizebox> : null}

        {(inputType === "password") && (
          <TouchableOpacity style={styles.icoBottom} onPress={() => { setSecureText(!secureText) }}>
            <SvgXml xml={!secureText ? ic_eye_opened_outline : ic_eye_closed_outline} />
          </TouchableOpacity>
        )}
      </View>
      {
        (errorInfo && !isInputValid) &&
        <View style={{ flexDirection: "row", marginTop: 4, width: "100%" }} >
          <SvgXml xml={ic_exclamation_error_filled} />
          <Sizebox width={4} />
          <CustomText
            textColor={colors.red500}
            text={errorInfo} />
        </View>
      }
    </View>
  );
};