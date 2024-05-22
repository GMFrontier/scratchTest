import { useState, useEffect, useContext } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, ReturnKeyTypeOptions } from 'react-native';
import { SvgXml } from 'react-native-svg';
import FontsSize from '../../../constants/FontsSize';
import { ThemeContext } from '../../contexts/theme/ThemeContext';
import { CustomText } from '../text/CustomText';
import Fonts from '../../../constants/Fonts';
import Sizebox from '../item/Sizebox';
import ic_eye_closed_outline from '../../../../../assets/svg/ic_eye_closed_outline';
import ic_eye_opened_outline from '../../../../../assets/svg/ic_eye_opened_outline';

interface Props {
  placeholder?: string;
  rightIcon?: any;
  leftIcon?: any;
  typeKeyboard?: any;
  regularPhrase?: RegExp;
  secureTextEntry?: boolean;
  inputValue?: any;
  onChangeText?: any;
  maxLength?: number;
  showError?: boolean;
  keepFocused?: boolean;
  textStart?: number;
  heightInput?: number
  multiline?: boolean,
  textAlign?: 'center' | 'auto' | 'bottom' | 'top',
  enableAccountFormatting?: boolean,
  enableAmountFormatting?: boolean,
  alphanumeric?: boolean
  showBottomIco?: boolean,
  marginTop?: number,
  showHideButton?: boolean;
  editable?: boolean;
  onError?: () => void;
  onSuccess?: () => void;
  fontFamily?: any,
  showIconEnd?: boolean,
  labelTitle?: string,
  onFocusEvent?: () => void;
  onBlurEvent?: () => void;
  filterPhrase?: any,
  labelTitleRequired?: boolean,
  showBorderColor?: boolean
  allowSpaces?: boolean
  returnKeyType?: ReturnKeyTypeOptions
}

export const TextInputMain = ({
  leftIcon,
  rightIcon,
  placeholder,
  typeKeyboard,
  regularPhrase,
  secureTextEntry = false,
  inputValue,
  onChangeText,
  showError = false,
  keepFocused = false,
  maxLength,
  textStart = 0,
  heightInput = 56,
  multiline = false,
  textAlign = 'center',
  enableAccountFormatting = false,
  enableAmountFormatting = false,
  marginTop = 0,
  alphanumeric = false,
  showHideButton = false,
  editable = true,
  onError,
  onSuccess,
  fontFamily = Fonts.DMSansMedium,
  showIconEnd,
  allowSpaces = true,
  labelTitle,
  onFocusEvent,
  onBlurEvent,
  filterPhrase = undefined,
  labelTitleRequired = false,
  showBorderColor = true,
  returnKeyType = 'done',
}: Props) => {
  const [showIcoRight, setShowIcoRight] = useState(false);
  const [isValid, setIsValid] = useState(true);
  const [isFocused, setIsFocused] = useState(false);
  const [secureText, setSecureTextEntry] = useState(secureTextEntry);

  useEffect(() => {
    const isRegex = regularPhrase?.test(inputValue);
    if (isRegex ?? true) { if (onSuccess != undefined) onSuccess() }
    else { if (onError != undefined) onError() }
    setShowIcoRight(isRegex ?? false);
    setIsValid(isRegex ?? true);


  }, [inputValue, regularPhrase]);

  const handleFocus = () => {
    setIsFocused(true);

    if (onFocusEvent) {
      onFocusEvent();
    }
  };

  const handleBlur = () => {
    setIsFocused(false);
    if (onBlurEvent) {
      onBlurEvent();
    }
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

    const normalizedText = text.replace(/\s{2,}/g, ' ');
    onChangeText(normalizedText);

    if (filterPhrase) {
      const newText = text.replace(filterPhrase, '');
      onChangeText(newText);
    }

    if (alphanumeric) {

      const newText = text.replace(/[^a-zA-Z0-9]/g, '');
      onChangeText(newText);

    }

    if (enableAccountFormatting && typeKeyboard === 'numeric') {
      const formattedText = normalizedText.replace(/(\d{4})(?=\d)/g, '$1-');
      onChangeText(formattedText);

      return;
    }

    if (enableAmountFormatting && typeKeyboard === 'numeric') {
      const formattedAmount = formatAndAddDecimalToNumber(normalizedText);
      onChangeText(formattedAmount);

      return;
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
      borderColor: 'red',

      borderWidth: 1.6,
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
      marginEnd: 26,
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
          { ...styles.container, height: heightInput }, showBorderColor &&
          showError && isFocused && isValid && styles.containerSuccess,
          showError && (isFocused || keepFocused) && !isValid && styles.containerError,
        ]}
      >
        {leftIcon && (
          <View style={styles.iconoLeft}>
            <SvgXml xml={leftIcon} />
          </View>
        )}

        <TextInput
          placeholder={placeholder}
          keyboardType={typeKeyboard}
          returnKeyType={returnKeyType}
          style={{ ...styles.input, fontFamily: fontFamily, height: heightInput, marginStart: textStart, textAlignVertical: textAlign }}
          value={inputValue}
          maxLength={maxLength}
          editable={editable}
          placeholderTextColor={colors.textColor04}
          secureTextEntry={secureText}
          multiline={multiline}
          onChangeText={handleTextChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />

        <View style={styles.icoRight}>
          {(showIcoRight && rightIcon || showIconEnd) && <SvgXml xml={rightIcon} height={24} width={24} preserveAspectRatio="xMinYMin slice" />}
        </View>

        {(showIcoRight || rightIcon || showIconEnd) && showHideButton ? <Sizebox width={10}></Sizebox> : null}

        {/* <View style={styles.icoBottom}>
          {showBottomIco && rightIcon && <SvgXml xml={input_bottom_indicator} />}
        </View> */}

        {showHideButton && (
          <TouchableOpacity style={styles.icoBottom} onPress={() => { setSecureTextEntry(!secureText) }}>
            <SvgXml xml={!secureText ? ic_eye_opened_outline : ic_eye_closed_outline} />
          </TouchableOpacity>
        )}

      </View>
    </View>
  );
};