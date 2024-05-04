import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { CustomText } from '../text/CustomText';
import FontsSize from '../../../constants/FontsSize';
import { useTranslation } from '../../contexts/translations/LanguageProvider';
import Fonts from '../../../constants/Fonts';
import { ThemeContext } from '../../contexts/theme/ThemeContext';


const EmptyCard = () => {

    const { theme: { colors } } = useContext(ThemeContext);

    const { translation } = useTranslation();
    return (
        <View style={style.cardContainer}>
            <CustomText text={translation.file.you_have_not_added_cards_yet} textSize={FontsSize._16_SIZE} fontFamily={Fonts.PoppinsRegular} textColor={colors.textColor04} textAlign='center'></CustomText>
        </View>
    );
};

const style = StyleSheet.create({

    cardContainer: {
        width: '100%',
        height: 'auto',
        backgroundColor: 'white',
        padding: 32,
        justifyContent: 'center',

        alignItems: 'center',
        borderRadius: 8,
    }

});

export default EmptyCard;