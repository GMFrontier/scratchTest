import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { CustomText } from '../text/CustomText';
import FontsSize from '../../../constants/FontsSize';

import { useTranslation } from '../../contexts/translations/LanguageProvider';
import { ThemeContext } from '../../contexts/theme/ThemeContext';
import Fonts from '../../../constants/Fonts';


const HomeCardNoTransactions = () => {

    const { translation } = useTranslation();


    const {
        theme: { colors },
    } = useContext(ThemeContext);



    return (
        <View style={style.cardContainer}>

            <View style={{ marginStart: 20, marginEnd: 20 }}>
                <CustomText textColor={colors.textColor04} fontFamily={Fonts.PoppinsRegular} text={translation.file.you_have_no_pending_movement ?? 'No tienes ningún movimiento pendiente'} textSize={FontsSize._14_SIZE} textAlign='center'></CustomText>
            </View>
        </View>
    );
};

const style = StyleSheet.create({

    cardContainer: {
        width: '100%',
        height: 'auto',
        backgroundColor: 'white',
        padding: 16,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 9,
    }

});

export default HomeCardNoTransactions;