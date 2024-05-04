import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { CustomText } from '../text/CustomText';
import Fonts from '../../../constants/Fonts';
import FontsSize from '../../../constants/FontsSize';
import arrow_down_black_content from '../../../../../assets/svg/xml/arrow_down_black_content';

interface Props {
    flagCountry: string;
    codePhone: string;
    disabled?: boolean;
    onPress: () => void;
}

export const ButtonFlag = ({ onPress, flagCountry, codePhone, disabled = false }: Props) => {

    return (
        <TouchableOpacity onPress={onPress} disabled={disabled} >
            <View style={[style.viewContainer]}>
                <View style={{ marginStart: 8, marginTop: 12, marginBottom: 12 }}>
                    <Text>{flagCountry}</Text>
                </View>
                <View style={{ marginStart: 8 }}></View>
                <CustomText text={codePhone} fontFamily={Fonts.PoppinsMedium} textSize={FontsSize._14_SIZE} ></CustomText>
                <View style={{ marginStart: 10 }}></View>
                <SvgXml xml={arrow_down_black_content}></SvgXml>
                <View style={{ marginEnd: 8 }}></View>
            </View>
        </TouchableOpacity>
    );
};

const style = StyleSheet.create({
    viewContainer: {
        backgroundColor: '#CDDCF7',
        flexDirection: 'row',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',



        borderRadius: 10,


    }
});
