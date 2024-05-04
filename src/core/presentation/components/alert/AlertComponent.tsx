import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { CustomText } from '../text/CustomText';
import Fonts from '../../../constants/Fonts';
import FontsSize from '../../../constants/FontsSize';
import alert_ico_blue_content from '../../../../../assets/svg/xml/alert_ico_blue_content';
import check_ico_content from '../../../../../assets/svg/xml/check_ico_content';
import warning_ico_yellow_content from '../../../../../assets/svg/xml/warning_ico_yellow_content';
import close_ico_toast_red_content from '../../../../../assets/svg/xml/close_ico_toast_red_content';
import { useContext } from 'react';
import { ThemeContext } from '../../contexts/theme/ThemeContext';

interface Props {
    label: string;
    type?: TypeAlertEnum;
    textAlign?: string

}

export enum TypeAlertEnum {
    SUCCESSFUL = "SUCCESSFUL",
    INFORMATION = "INFORMATION",
    WARNING = "WARNING",
    ERROR = "ERROR",
    NEUTRAL = "NEUTRAL"
}

export const AlertComponent = ({ label, type = TypeAlertEnum.NEUTRAL, textAlign = 'left' }: Props) => {


    const {
        theme: { colors },
    } = useContext(ThemeContext);

    var icoAlert = undefined;
    var backgroundColor = colors.lightGray06;
    var borderColor = colors.textColor01;

    if (type == TypeAlertEnum.INFORMATION) {
        icoAlert = alert_ico_blue_content;
        backgroundColor = colors.blue02
        borderColor = colors.blue
    }
    if (type == TypeAlertEnum.SUCCESSFUL) {
        backgroundColor = colors.green01
        icoAlert = check_ico_content;
        borderColor = colors.blue
    }
    if (type == TypeAlertEnum.WARNING) {
        backgroundColor = colors.secondaryYellow02
        icoAlert = warning_ico_yellow_content;
        borderColor = colors.yellow03
    }
    if (type == TypeAlertEnum.ERROR) {
        backgroundColor = colors.red03
        icoAlert = close_ico_toast_red_content;
        borderColor = colors.alertColor
    }


    return (
        <View style={{ flexDirection: 'row', backgroundColor: backgroundColor, width: '100%', paddingHorizontal: 24, paddingVertical: 14, borderColor: borderColor, borderWidth: 1, borderRadius: 8 }}>

            {icoAlert ? <SvgXml xml={icoAlert}></SvgXml> : null}

            <View style={{ flexShrink: 1, flexGrow: 1, marginStart: 10 }}>
                <CustomText text={label} fontFamily={Fonts.PoppinsRegular} textSize={FontsSize._14_SIZE} textAlign={textAlign}></CustomText>
            </View>

        </View>
    );
};

const style = StyleSheet.create({

});
