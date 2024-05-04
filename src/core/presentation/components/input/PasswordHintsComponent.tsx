import React, { useState, useEffect, useContext } from 'react';
import { View } from 'react-native';
import { SvgFromXml } from 'react-native-svg';
import Fonts from '../../../constants/Fonts';
import { CustomText } from '../text/CustomText';
import FontsSize from '../../../constants/FontsSize';
import { useTranslation } from '../../contexts/translations/LanguageProvider';
import { ThemeContext } from '../../contexts/theme/ThemeContext';
import check_ico_green_small_content from '../../../../../assets/svg/xml/check_ico_green_small_content';
import check_ico_gray_small_content from '../../../../../assets/svg/xml/check_ico_gray_small_content';

interface Props {
    inputValue?: any;
}

export const PasswordHintsComponent = ({ inputValue }: Props) => {
    const { translation } = useTranslation();
    const {
        theme: { colors },
    } = useContext(ThemeContext);

    const [validations, setValidations] = useState({
        hasMinValue: false,
        haslowerCase: false,
        hasUpperCase: false,
        hasNumber: false,
        hasSpecialCharacter: false,
    });

    useEffect(() => {
        setValidations({
            hasMinValue: inputValue.length >= 8,
            haslowerCase: /[a-z]/.test(inputValue),
            hasUpperCase: /[A-Z]/.test(inputValue),
            hasNumber: /\d/.test(inputValue),
            hasSpecialCharacter: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(inputValue),
        });
    }, [inputValue]);

    const renderValidationItem = (isValid: boolean, text: string) => (
        <View style={{ flexDirection: 'row', alignContent: 'center', alignItems: 'center', marginStart: 43, marginTop: 9 }}>
            {inputValue && isValid && <SvgFromXml xml={check_ico_green_small_content} />}
            {!isValid && inputValue && <SvgFromXml xml={check_ico_gray_small_content} />}
            <View style={{ marginStart: 11 }}>
                <CustomText
                    fontFamily={Fonts.PoppinsRegular}
                    textSize={FontsSize._12_SIZE}
                    textColor={(inputValue && isValid) ? colors.primary : colors.textColor03}
                    text={text}
                />
            </View>
        </View>
    );

    return (
        <View>
            <View style={{ marginStart: 40, marginTop: 16 }}>
                <CustomText
                    text={
                        translation.file.the_password_must_have
                    }
                    textSize={FontsSize._14_SIZE}
                    fontFamily={Fonts.PoppinsMedium}
                    marginBottom={8}
                    textColor={colors.textColor02} />
            </View>
            {renderValidationItem(validations.hasMinValue, translation.file.hint_8_chars)}
            {renderValidationItem(validations.haslowerCase, translation.file.hint_a_lowecase)}
            {renderValidationItem(validations.hasUpperCase, translation.file.hint_an_uppercase)}
            {renderValidationItem(validations.hasNumber, translation.file.hint_a_number)}
            {renderValidationItem(validations.hasSpecialCharacter, translation.file.hint_a_special_char)}
        </View>
    );
};
