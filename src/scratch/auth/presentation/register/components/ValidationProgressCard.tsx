import { useContext, useState } from 'react';
import { StyleSheet, TouchableHighlight, View } from 'react-native';
import { SvgXml } from 'react-native-svg';
import ic_empty_check_filled from '../../../../../../assets/svg/ic_empty_check_filled';
import Sizebox from '../../../../../core/presentation/components/item/Sizebox';
import ic_error_check_filled from '../../../../../../assets/svg/ic_error_check_filled';
import ic_success_check_filled from '../../../../../../assets/svg/ic_success_check_filled';
import { ThemeContext } from '../../../../../core/presentation/contexts/theme/ThemeContext';
import FontsSize from '../../../../../core/constants/FontsSize';
import Fonts from '../../../../../core/constants/Fonts';
import { CustomText } from '../../../../../core/presentation/components/text/CustomText';

interface Props {
  step: "form" | "id_error" | "id";
  reason?: string;
}

export const ValidationProgressCard = ({
  step,
  reason
}: Props) => {
  const { theme: { colors } } = useContext(ThemeContext);

  return (
    <View style={{
      backgroundColor: colors.accentSecondary,
      borderRadius: 8,
      paddingVertical: 18,
      paddingHorizontal: 16,
      marginVertical: 32
    }} >
      <CustomText
        text={"Proceso de validación:"}
        textColor={colors.secondary}
        fontFamily={Fonts.DMSansMedium}
        textSize={FontsSize._16_SIZE} />
      <View style={{ flexDirection: "row", alignItems: "center" }} >
        <SvgXml xml={(step === "form") ? ic_empty_check_filled : ic_success_check_filled} height={24} width={24} />
        <Sizebox width={8} />
        <CustomText
          text={"Información personal"}
          textColor={colors.disableText}
          fontFamily={Fonts.DMSansMedium}
          textSize={FontsSize._16_SIZE} />
      </View>
      <View style={{
        height: 46,
        width: 0,
        borderRadius: 2,
        borderWidth: 1,
        borderColor: (step !== "form") ? colors.green400 : colors.disableText,
        marginStart: 11
      }} />
      <View style={{ flexDirection: "row", alignItems: "center" }} >
        <SvgXml xml={(step === "form") ? ic_empty_check_filled : (step === "id") ? ic_success_check_filled : ic_error_check_filled} height={24} width={24} />
        <Sizebox width={8} />
        <View>
          <CustomText
            text={"Imágenes y selfie"}
            textColor={colors.disableText}
            fontFamily={Fonts.DMSansMedium}
            textSize={FontsSize._16_SIZE} />
          {reason &&
            <CustomText
              text={reason}
              textColor={colors.blu100}
              fontFamily={Fonts.DMSansMedium}
              textSize={FontsSize._16_SIZE} />
          }
        </View>
      </View>
      <View style={{
        height: 46,
        width: 0,
        borderRadius: 2,
        borderWidth: 1,
        borderColor: (step === "form") ? colors.disableText : (step === "id") ? colors.green400 : colors.red500,
        marginStart: 11

      }} />
      <View style={{ flexDirection: "row", alignItems: "center" }} >
        <SvgXml xml={ic_empty_check_filled} height={24} width={24} />
        <Sizebox width={8} />
        <CustomText
          text={"Aprobación"}
          textColor={colors.disableText}
          fontFamily={Fonts.DMSansMedium}
          textSize={FontsSize._16_SIZE} />
      </View>
    </View>
  );
};
