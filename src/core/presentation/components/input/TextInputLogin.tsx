import React, { useState, useEffect, useContext } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { SvgXml } from 'react-native-svg';
import FontsSize from '../../../constants/FontsSize';
import input_bottom_indicator from '../../../../../assets/svg/xml/input_bottom_indicator';
import eye_ico_content from '../../../../../assets/svg/xml/eye_ico_content';
import eye_ico_hide_content from '../../../../../assets/svg/xml/eye_ico_hide_content';
import { ThemeContext } from '../../contexts/theme/ThemeContext';

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
    textAling?: 'center' | 'auto' | 'bottom' | 'top',
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
    allowSpaces?: boolean
}

export const TextInputLogin = ({
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
    textAling = 'center',
    enableAccountFormatting = false,
    enableAmountFormatting = false,
    showBottomIco = false,
    marginTop = 0,
    alphanumeric = false,
    showHideButton = false,
    editable = true,
    onError,
    onSuccess,
    fontFamily,
    showIconEnd,
    allowSpaces = true,
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
    };

    const handleBlur = () => {
        setIsFocused(false);
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

    return (
        <View
            style={[
                { ...styles.container, height: heightInput },
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
                returnKeyType={'done'}
                style={{ ...styles.input, fontFamily: fontFamily, height: heightInput, marginStart: textStart, textAlignVertical: textAling, marginTop: marginTop }}
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
                {(showIcoRight && rightIcon || showIconEnd) && <SvgXml xml={rightIcon} />}
            </View>

            <View style={styles.icoBottom}>
                {showBottomIco && rightIcon && <SvgXml xml={input_bottom_indicator} />}
            </View>

            {showHideButton && (
                <TouchableOpacity style={styles.icoBottom} onPress={() => { setSecureTextEntry(!secureText) }}>
                    <SvgXml xml={secureText ? eye_ico_content : eye_ico_hide_content} />
                </TouchableOpacity>
            )}

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#E9EBEE',
        borderRadius: 12,
        zIndex: -1,
        width: '100%',
        color: '#3D444F',
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    containerError: {
        borderColor: 'red',
        backgroundColor: '#FFEFED',
        borderWidth: 1.6,
    },
    containerSuccess: {
        borderColor: '#4CA80B',
        backgroundColor: '#e8eee0',
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
        color: '#3D444F',
    },
});