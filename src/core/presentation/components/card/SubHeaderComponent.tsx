import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { CustomText } from '../text/CustomText';
import FontsSize from '../../../constants/FontsSize';
import { SvgXml } from 'react-native-svg';
import { useTranslation } from '../../contexts/translations/LanguageProvider';
import Fonts from '../../../constants/Fonts';
import { ThemeContext } from '../../contexts/theme/ThemeContext';
import { UserServicesTypeEnum } from '../../../../paguelo_facil/domain/enum/UserServicesTypeEnum';
import cash_money_ico from '../../../../../assets/svg/xml/cash_money_ico';
import diagonal_arrow_down_content from '../../../../../assets/svg/xml/diagonal_arrow_down_content';
import diagonal_arrow_content from '../../../../../assets/svg/xml/diagonal_arrow_content';


interface Props {
    type: UserServicesTypeEnum;
    amount: string;

}

const SubHeaderComponent = ({ type, amount }: Props) => {

    const { translation } = useTranslation();

    const { theme: { colors } } = useContext(ThemeContext);

    var text = ""
    var indicator = diagonal_arrow_down_content

    if (type == UserServicesTypeEnum.RECHARGE) {
        text = translation.file.rechargue_of
        indicator = diagonal_arrow_down_content
    }

    if (type == UserServicesTypeEnum.SEND) {
        text = translation.file.pay_fo ?? "Pago de:"
        indicator = diagonal_arrow_content
    }

    return (
        <View style={{ flexDirection: 'row', elevation: 2, backgroundColor: 'white', zIndex: -1, paddingVertical: 18 }}>

            <View style={{ ...style.buttonIcoContainer }}>
                <SvgXml xml={cash_money_ico}></SvgXml>

                <View style={{ position: 'absolute', right: 0 }}>

                    <SvgXml xml={indicator}></SvgXml>

                </View>
            </View>

            <View style={{ marginStart: 8, justifyContent: 'center' }}>
                <CustomText
                    text={text}
                    fontFamily={Fonts.PoppinsMedium}
                    textSize={FontsSize._16_SIZE} />
            </View>

            <View style={{ position: 'absolute', right: 24, alignSelf: 'center' }}>
                <CustomText text={amount} fontFamily={Fonts.PoppinsMedium} textSize={FontsSize._16_SIZE} textColor={colors.textColor01} weight='600' />
            </View>
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
        elevation: 3,
        alignItems: 'center',
        borderRadius: 9,
    }, buttonIcoContainer: {

        marginStart: 16,
        backgroundColor: 'white',
        borderColor: '#E9EBEE',
        borderWidth: 1,
        borderRadius: 50,
        padding: 10
    }

});

export default SubHeaderComponent;