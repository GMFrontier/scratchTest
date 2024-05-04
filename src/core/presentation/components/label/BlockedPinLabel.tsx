import React, { useContext } from 'react';
import { View } from 'react-native';
import FontsSize from '../../../constants/FontsSize';
import { ThemeContext } from '../../contexts/theme/ThemeContext';
import Fonts from '../../../constants/Fonts';
import { useTranslation } from '../../contexts/translations/LanguageProvider';
import { CustomText } from '../text/CustomText';

export const BlockedPinLabel = () => {

  const { translation } = useTranslation();
  const { theme: { colors } } = useContext(ThemeContext);

  return (<View style={{ flexDirection: "row" }}>
    <View style={{
      borderRadius: 20,
      alignItems: "center",
      gap: 4,
      backgroundColor: colors.secondaryOrange02,
      height: 16,
      alignContent: "center",
      justifyContent: "center",
      paddingHorizontal: 8,
      paddingVertical: 2,
      flexDirection: "row",
      marginStart: 4
    }} >
      <CustomText
        textColor={colors.secondaryOrange07}
        text={"⬤"}
        textSize={8}
        fontFamily={Fonts.PoppinsRegular} />
      <CustomText
        textColor={colors.secondaryOrange07}
        text={translation.file.cards_blocked_pin ?? "PIN BLOQUEADO"}
        textSize={FontsSize._10_SIZE}
        fontFamily={Fonts.PoppinsMedium} />
    </View>
  </View>
  );
};

