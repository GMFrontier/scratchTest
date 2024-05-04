import React, { useContext, useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { CustomText } from '../text/CustomText';
import FontsSize from '../../../constants/FontsSize';
import Fonts from '../../../constants/Fonts';
import { ThemeContext } from '../../contexts/theme/ThemeContext';
import { useTranslation } from '../../contexts/translations/LanguageProvider';

interface Props {

    enableFirstButton: boolean;
    onPressFirstButton: () => void;
    onPressSecondButton: () => void;

}

const QrTabBar = ({ enableFirstButton, onPressFirstButton, onPressSecondButton }: Props) => {

    const {
        theme: { colors },
    } = useContext(ThemeContext);
    const { translation } = useTranslation();


    return (
        <View style={{ backgroundColor: 'white', flexDirection: 'row', justifyContent: 'center', borderRadius: 10, padding: 2 }}>
            <TouchableOpacity onPress={onPressFirstButton} style={{ flex: 1, margin: 2, borderRadius: 14, overflow: 'hidden' }}>
                <View
                    style={{
                        backgroundColor: enableFirstButton ? colors.primary : 'white',
                        height: 48,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <CustomText textColor={enableFirstButton ? 'white' : '#7D889B'} text={translation.file.scan_qr} textSize={FontsSize._16_SIZE} fontFamily={Fonts.PoppinsMedium} />
                </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={onPressSecondButton} style={{ flex: 1, margin: 2, borderRadius: 14, overflow: 'hidden' }}>
                <View
                    style={{
                        backgroundColor: !enableFirstButton ? colors.primary : 'white',
                        height: 48,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <CustomText textColor={!enableFirstButton ? 'white' : '#7D889B'} text={translation.file.my_qr} textSize={FontsSize._16_SIZE} fontFamily={Fonts.PoppinsMedium} />
                </View>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    // Your other styles can be here
});

export default QrTabBar;
